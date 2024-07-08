"use client";
import Image from "next/image";
import React from "react";
import Search from "./Search";
import Link from "next/link";
import FlyoutMenu from "./FlyoutMenu";
import { useParams, useRouter } from "next/navigation";
import { useGames } from "@/contexts/games";

const Nav = () => {
  const router = useRouter();
  const { filteredGamesByPlatform, setFilteredGamesByPlatform } = useGames();
  const { id } = useParams();
  const handleClick = (search: string) => {
    router.push(`/search/${search}`);
  };

  return (
    <>
      <header className="w-full h-full flex flex-col">
        <nav className="w-full h-20 flex justify-center items-center px-8 py-4  sm:px-12 lg:px-16 xl:px-24 bg-dark_grey border-[1px] border-light_grey">
          <Link href="/">
            <div className="w-[150px] h-full flex items-center justify-left gap-3">
              <Image
                src="/images/logo.webp"
                width="30"
                height="30"
                alt="Logo"
              />
              <div className="w-[1px] h-[35px] bg-light_grey"></div>
              <h3>Free Games</h3>
            </div>
          </Link>
        </nav>
      </header>
      <nav
        className={`w-full h-full flex flex-col ${
          id ? "items-start" : "items-center"
        } justify-between gap-4 sm:flex-row sm:gap-0 py-4 px-8 sm:px-12 lg:px-16 xl:px-24 bg-light_grey sticky top-[0px] z-10 md:flex`}
      >
        <Search search={handleClick} />
        <div className="flex items-center gap-5 justify-right">
          <div
            className={`flex justify-center items-center gap-2 mr-3 ${
              id && "hidden"
            }`}
          >
            <svg
              onClick={() => setFilteredGamesByPlatform("windows")}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className={`w-5 h-5 fill-current ${
                filteredGamesByPlatform === "windows"
                  ? "text-blue"
                  : "text-white"
              } hover:text-blue cursor-pointer duration-500`}
            >
              <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
            </svg>
            <p>|</p>
            <svg
              onClick={() => setFilteredGamesByPlatform("browser")}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
              className={`w-5 h-5 fill-current ${
                filteredGamesByPlatform === "browser"
                  ? "text-blue"
                  : "text-white"
              } hover:text-blue cursor-pointer duration-500`}
            >
              <path d="M64 0C28.7 0 0 28.7 0 64V352c0 35.3 28.7 64 64 64H240l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H346.7L336 416H512c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zM512 64V288H64V64H512z" />
            </svg>
            <div
              onClick={() => setFilteredGamesByPlatform(null)}
              className="rounded-md w-[50px] h-full bg-blue px-2 py-[2px]"
            >
              <p className="text-xs cursor-pointer">Reset</p>
            </div>
          </div>
          <FlyoutMenu />
        </div>
      </nav>
    </>
  );
};

export default Nav;
