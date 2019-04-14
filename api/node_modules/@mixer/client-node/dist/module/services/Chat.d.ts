import { IResponse } from '../RequestRunner';
import { Service } from './Service';
export interface IChatJoinResponse {
    endpoints: string[];
    authkey: string;
    permissions: string[];
}
export interface IUsersResponse {
    userName: string;
    userRoles: string[];
    userId: number;
}
/**
 * Service for interacting with the chat endpoints on the Mixer REST API.
 */
export declare class ChatService extends Service {
    /**
     * Joins the chat for a specified channel ID.
     */
    join(channelId: number): Promise<IResponse<IChatJoinResponse>>;
    /**
     * Retrieve a list of online users in a chat specified by channelId.
     */
    getUsers(channelId: number, data: {
        page: number;
        limit: number;
    }): Promise<IResponse<IUsersResponse[]>>;
    /**
     * Search for users within a chat specified by channelId.
     */
    searchUsers(channelId: number, data: {
        username: string;
        page: number;
        limit: number;
    }): Promise<IResponse<IUsersResponse[]>>;
}
