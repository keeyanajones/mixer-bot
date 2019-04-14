"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("./Service");
/**
 * Service for interacting with the channel endpoints on the Mixer REST API.
 */
class ChannelService extends Service_1.Service {
    /**
     * Retrieves a list of all channels.
     */
    all(data) {
        return this.makeHandled('get', 'channels', {
            qs: data,
        });
    }
    /**
     * Retrieves channel data for channel specified by channel.
     */
    getChannel(channel) {
        return this.makeHandled('get', `channels/${channel}`);
    }
    /**
     * Retrieves preferences for a channel specified by channelId
     */
    getPreferences(channelId) {
        return this.makeHandled('get', `channels/${channelId}/preferences`);
    }
    /**
     * Retrieves broadcast for a channel specified by channelId
     */
    getBroadcast(channelId) {
        return this.makeHandled('get', `channels/${channelId}/broadcast`);
    }
}
exports.ChannelService = ChannelService;
//# sourceMappingURL=Channel.js.map