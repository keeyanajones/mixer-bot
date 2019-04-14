import * as request from 'request';
export interface IOptionalUrlRequestOptions extends request.CoreOptions {
    url?: string;
}
export declare type IRequestOptions = request.CoreOptions & (request.UriOptions | request.UrlOptions);
export interface IRequestRunner {
    run(options: IRequestOptions): Promise<request.RequestResponse>;
}
export interface IResponse<T> extends request.RequestResponse {
    body: T;
}
/**
 * Default request runner.
 */
export declare class DefaultRequestRunner implements IRequestRunner {
    run<T>(options: IRequestOptions & (request.UriOptions | request.UrlOptions)): Promise<IResponse<T>>;
}
