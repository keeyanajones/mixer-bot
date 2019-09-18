import { IGenericWebSocket, ISocketOptions, Socket } from '@mixer/chat-client-websocket';
import { Provider } from './providers/Provider';
import { IOptionalUrlRequestOptions, IRequestRunner, IResponse } from './RequestRunner';
import { ChannelService } from './services/Channel';
import { ChatService } from './services/Chat';
import { ClipsService } from './services/Clips';
import { GameService } from './services/Game';
/**
 * Main client.
 */
export declare class Client {
    private requestRunner?;
    private provider;
    private userAgent;
    urls: {
        api: string;
        public: string;
    };
    channel: ChannelService;
    chat: ChatService;
    clips: ClipsService;
    game: GameService;
    /**
     * The primary Mixer client, responsible for storing authentication state
     * and dispatching requests to the API.
     */
    constructor(requestRunner?: IRequestRunner);
    private buildUserAgent;
    /**
     * Sets the the API/public URLs for the client.
     */
    setUrl(kind: 'api' | 'public', url: string): this;
    /**
     * Builds a path to the Mixer API by concating it with the address.
     */
    buildAddress(base: string, path: string, querystr?: string | Object): string;
    /**
     * Creates and returns an authentication provider instance.
     */
    use(provider: Provider): Provider;
    /**
     * Returns the associated provider instance, as set by the
     * `use` method.
     */
    getProvider(): Provider;
    /**
     * Attempts to run a given request.
     */
    request<T>(method: string, path: string, data?: IOptionalUrlRequestOptions): Promise<IResponse<T>>;
    createChatSocket(ws: IGenericWebSocket, endpoints: string[], options: ISocketOptions): Socket;
}
