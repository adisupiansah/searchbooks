"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Books = () => {
  const [booksByCategory, setBooksByCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [readmore, setReadmore] = useState({});

  const API_KEY = "AIzaSyD0e40Wme2jC6_NYxbe8K8r_gOvOXAnEno";

  // Daftar kategori yang akan dicari
  const categories = [
    "Programming",
    "Economics",
    "Mathematics",
    "History",
    "Science",
    "Psychology",
    "Business",
    "Listrik",
    "Fisika",
    "Kimia",
    "Biologi",
    "Sejarah",
    "Money",
    "Bahasa Indonesia",
    "Seni Budaya",
    "Pendidikan",
    "Sosiologi",
    "Kesehatan", 
    "Bulu Tangkis",
    "Sepak Bola",
  ];

  // Fungsi untuk mengambil buku berdasarkan kategori
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const requests = categories.map((category) =>
        fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=40&key=${API_KEY}`
        ).then((res) => res.json())
      );

      const results = await Promise.all(requests);

      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Memformat data agar sesuai dengan kategori
      const booksData = {};
      results.forEach((result, index) => {
        booksData[categories[index]] = result.items || [];
      });

      setBooksByCategory(booksData);
      localStorage.setItem("booksData", JSON.stringify(booksData))
    } catch (error) {
      console.error("Error fetching books:", error);
    }

    setLoading(false);
  };

  const handleReadMore = (bookId) => {
    setReadmore((prev) => ({
      ...prev,
      [bookId]: !prev[bookId],
    }));
  };

  useEffect(() => {
    const chacedBooks = localStorage.getItem("booksData");

    if (chacedBooks) {
      setBooksByCategory(JSON.parse(chacedBooks));
    } else {
      fetchBooks();
    }
  }, []);

  return (
    <div className="books mt-[7rem]">
      <div className="container">
        <h2 className="text-center mb-4">Daftar Buku</h2>
       
        {loading ? (
          <div className="flex justify-center items-center mt-[200px]">
            <div className="loader"></div>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category} className="mb-5">
              <h3 className="mb-3">{category}</h3>
              <div className="row">
                {booksByCategory[category]?.length > 0 ? (
                  booksByCategory[category].map((book) => (
                    <div className="col-md-6 mb-4" key={book.id}>
                      <div className="books flex">
                        <div className="col-md-4">
                          <Image
                            src={
                              book.volumeInfo.imageLinks?.thumbnail ||
                              "https://via.placeholder.com/150"
                            }
                            width={200}
                            height={200}
                            alt={book.volumeInfo.title}
                          />
                        </div>
                        <div className="deskrpisi-book mx-2">
                          <h2 className="text-blue-600 text-[20px]">
                            <Link href={`/detailbooks/${book.id}`} className="no-underline hover:underline">
                              {book.volumeInfo.title}
                            </Link>
                          </h2>
                          <p className="text-gray-600 font-italic text-[14px]">
                            {book.volumeInfo.authors
                              ? book.volumeInfo.authors.join(", ")
                              : "Unknown Author"}
                          </p>

                          <div className="card">
                            <div className="card-body">
                              <p className="card-text">
                                {readmore[book.id]
                                  ? book.volumeInfo.description
                                  : book.volumeInfo.description?.slice(0, 100) +
                                    "..."}

                                <span
                                  onClick={() => handleReadMore(book.id)}
                                  className="cursor-pointer text-blue-600"
                                >
                                  {readmore[book.id] ? "show les" : "read more"}
                                </span>
                              </p>
                            </div>
                          </div>
                          <Link href="#">Pratinjau</Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Tidak ada buku untuk kategori ini.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Books;
