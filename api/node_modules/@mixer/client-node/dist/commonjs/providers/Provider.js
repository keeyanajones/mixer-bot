"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Base class for service provider.
 */
class Provider {
    constructor(client) {
        this.client = client;
    }
    /**
     * Returns info to add to the client's request.
     */
    getRequest() {
        return {};
    }
    /**
     * Given a failing response from the client, processes the error object and returns a Promise
     * which allows for a provider to retry a request or carry out some other process
     */
    handleResponseError(err, _requestOptions) {
        return Promise.reject(err);
    }
}
exports.Provider = Provider;
//# sourceMappingURL=Provider.js.map