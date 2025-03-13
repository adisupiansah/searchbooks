"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import logo from "/public/img/logo.ico";
import app from "@/firebase/Firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const AuthLogin = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      result.user;
      window.location.href = "/";
    } catch (error) {
      console.error("terdapat error:", error);
    }
  };

  return (
    <div className="authlogin">
      <div className="container">
        <div className="row flex justify-center items-center vh-100">
          <div className="col-md-6">
            <div className="card border-0">
              <div className="card-body">
                <div className="logo flex flex-column justify-center items-center mb-5">
                  <Image src={logo} width={110} height={110} alt="logo" />
                  <h5 className="card-title text-center mt-2">
                    Sign In To SearcBooks
                  </h5>
                </div>
                <div className="login-google flex justify-center items-center bg-gray-400 col-md-3 rounded-md mx-auto border border-gray-800 hover:bg-gray-500  ">
                  <button
                    className="text-black p-1 flex justify-center items-center gap-2"
                    onClick={handleGoogleLogin}
                  >
                    <span>login</span>
                    <FcGoogle />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
