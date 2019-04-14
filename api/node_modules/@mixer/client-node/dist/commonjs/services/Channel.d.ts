import { IBroadcast, IChannel, IChannelPreferences } from '../defs/channel';
import { IResponse } from '../RequestRunner';
import { Service } from './Service';
/**
 * Service for interacting with the channel endpoints on the Mixer REST API.
 */
export declare class ChannelService extends Service {
    /**
     * Retrieves a list of all channels.
     */
    all(data: {
        page: number;
        limit: number;
    }): Promise<IResponse<IChannel[]>>;
    /**
     * Retrieves channel data for channel specified by channel.
     */
    getChannel(channel: string | number): Promise<IResponse<IChannel>>;
    /**
     * Retrieves preferences for a channel specified by channelId
     */
    getPreferences(channelId: number): Promise<IResponse<IChannelPreferences>>;
    /**
     * Retrieves broadcast for a channel specified by channelId
     */
    getBroadcast(channelId: number): Promise<IResponse<IBroadcast>>;
}
