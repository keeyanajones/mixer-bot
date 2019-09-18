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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Service } from './Service';
/**
 * Service for interacting with clips on the Mixer REST API.
 */
var ClipsService = /** @class */ (function (_super) {
    __extends(ClipsService, _super);
    function ClipsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Can a clip be created on the given broadcast. Check the response code.
     * 200: can clip
     * 400-500: cannot clip
     */
    ClipsService.prototype.canClip = function (broadcastId) {
        return this.makeHandled('get', "clips/broadcasts/" + broadcastId + "/canClip");
    };
    /**
     * Creates a clip.
     * 200: clip created
     * 400-500: cannot clip
     */
    ClipsService.prototype.createClip = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeHandled('post', "clips/create", { body: p })];
            });
        });
    };
    /**
     * Deletes a clip.
     * 202: clip deleted
     * 400-500: cannot delete clip
     */
    ClipsService.prototype.deleteClip = function (shareableId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeHandled('delete', "clips/delete/" + shareableId)];
            });
        });
    };
    /**
     * Gets a clip.
     */
    ClipsService.prototype.getClip = function (shareableId) {
        return this.makeHandled('get', "clips/" + shareableId);
    };
    /**
     * Renames a clip.
     */
    ClipsService.prototype.renameClip = function (shareableId, newTitle) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.makeHandled('post', "clips/" + shareableId + "/metadata", { body: { title: newTitle } })];
            });
        });
    };
    /**
     * Returns all clips for the channel.
     */
    ClipsService.prototype.getClips = function (channelId) {
        return this.makeHandled('get', "clips/channels/" + channelId);
    };
    return ClipsService;
}(Service));
export { ClipsService };
//# sourceMappingURL=Clips.js.map