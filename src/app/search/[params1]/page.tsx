"use client";
import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGames } from "@/contexts/games";
import Game from "@/components/Game";
import SkeletonLoader from "@/components/Skeleton";
import Spinner from "@/components/Spinner";
import { IGame } from "@/interfaces/games";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import Image from "next/image";
import { paginate } from "@/utils/paginate";
import { getPageNumbers } from "@/utils/pageNumber";

const Games: React.FC = () => {
  const { params1 } = useParams<{
    params1: string;
  }>();
  const router = useRouter();
  const gameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const widthRef = useRef<number>(0);

  const handleClick = (id: string) => {
    router.push(`/game/${id}`);
  };

  const { filteredGames, setFilteredGames, setGames, filterGamesByParams } =
    useGames();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (params1) {
      filterGamesByParams(params1);
    }

    return () => {
      setGames(null);
      setFilteredGames(null);
    };
  }, [params1, setGames, setFilteredGames, filterGamesByParams]);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0 });
    }
  };

  useEffect(() => {
    widthRef.current = window.innerWidth < 1706 ? 3 : 8;

    const handleScroll = () => {
      gameRefs.current.forEach((ref, index) => {
        if (ref && index >= widthRef.current) {
          const top = ref.getBoundingClientRect().top;
          const isVisible = top >= 0 && top <= window.innerHeight - 350;
          if (isVisible) {
            ref.classList.add("animate-fade-up");
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const totalPages = filteredGames
    ? Math.ceil(filteredGames.length / pageSize)
    : 0;
  const currentGames = filteredGames
    ? paginate(filteredGames, pageSize, currentPage)
    : [];
  const pageNumbers = getPageNumbers(totalPages, currentPage);

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-5">
      {filteredGames === null ? (
        <SkeletonLoader width="500px" height="50" />
      ) : (
        <div className="w-full h-[250px] flex flex-col justify-center items-center text-center animate-fade-up">
          <h1 className="text-2xl md:text-5xl font-bold tracking-wide ">
            Top Free{" "}
            <span className="text-blue"> {capitalizeFirstLetter(params1)}</span>{" "}
            games
          </h1>
          <p className="text-xl md:text-2xl font-bold tracking-wide my-4">
            <span className="text-blue">
              {" "}
              {filteredGames && filteredGames.length}
            </span>{" "}
            free-to-play games that include the word{" "}
            <span className="text-blue">{params1}</span> were found in our games
            list.
          </p>
          <Image
            src="/svgs/arrow-down.svg"
            alt="arrow-down"
            width="20"
            height="20"
            className="animate-bounce animate-infinite my-2"
          />
        </div>
      )}

      <div className="w-full h-full flex flex-wrap justify-center items-center gap-5">
        {filteredGames === null ? (
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonLoader key={index} width="340px" height="280px" />
          ))
        ) : filteredGames && filteredGames.length === 0 ? (
          <Spinner />
        ) : (
          currentGames &&
          currentGames.map((game: IGame, index: number) => (
            <div
              ref={(element) => {
                if (element) {
                  gameRefs.current[index] = element; // Assigning the ref to the array
                }
              }}
              onClick={() => handleClick(game.id)}
              key={game.id}
              className={`w-full h-full max-w-[300px] xl:max-w-[340px] ${
                index >= 8 ? "opacity-0" : ""
              }`}
            >
              <Game
                id={game.id}
                title={game.title}
                thumbnail={game.thumbnail}
                short_description={game.short_description}
                game_url={game.game_url}
                genre={game.genre}
                platform={game.platform}
                publisher={game.publisher}
                developer={game.developer}
                release_date={game.release_date}
                freetogame_profile_url={game.freetogame_profile_url}
              />
            </div>
          ))
        )}
      </div>
      {filteredGames && filteredGames.length > pageSize && (
        <div className="flex w-full justify-center gap-2 mt-4 bg-light_grey p-4 rounded-md  mx-auto">
          <button
            className="px-3 py-1 rounded bg-dark_grey hover:bg-light_detail hover:text-white"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <Image
              src="/svgs/arrow-left.svg"
              width="10"
              height="10"
              alt="left"
            />
          </button>
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && handlePageChange(page)}
              className={`px-3 py-1  rounded ${
                currentPage === page
                  ? "bg-light_detail border text-white"
                  : "bg-dark_grey"
              }`}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-dark_grey hover:bg-light_detail hover:text-white"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <Image
              src="/svgs/arrow-right.svg"
              width="10"
              height="10"
              alt="right"
            />
          </button>
        </div>
      )}
    </section>
  );
};

export default Games;
