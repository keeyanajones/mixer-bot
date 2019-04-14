import { Client } from '../Client';
import { IOptionalUrlRequestOptions, IResponse } from '../RequestRunner';
export declare type ICtor = new (msg: any) => void;
/**
 * A service is basically a bridge/handler function for various endpoints.
 * It can be passed into the client and used magically.
 */
export declare class Service {
    private client;
    constructor(client: Client);
    /**
     * Takes a response. If the status code isn't 200, attempt to find an
     * error handler for it or throw unknown error. If it's all good,
     * we return the response synchronously.
     */
    protected handleResponse(res: IResponse<any>, handlers?: {
        [key: string]: ICtor;
    }): IResponse<any>;
    /**
     * Simple wrapper that makes and handles a response in one go.
     */
    protected makeHandled<T>(method: string, path: string, data?: IOptionalUrlRequestOptions, handlers?: {
        [key: string]: ICtor;
    }): Promise<IResponse<T>>;
}
