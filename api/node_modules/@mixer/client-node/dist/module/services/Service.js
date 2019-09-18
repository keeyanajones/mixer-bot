import { UnknownCodeError } from '@mixer/chat-client-websocket';
/**
 * A service is basically a bridge/handler function for various endpoints.
 * It can be passed into the client and used magically.
 */
var Service = /** @class */ (function () {
    function Service(client) {
        this.client = client;
    }
    /**
     * Takes a response. If the status code isn't 200, attempt to find an
     * error handler for it or throw unknown error. If it's all good,
     * we return the response synchronously.
     */
    Service.prototype.handleResponse = function (res, handlers) {
        // 200 codes are already great!
        if (res.statusCode === 200) {
            return res;
        }
        // Otherwise, we have to handle it.
        var handler = handlers && handlers[res.statusCode];
        if (!handler) {
            handler = UnknownCodeError;
        }
        throw new handler(res);
    };
    /**
     * Simple wrapper that makes and handles a response in one go.
     */
    Service.prototype.makeHandled = function (method, path, data, handlers) {
        var _this = this;
        return this.client.request(method, path, data)
            .then(function (res) { return _this.handleResponse(res, handlers); });
    };
    return Service;
}());
export { Service };
//# sourceMappingURL=Service.js.map