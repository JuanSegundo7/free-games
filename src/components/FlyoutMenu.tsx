"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Categories } from "@/utils/categories";

const FlyoutMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (category: string) => {
    router.push(`/games/category/${category}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-white"
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <span>Categories</span>
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`absolute left-0 z-10 mt-5 flex w-[350px] md:w-screen max-w-max -translate-x-[200px]  md:-translate-x-[350px] px-4 transition ${
          isOpen
            ? "ease-out duration-200 opacity-100 translate-y-0 flex"
            : "ease-in duration-150 opacity-0 translate-y-1 hidden"
        }`}
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            {Categories &&
              Categories.map((category) => (
                <div
                  onClick={() => handleClick(category.link.toLowerCase())}
                  key={category.id}
                  className="group relative flex gap-x-2 rounded-lg p-2 md:p-3 hover:bg-gray-50"
                >
                  <div className="mt-1 flex h-4 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <Image
                      src={`/svgs/${category.image}.svg`}
                      width="20"
                      height="20"
                      alt="logo"
                      className="invert hover:fill-blue "
                    />
                  </div>
                  <div>
                    <a
                      href="#"
                      className="font-semibold text-dark_grey hover:text-blue"
                    >
                      {category.name}
                      <span className="absolute inset-0"></span>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyoutMenu;
