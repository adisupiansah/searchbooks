import Test from '@/components/Test'
import React from 'react'

const page = () => {
  const a = 1
  const b = "1"
  const c = a - b
  return (
    <div>
      <h1 className='text-[45px] flex justify-center items-center vh-100'>HASIL: <span className='text-red-600 font-bold ml-4'>{c}</span></h1>
    </div>
  )
}

export default page

// penjelasan:
// 1 + "1" = 11
// 1 - "1" = 0
// kenapa bisa terjadi? jadi gini dalam dunia pemrograman operator (-) & (+) dalam menangani tipe data, operator (-) hanya berkerja dengan angka jadi jika salah satu variable ada nilai string maka operator (-) akan mengonversinya tipe data number sebelum code di ekesz
