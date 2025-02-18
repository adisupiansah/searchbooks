import React from "react";

const InformasiBuku = ({ book }) => {
  return (
    <div className="informasibuku">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h3 className="text-[20px]">Tentang Edisi Buku</h3>
            <div className="card">
              <div className="card-body border-b-gray-600 border-1">
                <p className="card-text flex justify-between items-center">
                  <span>
                    ISBN:{" "}
                    {book.volumeInfo?.industryIdentifiers
                      ?.map((isbn) => isbn.identifier)
                      .join(", ") || "-"}
                  </span>

                  <span>Jumlah Halaman: {book.volumeInfo.pageCount}</span>
                </p>
                <p className="card-text flex justify-between items-center">
                  <span>
                    Tanggal Publikasi: {book.volumeInfo.publishedDate}
                  </span>
                  <span>Format: {book.volumeInfo.printType}</span>
                </p>
                <p>
                  Penerbit:{" "}
                  <span className="text-blue-500">
                    {book.volumeInfo.publisher}
                  </span>
                </p>
                <p>Bahasa: {book.volumeInfo.language}</p>
                <p>Pengarang: {book.volumeInfo.authors}</p>
              </div>
              <div className="card-body">
                <span
                  className="card-text text-justify"
                  dangerouslySetInnerHTML={{
                    __html:
                      book.volumeInfo.description || "Tidak ada deskripsi",
                  }}
                ></span>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="row">
              <div className="col">
                <h3 className="text-[20px]">Tentang Karya ini: </h3>
                <div className="card">
                  <div className="card-body">
                    <span>
                      Terbitan pertama:{" "}
                      <span>{book.volumeInfo.publishedDate}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <h3 className="text-[20px]">Pengarang: </h3>
                <div className="card">
                  <div className="card-body">
                    <span>{book.volumeInfo.authors}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col">
                <h3 className="text-[20px]">Penerbit: </h3>
                <div className="card">
                  <div className="card-body">
                    <span>{book.volumeInfo.publisher}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformasiBuku;
