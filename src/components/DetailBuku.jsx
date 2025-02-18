"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaRegBookmark } from "react-icons/fa";
import { VscOpenPreview } from "react-icons/vsc";
import Image from "next/image";
import Link from "next/link";
import DapatkanBuku from "./DapatkanBuku";
import InformasiBuku from "./InformasiBuku";
import NavigasiDetailBuku from "./NavigasiDetailBuku";
import BukuSerupa from "./BukuSerupa";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const DetailBuku = () => {
  const {data: session} = useSession()
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [bookShelves, setBookShelves] = useState({});
  const [active, setActive] = useState("informasi");
  const API_KEY = "AIzaSyD0e40Wme2jC6_NYxbe8K8r_gOvOXAnEno";

  const fetchSimilarBooks = async () => {
    if (!book) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${book.volumeInfo.categories?.[0]}&maxResults=5&key=${API_KEY}`
      );
      const data = await response.json();
      setSimilarBooks(data.items || []);
    } catch (error) {
      console.error("Error fetching similar books:", error);
    }
  };
  const fetchBookDetail = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`
      );
      const data = await response.json();
      setBook(data);

      // simpan ke localstorage agar tidak request berulang
      localStorage.setItem(`book_${id}`, JSON.stringify(data));
    } catch (error) {
      console.error("fetch detail buku:", error);
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
  
    // Ambil data rak dari localStorage
    const storedShelves = JSON.parse(localStorage.getItem("bookShelves")) || {};
  
    // Jika rak belum ada, buat array kosong
    if (!storedShelves[shelfName]) {
      storedShelves[shelfName] = [];
    }
  
    // Cek apakah buku sudah ada di rak agar tidak duplikat
    if (!storedShelves[shelfName].some((b) => b.id === book.id)) {
      storedShelves[shelfName] = [...storedShelves[shelfName], book]; // Tambahkan buku ke rak
    }
  
    // Simpan ke localStorage
    localStorage.setItem("bookShelves", JSON.stringify(storedShelves));
  
    // Update state
    setBookShelves(storedShelves);
  
    Swal.fire({
      title: "Berhasil",
      icon: "success",
      text: `Buku "${book.volumeInfo.title}" ditambahkan ke rak "${shelfName}"!`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  useEffect(() => {
    const cachedBook = localStorage.getItem(`book_${id}`);
    const chacedShelves = localStorage.getItem("bookShelves");
    if (!id) return;

    if (cachedBook) {
      setBook(JSON.parse(cachedBook));
    } else {
      fetchBookDetail();
    }

    if (chacedShelves) {
      setBookShelves(JSON.parse(chacedShelves));
    } 
  }, [id]);

  useEffect(() => {
    if (book) {
      fetchSimilarBooks();
    }
  }, [book]);

  if (!book) {
    return (
      <div className="mt-[200px] text-center">
        <h3 className="text-blue-500 text-[23px]">
          TIDAK ADA BUKU YANG DI PILIH
        </h3>
      </div>
    );
  }

  return (
    <div className="test mt-[7rem]">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="text-[29px]">{book.volumeInfo.title}</h2>
            <p>
              Oleh{" "}
              <span className="text-blue-500">{book.volumeInfo.authors}</span> -{" "}
              {book.volumeInfo.publishedDate}
            </p>
            <div className="trigger col-md-8">
              <div className="row gap-3">
                <div className="pratinjau p-1 bg-blue-500 rounded-full flex justify-center items-center col-md-4">
                  <Link
                    href={`https://books.google.co.id/books?id=${book.id}?hl=id&gbpv=1`}
                    target="_blank"
                    className="no-underline text-white flex justify-center items-center gap-3"
                  >
                    <VscOpenPreview className="text-[18px]" /> 
                    <span>Pratinjau</span>
                  </Link>
                </div>
                <div className="pratinjau p-1 bg-white border-blue-500 border-1 rounded-full flex justify-center items-center col-md-6">
                  <button className=" text-black flex justify-center items-center gap-3">
                    <FaRegBookmark />
                    <select onChange={(e) => addToShelf(book, e.target.value, e)}>
                      <option value="">Pilih Rak</option>
                      <option value="Favorit">Favorit</option>
                      <option value="Untuk Dibaca">Untuk Dibaca</option>
                      <option value="Sedang Dibaca">Sedang Dibaca</option>
                      <option value="Pernah Dibaca">Pernah Dibaca</option>
                    </select>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="image">
              <Image
                src={book.volumeInfo.imageLinks?.thumbnail}
                width={120}
                height={120}
                alt={book.volumeInfo.title}
              />
            </div>
          </div>
        </div>

        {/* Navigasi */}
        <NavigasiDetailBuku active={active} setActive={setActive} />

        {/* kontent */}
        <div className="col">
          <div className="content mt-[2rem] mb-[4rem]">
            {active === "informasi" && <InformasiBuku book={book} />}
            {active === "dapatkan" && <DapatkanBuku book={book} />}
            {active === "serupa" && <BukuSerupa similarBooks={similarBooks} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBuku;
