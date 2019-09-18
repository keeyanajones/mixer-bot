"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_client_websocket_1 = require("@mixer/chat-client-websocket");
/**
 * A service is basically a bridge/handler function for various endpoints.
 * It can be passed into the client and used magically.
 */
class Service {
    constructor(client) {
        this.client = client;
    }
    /**
     * Takes a response. If the status code isn't 200, attempt to find an
     * error handler for it or throw unknown error. If it's all good,
     * we return the response synchronously.
     */
    handleResponse(res, handlers) {
        // 200 codes are already great!
        if (res.statusCode === 200) {
            return res;
        }
        // Otherwise, we have to handle it.
        let handler = handlers && handlers[res.statusCode];
        if (!handler) {
            handler = chat_client_websocket_1.UnknownCodeError;
        }
        throw new handler(res);
    }
    /**
     * Simple wrapper that makes and handles a response in one go.
     */
    makeHandled(method, path, data, handlers) {
        return this.client.request(method, path, data)
            .then(res => this.handleResponse(res, handlers));
    }
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map