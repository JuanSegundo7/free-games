"use client";
import Image from "next/image";
import FreeGames from "./free-games";
import { useGames } from "@/contexts/games";

export default function Home() {
  const { filteredGamesByPlatform } = useGames();

  return (
    <section>
      <div className="w-full h-[250px] flex flex-col justify-center items-center text-center animate-fade-up">
        <h1 className="text-2xl md:text-5xl font-bold tracking-wide text-blue">
          Welcome to FreeGames
        </h1>
        <p className="text-xl md:text-2xl font-bold tracking-wide my-2">
          The best place to check the best
          <span className="text-blue"> FreeGames</span>
          {filteredGamesByPlatform && " for "}
          {filteredGamesByPlatform && (
            <span className="text-blue">
              {filteredGamesByPlatform && filteredGamesByPlatform + " "}
            </span>
          )}{" "}
          at the moment.
        </p>
        <Image
          src="/svgs/arrow-down.svg"
          alt="arrow-down"
          width="20"
          height="20"
          className="animate-bounce animate-infinite my-2"
        />
      </div>
      <FreeGames />
    </section>
  );
}
