/**
 * Simple wrapper that waits for a dispatches a method reply.
 */
var Reply = /** @class */ (function () {
    function Reply(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
    }
    /**
     * Handles "reply" packet data from the websocket.
     */
    Reply.prototype.handle = function (packet) {
        if (packet.error) {
            this.reject(packet.error);
        }
        else {
            this.resolve(packet.data);
        }
    };
    return Reply;
}());
export { Reply };
//# sourceMappingURL=Reply.js.map