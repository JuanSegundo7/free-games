import { IGame } from "@/interfaces/games";
import { platformGenre } from "@/utils/genre";
import { platformImage } from "@/utils/platform";
import Image from "next/image";
import React from "react";

const Game = ({
  id,
  title,
  thumbnail,
  short_description,
  genre,
  platform,
}: IGame) => {
  return (
    <div
      key={id}
      className="w-full h-full flex flex-col justify-center items-center max-w-[300px] xl:max-w-[340px] bg-light_grey rounded-md cursor-pointer"
    >
      <Image
        width="300"
        height="300"
        src={thumbnail}
        className="w-full h-[170px] max-w-[300px] rounded-t-md xl:max-w-[340px] xl:h-[220px]"
        alt="title"
      />
      <div className="w-full h-full flex flex-col justify-center items-center p-4 gap-3">
        <div className="w-full">
          <h3 className="truncate">{title}</h3>
        </div>
        <div className="w-full text-neutral-500">
          <p className="truncate text-xs">{short_description}</p>
        </div>
        <div className="w-full flex justify-between items-center text-sm">
          <div className="flex justify-center items-center gap-2">
            <Image
              width="15"
              height="15"
              src={platformGenre(genre)}
              alt="genre"
            />
            <div className="rounded-md w-full h-full bg-blue px-2 py-[2px]">
              <p className="text-xs">{genre}</p>
            </div>
          </div>
          <Image
            width="15"
            height="15"
            src={platformImage(platform)}
            alt="platform"
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
