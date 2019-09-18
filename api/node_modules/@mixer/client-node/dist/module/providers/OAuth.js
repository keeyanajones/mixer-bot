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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AuthenticationFailedError } from '@mixer/chat-client-websocket';
import { Provider } from './Provider';
/**
 * Provider for oauth-based authentication.
 */
var OAuthProvider = /** @class */ (function (_super) {
    __extends(OAuthProvider, _super);
    function OAuthProvider(client, options) {
        var _this = _super.call(this, client) || this;
        _this.details = { client_id: options.clientId, client_secret: options.secret };
        _this.setTokens(options.tokens);
        return _this;
    }
    /**
     * Returns if the client is currently authenticated: they must
     * have a non-expired key pair.
     */
    OAuthProvider.prototype.isAuthenticated = function () {
        return this.tokens.access !== undefined && this.tokens.expires.getTime() > Date.now();
    };
    /**
     * Returns a redirect to the webpage to get authentication.
     */
    OAuthProvider.prototype.getRedirect = function (redirect, permissions) {
        var params = {
            redirect_uri: redirect,
            response_type: 'code',
            scope: typeof permissions === 'string' ? permissions : permissions.join(' '),
            client_id: this.details.client_id,
        };
        return this.client.buildAddress(this.client.urls.public, '/oauth/authorize', params);
    };
    /**
     * Returns the access token, if any, or undefined.
     */
    OAuthProvider.prototype.accessToken = function () {
        return this.tokens.access;
    };
    /**
     * Returns the refresh token, if any, or undefined.
     */
    OAuthProvider.prototype.refreshToken = function () {
        return this.tokens.refresh;
    };
    /**
     * Returns the date that the current tokens expire. You must refresh
     * before then, or reauthenticate.
     */
    OAuthProvider.prototype.expires = function () {
        return this.tokens.expires;
    };
    /**
     * Returns the set of tokens. These can be saved and used to
     * reload the provider later using OAuthProvider.fromTokens.
     */
    OAuthProvider.prototype.getTokens = function () {
        return this.tokens;
    };
    /**
     * Sets the tokens for the oauth provider.
     */
    OAuthProvider.prototype.setTokens = function (tokens) {
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
    };
    /**
     * Unpacks data from a token response.
     */
    OAuthProvider.prototype.unpackResponse = function (res) {
        if (res.statusCode !== 200) {
            throw new AuthenticationFailedError(res);
        }
        this.tokens = {
            access: res.body.access_token,
            refresh: res.body.refresh_token,
            expires: new Date(Date.now() + res.body.expires_in * 1000),
        };
    };
    /**
     * Attempts to authenticate based on a query string, gotten from
     * redirecting back from the authorization url (see .getRedirect).
     *
     * Returns a promise which is rejected if there was an error
     * in obtaining authentication.
     */
    OAuthProvider.prototype.attempt = function (redirect, qs) {
        var _this = this;
        if (qs.error) {
            return Promise.reject(new AuthenticationFailedError(qs.error_description || 'Error from oauth: ' + qs.error));
        }
        if (!qs.code) {
            // XXX: https://github.com/prettier/prettier/issues/3804
            return Promise.reject(new AuthenticationFailedError('No error was given, but a code was not present in the query string. ' +
                "Make sure you're using the oauth client correctly.")); // silly devlopers
        }
        return this.client
            .request('post', '/oauth/token', {
            form: __assign({ grant_type: 'authorization_code', code: qs.code, redirect_uri: redirect }, this.details),
        })
            .then(function (res) { return _this.unpackResponse(res); });
    };
    /**
     * Refreshes the authentication tokens, bumping the expires time.
     */
    OAuthProvider.prototype.refresh = function () {
        var _this = this;
        if (!this.tokens.refresh) {
            return Promise.reject(new AuthenticationFailedError('Attempted to refresh without a refresh token present.'));
        }
        return this.client
            .request('post', '/oauth/token', {
            form: __assign({ grant_type: 'refresh_token', refresh_token: this.tokens.refresh }, this.details),
        })
            .then(function (res) { return _this.unpackResponse(res); });
    };
    /**
     * Returns info to add to the client's request.
     */
    OAuthProvider.prototype.getRequest = function () {
        var headers = {
            'Client-ID': this.details.client_id,
        };
        if (this.isAuthenticated()) {
            headers['Authorization'] = "Bearer " + this.tokens.access;
        }
        return {
            headers: headers,
        };
    };
    OAuthProvider.prototype.getClientId = function () {
        return this.details.client_id;
    };
    return OAuthProvider;
}(Provider));
export { OAuthProvider };
//# sourceMappingURL=OAuth.js.map