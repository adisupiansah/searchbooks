import React from "react";
import Image from "next/image";
import Link from "next/link";

const BukuSerupa = ({ similarBooks }) => {
  return (
    <div className="bukuserupa">
      <div className="container">
        <div className="row">
          {similarBooks.length > 0 ? (
            similarBooks.map((similarBook) => (
              <div key={similarBook.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="flex">
                      <Image
                        src={
                          similarBook.volumeInfo.imageLinks?.thumbnail ||
                          "/default.jpg"
                        }
                        width={100}
                        height={150}
                        alt={similarBook.volumeInfo.title}
                      />
                      <div className="mx-3">
                        <Link
                          href={`/detailbooks/${similarBook.id}`}
                          className="no-underline text-[18px] hover:underline"
                        >
                          {similarBook.volumeInfo.title}
                        </Link>
                        <p className="text-gray-500 text-[14px]">
                          Oleh {similarBook.volumeInfo.authors?.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Tidak ada buku serupa ditemukan.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BukuSerupa;
