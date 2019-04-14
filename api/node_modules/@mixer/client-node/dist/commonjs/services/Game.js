"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Service_1 = require("../services/Service");
/**
 * Service for interacting with the game endpoints on the Mixer REST API.
 */
class GameService extends Service_1.Service {
    /**
     * Joins the game for a specified channel ID.
     */
    join(channelId) {
        return this.makeHandled('get', `interactive/${channelId}/robot`);
    }
    /**
     * Gets a game from a specified game ID.
     */
    getGame(gameId) {
        return this.makeHandled('get', `interactive/games/${gameId}`);
    }
    /**
     * Updates a game from a specified game ID.
     */
    updateGame(gameId, data) {
        return this.makeHandled('put', `interactive/games/${gameId}`, {
            body: data,
        });
    }
    /**
     * Deletes a game from a specified game ID.
     */
    deleteGame(gameId) {
        return this.makeHandled('delete', `interactive/games/${gameId}`);
    }
    /**
     * Gets various information about a channel that is running an interactive game.
     */
    getChannelGame(channelId) {
        return this.makeHandled('get', `interactive/${channelId}`);
    }
    /**
     * Gets all the games owned by a specific user ID.
     */
    ownedGames(userId) {
        return this.makeHandled('get', `interactive/games/owned?user=${userId}`);
    }
    /**
     * Gets a specific game and all its versions by a specific game ID and user ID.
     */
    ownedGameVersions(userId, gameId) {
        return this.makeHandled('get', `interactive/games/owned?user=${userId}&where=id.eq.${gameId}`);
    }
    /**
     * Gets all the games that are published.
     */
    published() {
        return this.makeHandled('get', 'interactive/games');
    }
    /**
     * Creates a new interactive game.
     */
    create(data) {
        return this.makeHandled('post', 'interactive/games', {
            body: data,
        });
    }
    /**
     * Creates a new version of a game for a specific game ID and user ID.
     */
    createVersion(data) {
        return this.makeHandled('post', 'interactive/versions', {
            body: data,
        });
    }
    /**
     * Updates a version of a game by specific version ID.
     */
    updateVersion(versionId, data) {
        return this.makeHandled('put', `interactive/versions/${versionId}`, {
            body: data,
        });
    }
}
exports.GameService = GameService;
//# sourceMappingURL=Game.js.map