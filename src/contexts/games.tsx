import React, { createContext, useContext, useState, useCallback } from "react";
import get_games from "@/apis/axios.get-games";
import {
  IDetailGame,
  IGame,
  IGameContext,
  IGameProviderProps,
} from "@/interfaces/games";
import get_game_by_id from "@/apis/axios.get-game-by-id";
import get_games_by_params from "@/apis/axios.get-games-by-params";

const GameContext = createContext<IGameContext | undefined>(undefined);

export const GameProvider: React.FC<IGameProviderProps> = ({ children }) => {
  const [games, setGames] = useState<IGame[] | null>(null);
  const [filteredGames, setFilteredGames] = useState<IGame[] | null>(null);
  const [filteredGamesByPlatform, setFilteredGamesByPlatform] = useState<
    string | null
  >(null);
  const [game, setGame] = useState<IDetailGame | null>({
    id: "",
    title: "",
    thumbnail: "",
    short_description: "",
    description: "",
    game_url: "",
    genre: "",
    platform: "",
    publisher: "",
    developer: "",
    release_date: "",
    freetogame_profile_url: "",
    minimum_system_requirements: {
      os: "",
      processor: "",
      memory: "",
      graphics: "",
      storage: "",
    },
    screenshots: [],
  });

  const fetchGames = useCallback(async () => {
    try {
      const data = await get_games();

      if (filteredGamesByPlatform && filteredGamesByPlatform === "windows") {
        const filteredGames =
          data &&
          data.filter((game: IGame) =>
            game.platform.toLowerCase().includes(filteredGamesByPlatform)
          );
        return setGames(filteredGames);
      }

      if (filteredGamesByPlatform && filteredGamesByPlatform === "browser") {
        const filteredGames =
          data &&
          data.filter((game: IGame) =>
            game.platform.toLowerCase().includes(filteredGamesByPlatform)
          );
        return setGames(filteredGames);
      }
      setGames(data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  }, [filteredGamesByPlatform]);

  const filterGamesByParams = useCallback(
    async (params: string) => {
      try {
        const data = await get_games();
        const filteredGames =
          data &&
          data.filter((game: IGame) =>
            game.title.toLowerCase().includes(params.toLowerCase())
          );

        if (filteredGamesByPlatform && filteredGamesByPlatform === "windows") {
          const filteredGames =
            data &&
            data.filter((game: IGame) =>
              game.platform.toLowerCase().includes(filteredGamesByPlatform)
            );
          return setFilteredGames(filteredGames);
        }

        if (filteredGamesByPlatform && filteredGamesByPlatform === "browser") {
          const filteredGames =
            data &&
            data.filter((game: IGame) =>
              game.platform.toLowerCase().includes(filteredGamesByPlatform)
            );
          return setFilteredGames(filteredGames);
        }
        setFilteredGames(filteredGames);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    },
    [filteredGamesByPlatform]
  );

  const fetchGameById = useCallback(async (id: string) => {
    try {
      const data = await get_game_by_id(id);
      return setGame(data);
    } catch (error) {
      console.error("Error fetching game by param:", error);
    }
  }, []);

  const fetchGamesByParam = useCallback(
    async (type: string, id: string) => {
      try {
        const data = await get_games_by_params(type, id);

        if (filteredGamesByPlatform && filteredGamesByPlatform === "windows") {
          const filteredGames =
            data &&
            data.filter((game: IGame) =>
              game.platform.toLowerCase().includes(filteredGamesByPlatform)
            );
          return setGames(filteredGames);
        }

        if (filteredGamesByPlatform && filteredGamesByPlatform === "browser") {
          const filteredGames =
            data &&
            data.filter((game: IGame) =>
              game.platform.toLowerCase().includes(filteredGamesByPlatform)
            );
          return setGames(filteredGames);
        }

        return setGames(data);
      } catch (error) {
        console.error("Error fetching game by param:", error);
      }
    },
    [filteredGamesByPlatform]
  );

  return (
    <GameContext.Provider
      value={{
        games,
        setGames,
        filteredGames,
        setFilteredGames,
        game,
        setGame,
        filteredGamesByPlatform,
        setFilteredGamesByPlatform,
        fetchGames,
        fetchGameById,
        fetchGamesByParam,
        filterGamesByParams,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGames = (): IGameContext => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGames must be used within a GameProvider");
  }
  return context;
};

export default GameContext;
