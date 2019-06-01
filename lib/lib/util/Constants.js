"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = require("./List");
exports.DefaultOptions = {
    token: '',
    plugins: new List_1.List(),
    prefix: '!',
    owners: []
};
exports.MENTION_REGEX = {
    userOrMember: /^(?:<@!?)?(\d{17,19})>?$/,
    channel: /^(?:<#)?(\d{17,19})>?$/,
    emoji: /^(?:<a?:\w{2,32}:)?(\d{17,19})>?$/,
    role: /^(?:<@&)?(\d{17,19})>?$/,
    snowflake: /^(\d{17,19})$/
};
