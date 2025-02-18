"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "/public/img/logoSB.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [dropdownUser, setDropdownUser] = useState(false);
  const { data: session } = useSession(); // Ambil data user dari NextAuth
  const pathname = usePathname();

  const ActiveNavbar = (url) => (pathname === url ? "active-navbar" : "");
  if (pathname === "/auth" || pathname === "/auth/register") return null;

  const handleClickDropdown = () => {
    setDropdownUser(!dropdownUser);
  };

  return (
    <nav className="navbar shadow-sm fixed-top">
      <div className="container">
        <a className="navbar-brand flex justify-center items-center" href="/">
          <div className="img">
            <Image
              src={logo}
              width={70}
              height={70}
              alt="logo"
              className="logosb rounded-full"
            />
          </div>
          <span className="mx-2 font-bold text-[20px]">Search Books</span>
        </a>
        <div className="navbar-link flex justify-center items-center gap-3">
          <div className="nav-item">
            <Link href="/" className={`nav-link ${ActiveNavbar("/")}`}>
              Home
            </Link>
          </div>
          <div className="nav-item">
            <Link
              href="/books"
              className={`nav-link ${ActiveNavbar("/books")}`}
            >
              Books
            </Link>
          </div>

          {/* Jika user sudah login, tampilkan foto & nama */}
          {session ? (
            <div className="user relative flex items-center gap-2">
              <Image
                src={session.user.image}
                width={35}
                height={35}
                alt="User Avatar"
                className="rounded-full cursor-pointer"
                onClick={handleClickDropdown}
              />
              {/* <span className="font-medium">{session.user.name}</span> */}
              {dropdownUser && (
                <div className="absolute w-[250px] top-10 right-0 rounded-md shadow-md p-3 bg-dropdownuser">
                  <div className="flex justify-start items-center gap-2 mb-2">
                    <Image
                      src={session.user.image}
                      width={35}
                      height={35}
                      alt="User Avatar"
                      className="rounded-full cursor-pointer"
                    />
                    <span className="font-medium text-white">{session.user.name}</span>
                  </div>

                  <button
                    className="btn text-white col-md-12 rounded-full"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="user">
              <Link href="/auth" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
