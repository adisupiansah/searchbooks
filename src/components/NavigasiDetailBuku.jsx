'use client'
import React from 'react'

const NavigasiDetailBuku = ({ active, setActive }) => {
    
  return (
    <div className='navigasi-detailbuku'>
        <div className="container">
        <div className="row mt-5">
          <div className="col border-b border-gray-400">
            <div className="col-md-6">
              <div className="navigasi flex justify-between items-center">
                <button
                  className={`${
                    active === "informasi" ? "active-navigasidetail" : ""
                  }`}
                  onClick={() => setActive("informasi")}
                >
                  Informasi Buku
                </button>

                <button
                  className={`${
                    active === "dapatkan" ? "active-navigasidetail" : ""
                  }`}
                  onClick={() => setActive("dapatkan")}
                >
                  Dapatkan Buku
                </button>

                <button
                  className={`${
                    active === "serupa" ? "active-navigasidetail" : ""
                  }`}
                  onClick={() => setActive("serupa")}
                >
                  Buku Serupa
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default NavigasiDetailBuku
