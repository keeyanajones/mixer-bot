var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Service } from './Service';
/**
 * Service for interacting with the channel endpoints on the Mixer REST API.
 */
var ChannelService = /** @class */ (function (_super) {
    __extends(ChannelService, _super);
    function ChannelService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Retrieves a list of all channels.
     */
    ChannelService.prototype.all = function (data) {
        return this.makeHandled('get', 'channels', {
            qs: data,
        });
    };
    /**
     * Retrieves channel data for channel specified by channel.
     */
    ChannelService.prototype.getChannel = function (channel) {
        return this.makeHandled('get', "channels/" + channel);
    };
    /**
     * Retrieves preferences for a channel specified by channelId
     */
    ChannelService.prototype.getPreferences = function (channelId) {
        return this.makeHandled('get', "channels/" + channelId + "/preferences");
    };
    /**
     * Retrieves broadcast for a channel specified by channelId
     */
    ChannelService.prototype.getBroadcast = function (channelId) {
        return this.makeHandled('get', "channels/" + channelId + "/broadcast");
    };
    return ChannelService;
}(Service));
export { ChannelService };
//# sourceMappingURL=Channel.js.map