"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple wrapper that waits for a dispatches a method reply.
 */
class Reply {
    constructor(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }
    /**
     * Handles "reply" packet data from the websocket.
     */
    handle(packet) {
        if (packet.error) {
            this.reject(packet.error);
        }
        else {
            this.resolve(packet.data);
        }
    }
}
exports.Reply = Reply;
//# sourceMappingURL=Reply.js.map