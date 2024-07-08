import { ReactNode } from "react";
import { IParams } from "./params";

export interface IGame {
  id: string;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface IDetailGame extends IGame {
  description: string;
  minimum_system_requirements: SystemRequirements;
  screenshots: Screenshots[];
}

interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

interface Screenshots {
  id: number;
  image: string;
}

export interface IGameContext {
  games: IGame[] | null;
  game: IDetailGame | null;
  filteredGames: IGame[] | null;
  setFilteredGames: React.Dispatch<React.SetStateAction<IGame[] | null>>;
  setGames: React.Dispatch<React.SetStateAction<IGame[] | null>>;
  setGame: React.Dispatch<React.SetStateAction<IDetailGame | null>>;
  filteredGamesByPlatform: string | null;
  setFilteredGamesByPlatform: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  fetchGames: () => Promise<void>;
  fetchGameById: (id: string) => Promise<void>;
  fetchGamesByParam: (type: string, id: string) => Promise<void>;
  filterGamesByParams: (params: string) => Promise<void>;
}

export interface IGameProviderProps {
  children: ReactNode;
}
