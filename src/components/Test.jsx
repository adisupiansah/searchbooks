'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { FaRegBookmark } from "react-icons/fa";
import { VscOpenPreview } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import Image from 'next/image';
import gambar from '/public/img/content.png'

const Test = () => {

    const [active, setActive] = useState('informasi')

  return (
    <div className='test mt-[7rem]'>
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h2 className='text-[29px]'>Analisis Statistik Ekonomi dan Bisnis Dengan SPSS</h2>
                    <p>Oleh <span className='text-blue-500'>Rochmat Aldy Purnomo, S.E., M.Si.</span> - 2016</p>
                        <div className="trigger col-md-8">
                            <div className="row gap-3">
                                <div className="pratinjau p-1 bg-blue-500 rounded-full flex justify-center items-center col-md-4">
                                    <Link href='#' className='no-underline text-white flex justify-center items-center gap-3'>
                                        <VscOpenPreview className='text-[18px]'/>
                                        <span>Pratinjau</span>
                                    </Link>
                                </div>
                                <div className="pratinjau p-1 bg-white border-blue-500 border-1 rounded-full flex justify-center items-center col-md-4">
                                    <button className=' text-black flex justify-center items-center gap-3'>
                                        <FaRegBookmark/>
                                        <span>Simpan</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="col-md-6">
                    <div className="image">
                        <Image src={gambar} width={120} height={120} alt=''/>
                    </div>
                </div>
            </div>

            {/* Navigasi */}
            <div className="row mt-5">
                <div className="col border-b border-gray-400">
                    <div className="col-md-6">
                        <div className="navigasi flex justify-between items-center">
                            <button className={`${active === "informasi" ? "active-navigasidetail" : ""}`} onClick={() => setActive("informasi")}>Informasi Buku</button>

                            <button className={`${active === "dapatkan" ? "active-navigasidetail" : ""}`} onClick={() => setActive("dapatkan")}>Dapatkan Buku</button>

                            <button className={`${active === "serupa" ? "active-navigasidetail" : ""}`} onClick={() => setActive("serupa")}>Buku Serupa</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* kontent */}
            <div className="col">
                    <div className="content mt-[2rem] mb-[4rem]">
                        {active === "informasi" && (
                            <div className="row">
                                <div className="col-md-8">
                                    <h3 className='text-[20px]'>Tentang Edisi Buku</h3>
                                        <div className="card">
                                            <div className="card-body border-b-gray-600 border-1">
                                                <p className='card-text flex justify-between items-center'>
                                                    <span>ISBN: 9786026802408, 6026802401</span>
                                                    <span>Jumlah Halaman: 232</span>
                                                </p>
                                                <p className='card-text flex justify-between items-center'>
                                                    <span>Tanggal Publikasi: 3 September 2016</span>
                                                    <span>Format: Sampul kertas</span>
                                                </p>
                                                <p>Penerbit: <span className='text-blue-500'>CV. WADE GROUP bekerjasama dengan UNMUH Ponorogo Press</span></p>
                                                <p>Bahasa: indonesia</p>
                                                <p>Pengarang: Rochmat Aldy Purnomo, S.E., M.Si</p>
                                                <p>Editor: Puput Cahya Ambarwati S.Si.</p>
                                            </div>
                                            <div className="card-body">
                                                <p className='card-text text-justify'>
                                                    Buku ini dibuat untuk membantu para mahasiswa untuk bisa mandiri dalam mengerjakan olah data skripsi dan tesis dengan program SPSS. Isi materi pada buku ini mengarah kepada analisis dan pengujian yang sering digunakan dalam penelitian dan juga tercantum langkah-langkah yang disusun dengan teratur dan mudah dipahami, berbasis aplikasi SPSS.

                                                    Selain itu, dosen dan praktisi juga dapat memanfaatkan buku ini dalam materi bahan ajar maupun untuk praktik dalam olah data penelitian internal, hibah ataupun bentuk lainnya. Dalam pembahasan, penulis menggunakan SPSS versi 20 karena versi ini adalah versi standar, masih banyak digunakan dalam penelitian dan fiturnya tidak jauh berbeda dengan versi terbaru. Bagi pembaca yang memiliki program SPSS versi terbaru , tidak akan mengalami kesulitan karena tidak banyak perbedaan untuk analisis yang dibahas. 
                                                </p>
                                            </div>
                                        </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="row">
                                        <div className="col">
                                            <h3 className='text-[20px]'>Tentang Karya ini: </h3>
                                            <div className="card">
                                                <div className="card-body">
                                                    <span>Terbitan pertama: <span>3 September 2016</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <h3 className='text-[20px]'>Pengarang: </h3>
                                            <div className="card">
                                                <div className="card-body">
                                                    <span>Rochmat Aldy Purnomo, S.E., M.Si.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col">
                                            <h3 className='text-[20px]'>Penerbit: </h3>
                                            <div className="card">
                                                <div className="card-body">
                                                    <span>CV. WADE GROUP bekerjasama dengan UNMUH Ponorogo Press</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {active === "dapatkan" && (
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-body border-b border-gray-400">
                                            <h5 className='card-title'>Dapatkan Buku ini:</h5>
                                            <div className="flex justify-between items-center">
                                                <span>Gramedia</span>
                                                <div className='py-1 px-3 border-1 border-blue-500 rounded-full flex justify-center items-center'>
                                                    <IoIosSearch className='text-blue-500 text-[19px] font-semibold'/>
                                                    <Link href="#" className='no-underline text-black hover:underline hover:decoration-blue-500'>Telusuri</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="flex justify-between items-center">
                                                <span>Gramedia</span>
                                                <div className='py-1 px-3 border-1 border-blue-500 rounded-full flex justify-center items-center'>
                                                    <IoIosSearch className='text-blue-500 text-[19px] font-semibold'/>
                                                    <Link href="#" className='no-underline text-black hover:underline hover:decoration-blue-500'>Telusuri</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {active === "serupa" && (
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                       <div className="card-body">
                                        <div className="flex justify-center">
                                            <div className='mx-2'>
                                                <Link href="#" className='card-title no-underline text-[20px] hover:underline'>METODE PENELITIAN BISNIS</Link>
                                                <p className=' card-text text-gray-500 text-[13px]'>Oleh Prof. Dr. Mohamad Rizan, S.E., M.M., Dr. Agung Wahyu Handaru, S.T., M.M., dan Afzil Ramadian, S.T, M.M.Tr.</p>
                                                <p className='text-justify'>Dengan mengucapkan puji syukur ke hadirat Allah Swt. penulis dapat menyelesaikan buku ajar yang berjudul Metode Penelitian Bisnis. Buku ajar ini diharapkan dapat menambah khasanah dan tambahan sumber...</p>
                                            </div>
                                            <div className="gambar flex justify-center items-center">
                                                <Image src={gambar} width={250} height={250} alt='gambar'/>
                                            </div>

                                        </div>
                                       </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Test
