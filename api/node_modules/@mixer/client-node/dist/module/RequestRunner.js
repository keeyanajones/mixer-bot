import * as request from 'request';
/**
 * Default request runner.
 */
var DefaultRequestRunner = /** @class */ (function () {
    function DefaultRequestRunner() {
    }
    DefaultRequestRunner.prototype.run = function (options) {
        return new Promise(function (resolve, reject) {
            request(options, function (error, response) {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(response);
            });
        });
    };
    return DefaultRequestRunner;
}());
export { DefaultRequestRunner };
//# sourceMappingURL=RequestRunner.js.map