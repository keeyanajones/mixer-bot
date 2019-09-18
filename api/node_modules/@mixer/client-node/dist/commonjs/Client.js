"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line import-name no-require-imports
const chat_client_websocket_1 = require("@mixer/chat-client-websocket");
const deepmerge_1 = require("deepmerge");
const querystring = require("querystring");
const OAuth_1 = require("./providers/OAuth");
const RequestRunner_1 = require("./RequestRunner");
const Channel_1 = require("./services/Channel");
const Chat_1 = require("./services/Chat");
const Clips_1 = require("./services/Clips");
const Game_1 = require("./services/Game");
// DO NOT EDIT, THIS IS UPDATE BY THE BUILD SCRIPT
const packageVersion = '0.13.0'; // package version
/**
 * Main client.
 */
class Client {
    /**
     * The primary Mixer client, responsible for storing authentication state
     * and dispatching requests to the API.
     */
    constructor(requestRunner) {
        this.requestRunner = requestRunner;
        this.urls = {
            api: 'https://mixer.com/api/v1',
            public: 'https://mixer.com',
        };
        this.channel = new Channel_1.ChannelService(this);
        this.chat = new Chat_1.ChatService(this);
        this.clips = new Clips_1.ClipsService(this);
        this.game = new Game_1.GameService(this);
        this.userAgent = this.buildUserAgent();
        if (!requestRunner) {
            this.requestRunner = new RequestRunner_1.DefaultRequestRunner();
        }
    }
    buildUserAgent() {
        const client = `MixerClient/${packageVersion}`;
        // tslint:disable-next-line no-typeof-undefined
        if (typeof navigator !== 'undefined') {
            // in-browser
            return navigator.userAgent + ' ' + client;
        }
        return client + ' (JavaScript; Node.js ' + process.version + ')';
    }
    /**
     * Sets the the API/public URLs for the client.
     */
    setUrl(kind, url) {
        this.urls[kind] = url;
        return this;
    }
    /**
     * Builds a path to the Mixer API by concating it with the address.
     */
    buildAddress(base, path, querystr) {
        let url = base;
        // Strip any trailing slash from the base
        if (url.slice(-1) === '/') {
            url = url.slice(0, -1);
        }
        let sanitizedPath = path;
        // And any leading slash from the path.
        if (sanitizedPath.charAt(0) === '/') {
            sanitizedPath = sanitizedPath.slice(1);
        }
        url = url + '/' + sanitizedPath;
        // And just add the query string
        if (querystr) {
            url += '?' + querystring.stringify(querystr);
        }
        return url;
    }
    /**
     * Creates and returns an authentication provider instance.
     */
    use(provider) {
        this.provider = provider;
        return provider;
    }
    /**
     * Returns the associated provider instance, as set by the
     * `use` method.
     */
    getProvider() {
        return this.provider;
    }
    /**
     * Attempts to run a given request.
     */
    request(method, path, data = {}) {
        const req = deepmerge_1.all([
            this.provider ? this.provider.getRequest() : {},
            {
                method: method || '',
                url: this.buildAddress(this.urls.api, path || ''),
                headers: {
                    'User-Agent': this.userAgent,
                },
                json: true,
            },
            data,
        ]);
        return this.requestRunner.run(req).catch(err => {
            if (this.provider) {
                return this.provider.handleResponseError(err, req);
            }
            throw err;
        });
    }
    createChatSocket(ws, endpoints, options) {
        return new chat_client_websocket_1.Socket(ws, endpoints, Object.assign({ clientId: this.provider instanceof OAuth_1.OAuthProvider ? this.provider.getClientId() : null }, options));
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map