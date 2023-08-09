import { useRouter } from "next/router";
import React, { useState } from "react";

import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    router.push(`/search?q=${searchTerm}`); //q= value  q is sent along as query value in router to that search page
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-[6px] text-gray-400 focus-within:text-gray-600 flex flex-1 items-center border border-gray-500 rounded-3xl"
    >
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row justify-start flex-1 items-center px-1">
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white"
          placeholder="Search"
          type="search"
          value={searchTerm}
          required
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch aria-hidden="true"
        onClick={handleSubmit} className="w-5 h-5 cursor-pointer" />
      </div>
    </form>
  );
};

export default Searchbar;
