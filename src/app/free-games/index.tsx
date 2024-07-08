import Game from "@/components/Game";
import SkeletonLoader from "@/components/Skeleton";
import Spinner from "@/components/Spinner";
import { useGames } from "@/contexts/games";
import { IGame } from "@/interfaces/games";
import { getPageNumbers } from "@/utils/pageNumber";
import { paginate } from "@/utils/paginate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const FreeGames = () => {
  const { games, setGames, fetchGames } = useGames();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const gameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const widthRef = useRef<number>(0);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchGames();

    return () => {
      setGames(null);
    };
  }, [fetchGames, setGames]);

  useEffect(() => {
    widthRef.current = window.innerWidth < 1706 ? 3 : 4;

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

  const handleClick = (id: string) => {
    router.push(`/game/${id}`);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0 });
    }
  };

  const totalPages = games ? Math.ceil(games.length / pageSize) : 0;
  const currentGames = games ? paginate(games, pageSize, currentPage) : [];
  const pageNumbers = getPageNumbers(totalPages, currentPage);

  return (
    <section className="w-full h-full flex flex-wrap justify-center items-center gap-5">
      {games === null ? (
        Array.from({ length: 10 }).map((_, index) => (
          <SkeletonLoader key={index} width="340px" height="280px" />
        ))
      ) : games.length === 0 ? (
        <Spinner />
      ) : (
        currentGames &&
        currentGames.map((game: IGame, index: number) => (
          <div
            ref={(element) => {
              if (element) {
                gameRefs.current[index] = element;
              }
            }}
            onClick={() => handleClick(game.id)}
            key={game.id}
            className={`w-full max-w-[300px] xl:max-w-[340px] ${
              index >= widthRef.current ? "opacity-0" : ""
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
      {games && games.length > pageSize && (
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

export default FreeGames;
