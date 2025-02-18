"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Bookshelf = () => {
  const [bookShelves, setBookShelves] = useState({});
  const [selectedShelf, setSelectedShelf] = useState("Favorit");
  const [readmore, setReadmore] = useState({}); // ✅ State readmore harus dideklarasikan di sini

  const SHELVES = ["Favorit", "Untuk Dibaca", "Sedang Dibaca", "Pernah Dibaca"];

  const toggleReadMore = (bookId) => {
    setReadmore((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  useEffect(() => {
    const storedShelves = localStorage.getItem("bookShelves");
    if (storedShelves) {
      setBookShelves(JSON.parse(storedShelves));
    }
  }, []);

  // 📌 Ambil daftar buku yang sesuai dengan rak yang dipilih
  const displayedBooks =
    selectedShelf === "all"
      ? Object.values(bookShelves).flat() // Menggabungkan semua rak jadi satu array
      : bookShelves[selectedShelf] || [];

  return (
    <div className="container mt-[7rem]">
      <h2 className="text-2xl font-semibold mb-4">Rak Buku Saya</h2>

      {/* Pilihan Rak */}
      <label className="mr-2">Pilih Rak:</label>
      <select
        value={selectedShelf}
        onChange={(e) => setSelectedShelf(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="all">Semua Rak</option>
        {SHELVES.map((shelf) => (
          <option key={shelf} value={shelf}>
            {shelf}
          </option>
        ))}
      </select>

      {/* Menampilkan buku dari rak */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedBooks.length > 0 ? (
          displayedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              readmore={readmore} // ✅ Kirim state readmore sebagai prop
              toggleReadMore={toggleReadMore} // ✅ Kirim function toggleReadMore sebagai prop
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Tidak ada buku di rak ini.
          </p>
        )}
      </div>
    </div>
  );
};

const BookCard = ({ book, readmore, toggleReadMore }) => (
  <div className="row">
    <div className="mb-4" key={book.id}>
     
      <div className="books flex">
        <div className="col-md-4">
          <Image
            src={
              book.volumeInfo.imageLinks?.thumbnail ||
              "https://via.placeholder.com/150"
            }
            alt={book.volumeInfo.title}
            width={500}
            height={500}
          />
        </div>
        <div className="deskripsi-book mx-2">
          <h2 className="text-blue-600 text-[20px]">
            <Link
              href={`/detailbooks/${book.id}`}
              className="no-underline hover:underline transition-all text-blue-600"
            >
              {book.volumeInfo.title}
            </Link>
          </h2>
          <p className="text-gray-600 font-italic text-[14px]">
            {book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "Unknown"}
          </p>
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                {readmore[book.id]
                  ? book.volumeInfo.description
                  : book.volumeInfo.description?.substring(0, 100) + "..."}

                {/* toggle readmore */}
                {book.volumeInfo.description?.length > 100 && (
                  <span
                    onClick={() => toggleReadMore(book.id)}
                    className="cursor-pointer text-blue-600"
                  >
                    {readmore[book.id] ? "show less" : "read more"}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Bookshelf;