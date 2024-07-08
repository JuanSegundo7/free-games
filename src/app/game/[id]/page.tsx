"use client";

import { useGames } from "@/contexts/games";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import Spinner from "@/components/Spinner";
import { platformGenre } from "@/utils/genre";
import { platformImage } from "@/utils/platform";
import SkeletonLoader from "@/components/Skeleton";
import Carousel from "@/components/Carousel";

const GamePage = () => {
  const { game, setGame, fetchGameById } = useGames();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    window.scrollTo({ top: 0 });

    if (id) {
      fetchGameById(id as string);
    }
    return () => {
      setGame(null);
    };
  }, [id, setGame, fetchGameById]);

  return (
    <section className="w-full h-full flex flex-col justify-evenly items-center gap-8 md:gap-5">
      {game && game.id && Object.keys(game).length > 0 ? (
        <div className="flex flex-col-reverse md:flex-row">
          <article className="h-full flex flex-col justify-evenly items-start gap-8 md:gap-5 container-calc">
            <div className="flex justify-center items-center gap-3">
              <h2 className="text-xl">{game.title}</h2>
              <p>|</p>
              <div className="flex justify-center items-center gap-2">
                <Image
                  width="20"
                  height="20"
                  src={platformGenre(game.genre)}
                  alt="genre"
                />
                <div className="rounded-md w-full h-full bg-blue px-2 py-[2px]">
                  <p className="text-xs">{game.genre}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:hidden">
              <Image
                src={game.thumbnail}
                alt="image"
                width="300"
                height="300"
                className="w-full h-full"
              />
              <div className="flex w-full flex-row justify-between p-2 border-b border-white/10">
                <p className="text-ligth_grey_detail">Developer</p>
                <p>{game.developer}</p>
              </div>
              <div className="flex w-full flex-row justify-between p-2 border-b border-white/10">
                <p className="text-ligth_grey_detail">Publisher</p>
                <p>{game.publisher}</p>
              </div>
              <div className="flex w-full flex-row justify-between p-2 border-b border-white/10">
                <p className="text-ligth_grey_detail">Release date</p>
                <p>{game.release_date}</p>
              </div>
              <div className="flex w-full flex-row justify-between p-2 border-b border-white/10">
                <p className="text-ligth_grey_detail">Platform</p>
                <Image
                  width="20"
                  height="20"
                  src={platformImage(game.genre)}
                  alt="genre"
                />
              </div>
              <div className="rounded-md w-full h-full bg-blue p-2 flex justify-center">
                Share
              </div>
            </div>
            {game.screenshots.length ? (
              <Carousel screenshots={game.screenshots} />
            ) : (
              <p>There is not screenshots availables</p>
            )}
            <div className="break-words text-sm w-full max-w-[740px] mx-auto">
              <p>{game.description}</p>
            </div>
            <div className="flex flex-col justify-center items-start gap-3 bg-light_grey text-sm p-4 rounded-md w-full">
              {!game.minimum_system_requirements ? (
                <p>There are not minium requirements availables</p>
              ) : (
                <>
                  <h3>Minium requirements</h3>
                  <div className="w-full py-2 border-b border-dark_grey md:flex md:justify-between">
                    <p className="text-ligth_grey_detail text-xs">Graphics</p>
                    <p>{game.minimum_system_requirements.graphics}</p>
                  </div>
                  <div className="w-full py-2 border-b border-dark_grey md:flex md:justify-between">
                    <p className="text-ligth_grey_detail text-xs">Memory</p>
                    <p>{game.minimum_system_requirements.memory}</p>
                  </div>
                  <div className="w-full py-2 border-b border-dark_grey md:flex md:justify-between">
                    <p className="text-ligth_grey_detail text-xs">
                      Operative system
                    </p>
                    <p>{game.minimum_system_requirements.os}</p>
                  </div>
                  <div className="w-full py-2 border-b border-dark_grey md:flex md:justify-between">
                    <p className="text-ligth_grey_detail text-xs">Procesor</p>
                    <p>{game.minimum_system_requirements.processor}</p>
                  </div>
                  <div className="w-full py-2 border-b border-dark_grey md:flex md:justify-between">
                    <p className="text-ligth_grey_detail text-xs">Storage</p>
                    <p>{game.minimum_system_requirements.storage}</p>
                  </div>
                </>
              )}
            </div>
          </article>
          <article className="hidden w-full h-full flex-col justify-evenly items-center gap-5 top-[90px] sticky mt-2 ml-16 text-sm md:flex">
            <Image
              src={game.thumbnail}
              alt="image"
              width="300"
              height="300"
              className="w-full h-full max-w-[256px] max-h-[120px] hidden sm:block"
            />
            <div className="flex w-full flex-row justify-between py-2 border-b border-white/10">
              <p className="text-ligth_grey_detail">Developer</p>
              <p>{game.developer}</p>
            </div>
            <div className="flex w-full flex-row justify-between py-2 border-b border-white/10">
              <p className="text-ligth_grey_detail">Publisher</p>
              <p>{game.publisher}</p>
            </div>
            <div className="flex w-full flex-row justify-between py-2 border-b border-white/10">
              <p className="text-ligth_grey_detail">Release date</p>
              <p>{game.release_date}</p>
            </div>
            <div className="flex w-full flex-row justify-between py-2 border-b border-white/10">
              <p className="text-ligth_grey_detail">Platform</p>
              <Image
                width="20"
                height="20"
                src={platformImage(game.genre)}
                alt="genre"
              />
            </div>
            <div className="rounded-md w-full h-full bg-blue px-2 py-2 flex justify-center">
              Share
            </div>
          </article>
        </div>
      ) : (
        <div className="flex w-full flex-col-reverse md:flex-row">
          <article className="h-full w-full flex flex-col justify-start items-start gap-8 md:gap-5 container-calc max-w-[740px]">
            <div className="w-full h-full flex justify-center items-center gap-3 max-w-[740px]">
              <SkeletonLoader width="100%" height="20px" />
              <p>|</p>
              <div className="flex w-full h-full justify-center items-center gap-2">
                <SkeletonLoader width="100%" height="20px" />
                <SkeletonLoader width="100%" height="20px" />
              </div>
            </div>
            <div className="w-full max-w-[740px]">
              <SkeletonLoader width="100%" height="300px" />
              <div className="flex w-full justify-start items-center gap-3 mt-4">
                <SkeletonLoader width="100px" height="56px" />
                <SkeletonLoader width="100px" height="56px" />
                <SkeletonLoader width="100px" height="56px" />
                <SkeletonLoader width="100px" height="56px" />
              </div>
            </div>
            <div className="w-full md:hidden">
              <SkeletonLoader width="100%" height="300px" />
              <div className="flex w-full flex-row justify-between p-2 border-b border-white/10">
                <SkeletonLoader width="150px" height="20px" />
                <SkeletonLoader width="150px" height="20px" />
              </div>
              <div className="flex w-full flex-row justify-between p-2 border-b border-white/10">
                <SkeletonLoader width="150px" height="20px" />
                <SkeletonLoader width="150px" height="20px" />
              </div>
              <div className="flex w-full h-full flex-row justify-between p-2 border-b border-white/10">
                <SkeletonLoader width="150px" height="20px" />
                <SkeletonLoader width="150px" height="20px" />
              </div>
              <div className="flex w-full flex-row justify-between p-2 border-b border-white/10">
                <SkeletonLoader width="150px" height="20px" />
                <SkeletonLoader width="150px" height="20px" />
              </div>
              <div className="rounded-md w-full h-full bg-blue p-2 flex justify-center">
                <SkeletonLoader width="150px" height="20px" />
              </div>
            </div>
            {/* <SkeletonLoader width="100%" height="200px" /> */}
            <div className="break-words text-sm w-full max-w-[740px]">
              <SkeletonLoader width="100%" height="100px" />
            </div>
            <div className="flex w-full flex-col justify-start items-start gap-3 bg-light_grey text-sm p-4 rounded-md max-w-[740px]">
              <SkeletonLoader width="150px" height="24px" />
              <div className="w-full flex flex-col gap-2 py-2 border-b border-dark_grey md:flex-row md:gap-0 md:justify-between">
                <SkeletonLoader width="55px" height="20px" />
                <SkeletonLoader width="300px" height="20px" />
              </div>
              <div className="w-full flex flex-col gap-2 py-2 border-b border-dark_grey md:flex-row md:gap-0 md:justify-between">
                <SkeletonLoader width="50px" height="20px" />
                <SkeletonLoader width="66px" height="20px" />
              </div>
              <div className="w-full flex flex-col gap-2 py-2 border-b border-dark_grey md:flex-row md:gap-0 md:justify-between">
                <SkeletonLoader width="100px" height="20px" />
                <SkeletonLoader width="150px" height="20px" />
              </div>
              <div className="w-full flex flex-col gap-2 py-2 border-b border-dark_grey md:flex-row md:gap-0 md:justify-between">
                <SkeletonLoader width="55px" height="20px" />
                <SkeletonLoader width="250px" height="20px" />
              </div>
              <div className="w-full flex flex-col gap-2 py-2 border-b border-dark_grey md:flex-row md:gap-0 md:justify-between">
                <SkeletonLoader width="50px" height="20px" />
                <SkeletonLoader width="50px" height="20px" />
              </div>
            </div>
          </article>
          <article className="hidden w-full max-w-[224px] h-full flex-col justify-evenly items-center gap-5 top-[90px] sticky  ml-12 text-sm md:flex">
            <SkeletonLoader width="225px" height="120px" />
            <div className="flex w-full flex-row justify-between py-2 border-b border-white/10">
              <SkeletonLoader width="100px" height="20px" />
              <SkeletonLoader width="100px" height="20px" />
            </div>
            <div className="flex w-full flex-row justify-between py-2 border-b border-white/10">
              <SkeletonLoader width="100px" height="20px" />
              <SkeletonLoader width="100px" height="20px" />
            </div>
            <div className="flex w-full flex-row justify-between py-2 border-b border-white/10">
              <SkeletonLoader width="100px" height="20px" />
              <SkeletonLoader width="100px" height="20px" />
            </div>
            <div className="flex w-full flex-row justify-between py-2 border-b border-white/10">
              <SkeletonLoader width="100px" height="20px" />
              <SkeletonLoader width="100px" height="20px" />
            </div>
            <div className="rounded-md w-full h-full bg-blue px-2 py-2 flex justify-center">
              <SkeletonLoader width="150px" height="20px" />
            </div>
          </article>
        </div>
      )}
    </section>
  );
};

export default GamePage;
