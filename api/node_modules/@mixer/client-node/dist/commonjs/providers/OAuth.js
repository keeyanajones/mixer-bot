"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_client_websocket_1 = require("@mixer/chat-client-websocket");
const Provider_1 = require("./Provider");
/**
 * Provider for oauth-based authentication.
 */
class OAuthProvider extends Provider_1.Provider {
    constructor(client, options) {
        super(client);
        this.details = { client_id: options.clientId, client_secret: options.secret };
        this.setTokens(options.tokens);
    }
    /**
     * Returns if the client is currently authenticated: they must
     * have a non-expired key pair.
     */
    isAuthenticated() {
        return this.tokens.access !== undefined && this.tokens.expires.getTime() > Date.now();
    }
    /**
     * Returns a redirect to the webpage to get authentication.
     */
    getRedirect(redirect, permissions) {
        const params = {
            redirect_uri: redirect,
            response_type: 'code',
            scope: typeof permissions === 'string' ? permissions : permissions.join(' '),
            client_id: this.details.client_id,
        };
        return this.client.buildAddress(this.client.urls.public, '/oauth/authorize', params);
    }
    /**
     * Returns the access token, if any, or undefined.
     */
    accessToken() {
        return this.tokens.access;
    }
    /**
     * Returns the refresh token, if any, or undefined.
     */
    refreshToken() {
        return this.tokens.refresh;
    }
    /**
     * Returns the date that the current tokens expire. You must refresh
     * before then, or reauthenticate.
     */
    expires() {
        return this.tokens.expires;
    }
    /**
     * Returns the set of tokens. These can be saved and used to
     * reload the provider later using OAuthProvider.fromTokens.
     */
    getTokens() {
        return this.tokens;
    }
    /**
     * Sets the tokens for the oauth provider.
     */
    setTokens(tokens) {
        if (!tokens) {
            this.tokens = {};
        }
        else {
            this.tokens = {
                access: tokens.access,
                refresh: tokens.refresh,
                expires: new Date(tokens.expires),
            };
        }
        return this;
    }
    /**
     * Unpacks data from a token response.
     */
    unpackResponse(res) {
        if (res.statusCode !== 200) {
            throw new chat_client_websocket_1.AuthenticationFailedError(res);
        }
        this.tokens = {
            access: res.body.access_token,
            refresh: res.body.refresh_token,
            expires: new Date(Date.now() + res.body.expires_in * 1000),
        };
    }
    /**
     * Attempts to authenticate based on a query string, gotten from
     * redirecting back from the authorization url (see .getRedirect).
     *
     * Returns a promise which is rejected if there was an error
     * in obtaining authentication.
     */
    attempt(redirect, qs) {
        if (qs.error) {
            return Promise.reject(new chat_client_websocket_1.AuthenticationFailedError(qs.error_description || 'Error from oauth: ' + qs.error));
        }
        if (!qs.code) {
            // XXX: https://github.com/prettier/prettier/issues/3804
            return Promise.reject(new chat_client_websocket_1.AuthenticationFailedError('No error was given, but a code was not present in the query string. ' +
                `Make sure you're using the oauth client correctly.`)); // silly devlopers
        }
        return this.client
            .request('post', '/oauth/token', {
            form: Object.assign({ grant_type: 'authorization_code', code: qs.code, redirect_uri: redirect }, this.details),
        })
            .then(res => this.unpackResponse(res));
    }
    /**
     * Refreshes the authentication tokens, bumping the expires time.
     */
    refresh() {
        if (!this.tokens.refresh) {
            return Promise.reject(new chat_client_websocket_1.AuthenticationFailedError('Attempted to refresh without a refresh token present.'));
        }
        return this.client
            .request('post', '/oauth/token', {
            form: Object.assign({ grant_type: 'refresh_token', refresh_token: this.tokens.refresh }, this.details),
        })
            .then(res => this.unpackResponse(res));
    }
    /**
     * Returns info to add to the client's request.
     */
    getRequest() {
        const headers = {
            'Client-ID': this.details.client_id,
        };
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Bearer ${this.tokens.access}`;
        }
        return {
            headers,
        };
    }
    getClientId() {
        return this.details.client_id;
    }
}
exports.OAuthProvider = OAuthProvider;
//# sourceMappingURL=OAuth.js.map