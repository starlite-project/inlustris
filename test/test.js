/* eslint-disable @typescript-eslint/no-var-requires */

const { Client } = require('../');

new Client({
    token: require('./config.json').token
})
    .use('internals')
    .start();