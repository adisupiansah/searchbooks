import React from "react";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";

const DapatkanBuku = ({ book }) => {
  return (
    <div className="dapatkanbuku">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body border-b border-gray-400">
                <h5 className="card-title">Dapatkan Buku ini:</h5>
                <div className="flex justify-between items-center">
                  <span>Gramedia</span>
                  <div className="py-1 px-3 border-1 border-blue-500 rounded-full flex justify-center items-center">
                    <IoIosSearch className="text-blue-500 text-[19px] font-semibold" />
                    <Link
                      href={`https://www.gramediaonline.com/book/detail/${
                        book.volumeInfo?.industryIdentifiers?.[0]?.identifier || "#"}`}
                      className="no-underline text-black hover:underline hover:decoration-blue-500"
                    >
                      Telusuri
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <span>Shop Link</span>
                  <div className="py-1 px-3 border-1 border-blue-500 rounded-full flex justify-center items-center">
                    <IoIosSearch className="text-blue-500 text-[19px] font-semibold" />
                    <Link
                      href={book.saleInfo?.buyLink || "#"}
                      target="_blank"
                      className="no-underline text-black hover:underline hover:decoration-blue-500"
                    >
                      Telusuri
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <span>
                    Harga: {book.saleInfo.listPrice?.amount || "Rp 0"}
                  </span>
                  <span>
                    Mata uang: {book.saleInfo.listPrice?.currencyCode || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DapatkanBuku;
