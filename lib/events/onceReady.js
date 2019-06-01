"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
let retries = 0;
class default_1 extends __1.Event {
    constructor(client, registry) {
        super(client, registry, {
            enabled: true,
            once: true,
            event: 'ready',
            id: 'ready'
        });
    }
    async run() {
        try {
            await this.client.fetchApplication();
        }
        catch (err) {
            if (++retries === 3)
                return process.exit();
            this.client.emit('warn', `Unable to fetchApplication at this time, waiting 5 seconds and retrying. Retries left: ${retries - 3}`);
            await __1.Util.sleep(5000);
            return this.run();
        }
        if (!this.client.options.owners.length)
            this.client.options.owners.push(this.client.application.owner.id);
        this.client.emit('clientReady');
    }
}
exports.default = default_1;
