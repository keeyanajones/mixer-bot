import { Client } from '../Client';
import { IOptionalUrlRequestOptions, IRequestOptions, IResponse } from '../RequestRunner';
/**
 * Base class for service provider.
 */
export declare abstract class Provider {
    protected client: Client;
    constructor(client: Client);
    abstract attempt(...args: any[]): Promise<void>;
    /**
     * Returns info to add to the client's request.
     */
    getRequest(): IOptionalUrlRequestOptions;
    /**
     * Given a failing response from the client, processes the error object and returns a Promise
     * which allows for a provider to retry a request or carry out some other process
     */
    handleResponseError(err: IResponse<any>, _requestOptions: IRequestOptions): Promise<IResponse<any>>;
}
