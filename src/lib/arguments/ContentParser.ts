import { ARGUMENT_MATCHES } from '../util/Constants';
import { parse } from 'url';

class Tokenizer {
    public content: string;
    public flagWords: string[];
    public optionFlagWords: any[];
    public quoted: boolean;
    public separator: string;
    public position: number;
    public state: number;
    public tokens: any[];
    public constructor(content: string, {
        flagWords = [],
        optionFlagWords = [],
        quoted = true,
        // @ts-ignore
        separator
    } = {}) {
        this.content = content;
        this.flagWords = flagWords as string[];
        this.optionFlagWords = optionFlagWords as string[];
        this.quoted = quoted;
        this.separator = separator;
        this.position = 0;
        this.state = 0;
        this.tokens = [];
    }

    public startsWith(str: string): boolean {
        return this.content.slice(this.position, this.position + str.length).toLowerCase() === str.toLowerCase();
    }

    public match(regex: RegExp): RegExpMatchArray | null {
        return this.content.slice(this.position).match(regex);
    }

    public slice(from: number, to: number): string {
        return this.content.slice(this.position + from, this.position + to);
    }

    public addToken(type: any, value: any): void {
        this.tokens.push({ type, value });
    }

    public advance(n: number): void {
        this.position += n;
    }

    public choice(...actions: any[]): void {
        for (const action of actions) {
            if (action.call(this)) return;
        }
    }

    public tokenize(): string[] {
        while (this.position < this.content.length) {
            this.runOne();
        }

        this.addToken('EOF', '');
        return this.tokens;
    }

    public runOne(): void {
        this.choice(
            this.runWhitespace,
            this.runFlags,
            this.runOptionFlags,
            this.runQuote,
            this.runOpenQuote,
            this.runEndQuote,
            this.runSeparator,
            this.runWord
        );
    }

    public runFlags(): boolean {
        if (this.state === 0) {
            for (const word of this.flagWords) {
                if (this.startsWith(word)) {
                    this.addToken('FlagWord', this.slice(0, word.length));
                    this.advance(word.length);
                    return true;
                }
            }
        }

        return false;
    }

    public runOptionFlags(): boolean {
        if (this.state === 0) {
            for (const word of this.optionFlagWords) {
                if (this.startsWith(word)) {
                    this.addToken('OptionFlagWord', this.slice(0, word.length));
                    this.advance(word.length);
                    return true;
                }
            }
        }
        return false;
    }

    public runQuote(): boolean {
        if (this.separator == null && this.quoted && this.startsWith('"')) {
            if (this.state === 1) this.state = 0;
            else if (this.state === 0) this.state = 1;
            this.addToken('Quote', '"');
            this.advance(1);
            return true;
        }
        return false;
    }

    public runOpenQuote(): boolean {
        if (this.separator == null && this.quoted && this.startsWith('"')) {
            if (this.state === 0) {
                this.state = 2;
            }
            this.addToken('OpenQuote', '"');
            this.advance(1);
            return true;
        }
        return false;
    }

    public runEndQuote(): boolean {
        if (this.separator == null && this.quoted && this.startsWith('”')) {
            if (this.state === 2) {
                this.state = 0;
            }
            this.addToken('EndQuote', '”');
            this.advance(1);
            return true;
        }
        return false;
    }

    public runSeparator(): boolean {
        if (this.separator != null && this.startsWith(this.separator)) {
            this.addToken('Separator', this.slice(0, this.separator.length));
            this.advance(this.separator.length);
            return true;
        }
        return false;
    }

    public runWord(): boolean {
        const wordRegex = this.state === 0
            ? /^\S+/
            : this.state === 1
                ? /^[^\s"]+/
                : /^[^\s”]+/;

        const wordMatch = this.match(wordRegex);
        if (wordMatch) {
            if (this.separator) {
                if (wordMatch[0].toLowerCase() === this.separator.toLowerCase()) return false;
                const index = wordMatch[0].indexOf(this.separator);
                if (index === -1) {
                    this.addToken('Word', wordMatch[0]);
                    this.advance(wordMatch[0].length);
                    return true;
                }

                const actual = wordMatch[0].slice(0, index);
                this.addToken('Word', actual);
                this.advance(actual.length);
                return true;
            }
            this.addToken('Word', wordMatch[0]);
            this.advance(wordMatch[0].length);
            return true;
        }
        return false;
    }

    public runWhitespace(): boolean {
        const wsMatch = this.match(/^\s+/);
        if (wsMatch) {
            this.addToken('WS', wsMatch[0]);
            this.advance(wsMatch[0].length);
            return true;
        }
        return false;
    }
}

class Parser {
    public tokens: any;
    public separated: any;
    public position: number;
    public results: {
        all: any[];
        phrases: any[];
        flags: any[];
        optionFlags: any[];
    };
    public constructor(tokens: any, { separated }: any) {
        this.tokens = tokens;
        this.separated = separated;
        this.position = 0;

        this.results = {
            all: [],
            phrases: [],
            flags: [],
            optionFlags: []
        };
    }

    public next(): void {
        this.position++;
    }

    public lookaheadN(n: number, ...types: any[]): boolean {
        return this.tokens[this.position + n] != null && types.includes(this.tokens[this.position + n].type);
    }

    public lookahead(...types: any[]): boolean {
        return this.lookaheadN(0, ...types);
    }

    public match(...types: any[]): any {
        if (this.lookahead(...types)) {
            this.next();
            return this.tokens[this.position - 1];
        }

        throw new Error(`Unexpected token ${this.tokens[this.position].value} of type ${this.tokens[this.position].type} (this shouldn't happen)`);
    }

