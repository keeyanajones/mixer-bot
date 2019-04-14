"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("./Service");
/**
 * Service for interacting with clips on the Mixer REST API.
 */
class ClipsService extends Service_1.Service {
    /**
     * Can a clip be created on the given broadcast. Check the response code.
     * 200: can clip
     * 400-500: cannot clip
     */
    canClip(broadcastId) {
        return this.makeHandled('get', `clips/broadcasts/${broadcastId}/canClip`);
    }
    /**
     * Creates a clip.
     * 200: clip created
     * 400-500: cannot clip
     */
    createClip(p) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeHandled('post', `clips/create`, { body: p });
        });
    }
    /**
     * Deletes a clip.
     * 202: clip deleted
     * 400-500: cannot delete clip
     */
    deleteClip(shareableId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeHandled('delete', `clips/delete/${shareableId}`);
        });
    }
    /**
     * Gets a clip.
     */
    getClip(shareableId) {
        return this.makeHandled('get', `clips/${shareableId}`);
    }
    /**
     * Renames a clip.
     */
    renameClip(shareableId, newTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.makeHandled('post', `clips/${shareableId}/metadata`, { body: { title: newTitle } });
        });
    }
    /**
     * Returns all clips for the channel.
     */
    getClips(channelId) {
        return this.makeHandled('get', `clips/channels/${channelId}`);
    }
}
exports.ClipsService = ClipsService;
//# sourceMappingURL=Clips.js.map