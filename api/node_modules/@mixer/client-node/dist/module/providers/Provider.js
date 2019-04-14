/**
 * Base class for service provider.
 */
var Provider = /** @class */ (function () {
    function Provider(client) {
        this.client = client;
    }
    /**
     * Returns info to add to the client's request.
     */
    Provider.prototype.getRequest = function () {
        return {};
    };
    /**
     * Given a failing response from the client, processes the error object and returns a Promise
     * which allows for a provider to retry a request or carry out some other process
     */
    Provider.prototype.handleResponseError = function (err, _requestOptions) {
        return Promise.reject(err);
    };
    return Provider;
}());
export { Provider };
//# sourceMappingURL=Provider.js.map