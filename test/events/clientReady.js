const { Event } = require('../../');

module.exports = class extends Event {
    constructor(client, registry) {
        super(client, registry, {
            event: 'clientReady',
            once: true
        })
    }

    async run() {
        console.log(this.client.util);
    }
}