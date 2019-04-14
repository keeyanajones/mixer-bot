import { IGame, IInteractiveChannel, IVersion } from '../defs/interactive';
import { IUser } from '../defs/user';
import { IResponse } from '../RequestRunner';
import { Service } from '../services/Service';
export interface IJoinResponse {
    address: string;
    key: string;
}
export interface IGameVersioned extends IGame {
    versions: IVersion[];
}
export interface IPublished extends IGame {
    owner: IUser;
}
/**
 * Service for interacting with the game endpoints on the Mixer REST API.
 */
export declare class GameService extends Service {
    /**
     * Joins the game for a specified channel ID.
     */
    join(channelId: number): Promise<IResponse<IJoinResponse>>;
    /**
     * Gets a game from a specified game ID.
     */
    getGame(gameId: number): Promise<IResponse<IGame>>;
    /**
     * Updates a game from a specified game ID.
     */
    updateGame(gameId: number, data: Partial<IGame>): Promise<IResponse<IGame>>;
    /**
     * Deletes a game from a specified game ID.
     */
    deleteGame(gameId: number): Promise<IResponse<void>>;
    /**
     * Gets various information about a channel that is running an interactive game.
     */
    getChannelGame(channelId: number): Promise<IResponse<IInteractiveChannel>>;
    /**
     * Gets all the games owned by a specific user ID.
     */
    ownedGames(userId: number): Promise<IResponse<IGameVersioned>>;
    /**
     * Gets a specific game and all its versions by a specific game ID and user ID.
     */
    ownedGameVersions(userId: number, gameId: number): Promise<IResponse<IGameVersioned>>;
    /**
     * Gets all the games that are published.
     */
    published(): Promise<IResponse<{}>>;
    /**
     * Creates a new interactive game.
     */
    create(data: Pick<IGame, 'ownerId' | 'name' | 'description' | 'installation'>): Promise<IResponse<IGame>>;
    /**
     * Creates a new version of a game for a specific game ID and user ID.
     */
    createVersion(data: Pick<IVersion, 'gameId' | 'version' | 'changelog' | 'installation' | 'download' | 'controls'>): Promise<IResponse<IVersion>>;
    /**
     * Updates a version of a game by specific version ID.
     */
    updateVersion(versionId: number, data: Pick<IVersion, 'version' | 'changelog' | 'installation' | 'download' | 'controls'>): Promise<IResponse<IVersion>>;
}