    public parse(): {
        all: any[];
        phrases: any[];
        flags: any[];
        optionFlags: any[];
    } {
        while (this.position < this.tokens.length - 1) {
            this.runArgument();
        }

        this.match('EOF');
        return this.results;
    }

    public runArgument(): void {
        const leading = this.lookahead('WS') ? this.match('WS').value : '';
        if (this.lookahead('FlagWord', 'OptionFlagWord')) {
            const parsed = this.parseFlag();
            const trailing = this.lookahead('WS') ? this.match('WS').value : '';
            const separator = this.lookahead('Separator') ? this.match('Separator').value : '';
            parsed.raw = `${leading}${parsed.raw}${trailing}${separator}`;
            this.results.all.push(parsed);
            if (parsed.type === 'Flag') {
                this.results.flags.push(parsed);
            } else {
                this.results.optionFlags.push(parsed);
            }

            return;
        }

        const parsed = this.parsePhrase();
        const trailing = this.lookahead('WS') ? this.match('WS').value : '';
        const separator = this.lookahead('Separator') ? this.match('Separator').value : '';
        parsed.raw = `${leading}${parsed.raw}${trailing}${separator}`;
        this.results.all.push(parsed);
        this.results.phrases.push(parsed);
    }

    public parseFlag(): { type: string; value: string; raw: string; key?: string } {
        if (this.lookahead('FlagWord')) {
            const flag = this.match('FlagWord');
            const parsed = { type: 'Flag', key: flag.value, value: '', raw: flag.value };
            return parsed;
        }

        const flag = this.match('OptionFlagWord');
        const parsed = { type: 'OptionFlag', key: flag.value, value: '', raw: flag.value };
        const ws = this.lookahead('WS') ? this.match('WS') : null;
        if (ws != null) {
            parsed.raw += ws.value;
        }

        const phrase = this.lookahead('Quote', 'OpenQuote', 'EndQuote', 'Word')
            ? this.parsePhrase()
            : null;

        if (phrase != null) {
            parsed.value += phrase.value;
            parsed.raw += phrase.raw;
        }

        return parsed;
    }

    public parsePhrase(): { type: string; value: string; raw: string } {
        if (!this.separated) {
            if (this.lookahead('Quote')) {
                const parsed = { type: 'Phrase', value: '', raw: '' };
                const openQuote = this.match('Quote');
                parsed.raw += openQuote.value;
                while (this.lookahead('Word', 'WS')) {
                    const match = this.match('Word', 'WS');
                    parsed.value += match.value;
                    parsed.raw += match.value;
                }

                const endQuote = this.lookahead('Quote') ? this.match('Quote') : null;
                if (endQuote != null) {
                    parsed.raw += endQuote.value;
                }

                return parsed;
            }

            if (this.lookahead('OpenQuote')) {
                const parsed = { type: 'Phrase', value: '', raw: '' };
                const openQuote = this.match('OpenQuote');
                parsed.raw += openQuote.value;
                while (this.lookahead('Word', 'WS')) {
                    const match = this.match('Word', 'WS');
                    if (match.type === 'Word') {
                        parsed.value += match.value;
                        parsed.raw += match.value;
                    } else {
                        parsed.raw += match.value;
                    }
                }

                const endQuote = this.lookahead('EndQuote') ? this.match('EndQuote') : null;
                if (endQuote != null) {
                    parsed.raw += endQuote.value;
                }

                return parsed;
            }

            if (this.lookahead('EndQuote')) {
                const endQuote = this.match('EndQuote');
                const parsed = { type: 'Phrase', value: endQuote.value, raw: endQuote.value };
                return parsed;
            }
        }

        if (this.separated) {
            const init = this.match('Word');
            const parsed = { type: 'Phrase', value: init.value, raw: init.value };
            while (this.lookahead('WS') && this.lookaheadN(1, 'Word')) {
                const ws = this.match('WS');
                const word = this.match('Word');
                parsed.value += ws.value + word.value;
            }

            parsed.raw = parsed.value;
            return parsed;
        }

        const word = this.match('Word');
        const parsed = { type: 'Phrase', value: word.value, raw: word.value };
        return parsed;
    }
}

export class ContentParser {
    public flagWords: string[];
    public optionFlagWords: string[];
    public quoted: boolean;
    public separator: string;
    public constructor({
        flagWords = [],
        optionFlagWords = [],
        quoted = true,
        // @ts-ignore
        separator
    } = {}) {
        this.flagWords = flagWords;
        this.flagWords.sort((a, b): number => b.length - a.length);

        this.optionFlagWords = optionFlagWords;
        this.optionFlagWords.sort((a, b): number => b.length - a.length);

        this.quoted = Boolean(quoted);
        this.separator = separator;
    }

    public parse(content: string): {
        all: any[];
        phrases: any[];
        flags: any[];
        optionFlags: any[];
    } {
        // @ts-ignore
        const tokens = new Tokenizer(content, {
            flagWords: this.flagWords,
            optionFlagWords: this.optionFlagWords,
            quoted: this.quoted,
            separator: this.separator
        }).tokenize();

        return new Parser(tokens, { separated: this.separator != null }).parse();
    }

    public static getFlags(args: any): {
        flagWords: string[];
        optionFlagWords: string[];
    } {
        const res = {
            flagWords: [],
            optionFlagWords: []
        };

        for (const arg of args) {
            const arr: string[] = res[arg.match === ARGUMENT_MATCHES.FLAG ? 'flagWords' : 'optionFlagWords'];
            if (arg.match === ARGUMENT_MATCHES.FLAG || arg.match === ARGUMENT_MATCHES.OPTION) {
                if (Array.isArray(arg.flag)) {
                    arr.push(...arg.flag);
                } else {
                    arr.push(arg.flag);
                }
            }
        }

        return res;
    }
}