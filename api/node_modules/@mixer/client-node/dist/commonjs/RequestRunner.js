"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
/**
 * Default request runner.
 */
class DefaultRequestRunner {
    run(options) {
        return new Promise((resolve, reject) => {
            request(options, (error, response) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(response);
            });
        });
    }
}
exports.DefaultRequestRunner = DefaultRequestRunner;
//# sourceMappingURL=RequestRunner.js.map