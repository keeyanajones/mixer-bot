import { IClipProperties } from '../defs/clipProperties';
import { IClipRequest } from '../defs/clipRequest';
import { IResponse } from '../RequestRunner';
import { Service } from './Service';
/**
 * Service for interacting with clips on the Mixer REST API.
 */
export declare class ClipsService extends Service {
    /**
     * Can a clip be created on the given broadcast. Check the response code.
     * 200: can clip
     * 400-500: cannot clip
     */
    canClip(broadcastId: string): Promise<IResponse<void>>;
    /**
     * Creates a clip.
     * 200: clip created
     * 400-500: cannot clip
     */
    createClip(p: IClipRequest): Promise<IResponse<void>>;
    /**
     * Deletes a clip.
     * 202: clip deleted
     * 400-500: cannot delete clip
     */
    deleteClip(shareableId: string): Promise<IResponse<void>>;
    /**
     * Gets a clip.
     */
    getClip(shareableId: string): Promise<IResponse<IClipProperties>>;
    /**
     * Renames a clip.
     */
    renameClip(shareableId: string, newTitle: string): Promise<IResponse<IClipProperties>>;
    /**
     * Returns all clips for the channel.
     */
    getClips(channelId: string): Promise<IResponse<IClipProperties[]>>;
}
