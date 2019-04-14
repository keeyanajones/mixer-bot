"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("./Service");
/**
 * Service for interacting with the chat endpoints on the Mixer REST API.
 */
class ChatService extends Service_1.Service {
    /**
     * Joins the chat for a specified channel ID.
     */
    join(channelId) {
        return this.makeHandled('get', `chats/${channelId}`);
    }
    /**
     * Retrieve a list of online users in a chat specified by channelId.
     */
    getUsers(channelId, data) {
        return this.makeHandled('get', `chats/${channelId}/users`, {
            qs: data,
        });
    }
    /**
     * Search for users within a chat specified by channelId.
     */
    searchUsers(channelId, data) {
        return this.makeHandled('get', `chats/${channelId}/users/search`, {
            qs: data,
        });
    }
}
exports.ChatService = ChatService;
//# sourceMappingURL=Chat.js.map