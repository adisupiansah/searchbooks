"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBooks = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search);
    }
  };

  return (
    <div className="form-search mb-[2rem]">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 justify-center items-center"
      >
        <div className="form-input md:col-md-4 w-[20rem]">
          <input
            type="text"
            className="p-2 rounded-full col-md-12 border-gray-600 border-1 focus:border-blue-600"
            placeholder="Cari buku..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="trigger">
          <button type="submit" className=" bg-blue-600 p-2 rounded-full">
            <IoSearch className="text-[24px] text-white font-bold"/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBooks;
