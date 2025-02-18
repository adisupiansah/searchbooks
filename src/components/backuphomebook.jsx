"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import SearchBooks from "./SearchBooks";
import Link from "next/link";

const HomeBooks = () => {
  const [books, setBooks] = useState([]);
  const [readmore, setReadmore] = useState({});
  const [shelf, setShelf] = useState("all"); // State untuk filter rak buku
  const [bookShelves, setBookShelves] = useState({}); // Menyimpan daftar buku per rak
  const API_KEY = "AIzaSyD0e40Wme2jC6_NYxbe8K8r_gOvOXAnEno";

  const SHELVES = [
    "Favorit",
    "Untuk Dibaca",
    "Sedang Dibaca",
    "Pernah Dibaca",
    "Ditinjau",
    "Baru Dilihat",
    "eBook Saya",
    "Buku Untuk Anda",
  ];

  useEffect(() => {
    const cachedBooks = localStorage.getItem("books");
    const storedShelves = localStorage.getItem("bookShelves");

    if (cachedBooks) setBooks(JSON.parse(cachedBooks));
    if (storedShelves) setBookShelves(JSON.parse(storedShelves));
    else setBookShelves({});
  }, []);

  const SearchBook = async (query) => {
    if (!query) return;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
    );
    const data = await response.json();
    setBooks(data.items || []);
    localStorage.setItem("books", JSON.stringify(data.items));
  };

  const addToShelf = (book, shelfName) => {
    setBookShelves((prevShelves) => {
      const updatedShelves = { ...prevShelves };
      if (!updatedShelves[shelfName]) updatedShelves[shelfName] = [];
      
      // Cek apakah buku sudah ada di rak
      if (!updatedShelves[shelfName].some((b) => b.id === book.id)) {
        updatedShelves[shelfName].push(book);
      }
      
      localStorage.setItem("bookShelves", JSON.stringify(updatedShelves));
      return updatedShelves;
    });
  };

  const toggleReadMore = (bookId) => {
    setReadmore((prev) => ({ ...prev, [bookId]: !prev[bookId] }));
  };

  return (
    <div className="homebooks mt-[7rem]">
      <div className="container">
        <SearchBooks onSearch={SearchBook} />

        <div className="my-4">
          <label className="mr-2">Filter Rak Buku:</label>
          <select onChange={(e) => setShelf(e.target.value)}>
            <option value="all">Semua Buku</option>
            {SHELVES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="row">
          {shelf === "all"
            ? books.map((book) => (
                <BookCard key={book.id} book={book} addToShelf={addToShelf} shelves={SHELVES} toggleReadMore={toggleReadMore} readmore={readmore} />
              ))
            : (bookShelves[shelf] || []).map((book) => (
                <BookCard key={book.id} book={book} addToShelf={addToShelf} shelves={SHELVES} toggleReadMore={toggleReadMore} readmore={readmore} />
              ))}
        </div>
      </div>
    </div>
  );
};

const BookCard = ({ book, addToShelf, shelves, toggleReadMore, readmore }) => (
  <div className="col-md-6 mb-4">
    <div className="books flex">
      <div className="col-md-4">
        <Image
          src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
          alt={book.volumeInfo.title}
          width={500}
          height={500}
        />
      </div>
      <div className="deskripsi-book mx-2">
        <h2 className="text-blue-600 text-[20px]">
          <Link href={`/detailbooks/${book.id}`} className="no-underline hover:underline transition-all text-blue-600">
            {book.volumeInfo.title}
          </Link>
        </h2>
        <p className="text-gray-600 font-italic text-[14px]">
          {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown"}
        </p>
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              {readmore[book.id] ? book.volumeInfo.description : book.volumeInfo.description?.substring(0, 100) + "..."}
              {book.volumeInfo.description?.length > 100 && (
                <span onClick={() => toggleReadMore(book.id)} className="cursor-pointer text-blue-600">
                  {readmore[book.id] ? "show less" : "read more"}
                </span>
              )}
            </p>
          </div>
        </div>
        <div>
          <label>Tambahkan ke Rak:</label>
          <select onChange={(e) => addToShelf(book, e.target.value)}>
            <option value="">Pilih Rak</option>
            {shelves.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <button className='bg-blue-600 py-1 px-3 rounded-md text-white hover:text-blue-700'>delete</button>
        </div>
      </div>
    </div>
  </div>
);

export default HomeBooks;
