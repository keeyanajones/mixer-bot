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
import { Service } from '../services/Service';
/**
 * Service for interacting with the game endpoints on the Mixer REST API.
 */
var GameService = /** @class */ (function (_super) {
    __extends(GameService, _super);
    function GameService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Joins the game for a specified channel ID.
     */
    GameService.prototype.join = function (channelId) {
        return this.makeHandled('get', "interactive/" + channelId + "/robot");
    };
    /**
     * Gets a game from a specified game ID.
     */
    GameService.prototype.getGame = function (gameId) {
        return this.makeHandled('get', "interactive/games/" + gameId);
    };
    /**
     * Updates a game from a specified game ID.
     */
    GameService.prototype.updateGame = function (gameId, data) {
        return this.makeHandled('put', "interactive/games/" + gameId, {
            body: data,
        });
    };
    /**
     * Deletes a game from a specified game ID.
     */
    GameService.prototype.deleteGame = function (gameId) {
        return this.makeHandled('delete', "interactive/games/" + gameId);
    };
    /**
     * Gets various information about a channel that is running an interactive game.
     */
    GameService.prototype.getChannelGame = function (channelId) {
        return this.makeHandled('get', "interactive/" + channelId);
    };
    /**
     * Gets all the games owned by a specific user ID.
     */
    GameService.prototype.ownedGames = function (userId) {
        return this.makeHandled('get', "interactive/games/owned?user=" + userId);
    };
    /**
     * Gets a specific game and all its versions by a specific game ID and user ID.
     */
    GameService.prototype.ownedGameVersions = function (userId, gameId) {
        return this.makeHandled('get', "interactive/games/owned?user=" + userId + "&where=id.eq." + gameId);
    };
    /**
     * Gets all the games that are published.
     */
    GameService.prototype.published = function () {
        return this.makeHandled('get', 'interactive/games');
    };
    /**
     * Creates a new interactive game.
     */
    GameService.prototype.create = function (data) {
        return this.makeHandled('post', 'interactive/games', {
            body: data,
        });
    };
    /**
     * Creates a new version of a game for a specific game ID and user ID.
     */
    GameService.prototype.createVersion = function (data) {
        return this.makeHandled('post', 'interactive/versions', {
            body: data,
        });
    };
    /**
     * Updates a version of a game by specific version ID.
     */
    GameService.prototype.updateVersion = function (versionId, data) {
        return this.makeHandled('put', "interactive/versions/" + versionId, {
            body: data,
        });
    };
    return GameService;
}(Service));
export { GameService };
//# sourceMappingURL=Game.js.map