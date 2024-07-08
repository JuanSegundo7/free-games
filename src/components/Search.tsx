"use client";
import Image from "next/image";
import React, { useState } from "react";

const Search = ({ search }: { search: (value: string) => void }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    search(inputValue);
  };

  return (
    <form
      className={`w-full max-w-[262px] h-[40px] ${
        isFocused ? "bg-focus_grey" : "bg-dark_grey"
      } flex justify-center items-center p-4 rounded-xl gap-3 transition-colors`}
      onSubmit={handleSubmit}
    >
      <Image src="/svgs/glass.svg" width="15" height="15" alt="Search Icon" />
      <input
        placeholder="Buscar"
        className="text-xs bg-transparent w-full focus:outline-none placeholder-white"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
};

export default Search;
