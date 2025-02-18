"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import SearchBooks from "./SearchBooks";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import { database, ref, set } from "@/firebase/Firebase";

const HomeBooks = () => {
  const { data: session } = useSession(); // Ambil status session
  const [books, setBooks] = useState([]);
  const [readmore, setReadmore] = useState({});
  const [bookShelves, setBookShelves] = useState({});
  const API_KEY = "AIzaSyD0e40Wme2jC6_NYxbe8K8r_gOvOXAnEno";

  // Fungsi untuk mencari buku berdasarkan input user
  const SearchBook = async (query) => {
    if (!query) return;

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
    );
    const data = await response.json();
    setBooks(data.items || []);

    // Simpan hasil pencarian ke localStorage
    localStorage.setItem("books", JSON.stringify(data.items))
  };

  // Fungsi untuk mengambil buku secara random
  const fetchBooks = async () => {
    try {
      const randomChar = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      );

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Jeda 1 detik untuk menghindari rate-limit

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${randomChar}&maxResults=40&key=${API_KEY}`
      );
      const data = await response.json();

      console.log("Data buku", data);
      setBooks(data.items || []);

      // Simpan ke localStorage agar tidak request berulang
      localStorage.setItem("books", JSON.stringify(data.items));
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  const addToShelf = (book, shelfName) => {
    if (!shelfName) return;

    // Cek apakah pengguna sudah login
    if (!session) {
      Swal.fire({
        title: "Login Required",
        text: "Anda harus login terlebih dahulu untuk menambahkan buku ke rak.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect ke halaman login
          window.location.href = "/auth";
        }
      });
      return; // Hentikan proses jika belum login
    }

    // Lanjutkan proses jika sudah login
    setBookShelves((prevShelves) => {
      const updatedShelves = { ...prevShelves };

      // Jika rak belum ada, buat array kosong
      if (!updatedShelves[shelfName]) {
        updatedShelves[shelfName] = [];
      }

      // Cek apakah buku sudah ada di rak agar tidak duplikat
      if (!updatedShelves[shelfName].some((b) => b.id === book.id)) {
        updatedShelves[shelfName] = [...updatedShelves[shelfName], book]; // Tambahkan buku ke rak
      }

      // Simpan ke localStorage tanpa menimpa rak lainnya
      localStorage.setItem("bookShelves", JSON.stringify(updatedShelves));
      return updatedShelves;
    });

    Swal.fire({
      title: "Berhasil",
      icon: "success",
      text: `Buku "${book.volumeInfo.title}" ditambahkan ke rak "${shelfName}"!`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const toggleReadMore = (bookId) => {
    setReadmore((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  useEffect(() => {
    const cachedBooks = localStorage.getItem("books");
    const cachedShelves = localStorage.getItem("bookShelves");

    if (cachedBooks) {
      setBooks(JSON.parse(cachedBooks)); // Ambil daftar buku dari cache
    } else {
      fetchBooks(); // Jika tidak ada cache, ambil dari API
    }

    if (cachedShelves) {
      setBookShelves(JSON.parse(cachedShelves)); // Ambil rak buku dari cache
    }
  }, []);

  const countBookShelf = () => {
    const cachedShelves = localStorage.getItem("bookShelves");
    if (cachedShelves) {
      const shelves = JSON.parse(cachedShelves);
      return Object.keys(shelves).reduce(
        (total, shelf) => total + shelves[shelf].length,
        0
      );
    } else {
      return 0;
    }
  };

  return (
    <div className="homebooks mt-[7rem]">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className=" bg-blue-500 w-[6rem] mb-[2rem] p-2 rounded-md text-center relative">
            <Link className=" text-white no-underline " href="/rakbuku">
              Rak Buku
              <span className="absolute top-0 right-auto bg-red-500 text-white rounded-full px-2 py-1 text-xs ">
                {countBookShelf()}
              </span>
            </Link>
          </div>
          <SearchBooks onSearch={SearchBook} />
        </div>
        <div className="row">
          {/* Menampilkan daftar buku */}
          {books.length > 0 ? (
            books.map((book) => (
              <div className="col-md-6 mb-4" key={book.id}>
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
                            : book.volumeInfo.description?.substring(0, 100) +
                              "..."}

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
                    <div className="mt-3">
                      <label className="mr-2">Tambahkan ke Rak:</label>
                      <select
                        onChange={(e) => addToShelf(book, e.target.value, e)}
                        className="border p-2 rounded-md"
                      >
                        <option value="">Pilih Rak</option>
                        <option value="Favorit">Favorit</option>
                        <option value="Untuk Dibaca">Untuk Dibaca</option>
                        <option value="Sedang Dibaca">Sedang Dibaca</option>
                        <option value="Pernah Dibaca">Pernah Dibaca</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-3">
              Masukkan kata kunci untuk mencari buku.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBooks;
