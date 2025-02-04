'use client'
import Image from "next/image";
import React from "react";
import logo from "/public/img/logoSB.png"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const ActiveNavbar = (url) => pathname === url ? "active-navbar" : "";

  return (
    <nav className="navbar shadow-sm">
      <div className="container">
        <a className="navbar-brand flex justify-center items-center" href="#">
          <div className="img">
            <Image src={logo} width={70} height={70} alt="logo"  className='logosb rounded-full' />
          </div>
          <span className='mx-2 font-bold text-[20px]'>Search Books</span>
        </a>
        <div className="navbar-link flex gap-3" >
          <div className="nav-item">
            <Link href='/' className={`nav-link ${ActiveNavbar("/")}`}>Home</Link>
          </div>
          <div className="nav-item">
            <Link href='/books' className={`nav-link ${ActiveNavbar("/books")}`}>Books</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
