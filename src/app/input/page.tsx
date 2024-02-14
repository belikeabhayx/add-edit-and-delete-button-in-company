import Link from "next/link";
import React from "react";
import { useState } from "react";

const Header = () => {
  return (
    <>
      <nav className="bg-gray-400 ">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-10 px-4 sm:px-6 lg:flex-row lg:px-8">
          <div className="mb-4 flex flex-shrink-0 items-center bg-gradient-to-r from-sky-400  to-emerald-600 bg-clip-text text-3xl font-extrabold text-gray-900 text-transparent md:text-5xl lg:text-6xl">
            <h1>Shubh_Mangal</h1>
          </div>

          <div className="sm:hidden lg:block">
            <ul className="ml-10 flex gap-4 text-lg">
              <li className="inline-block rounded-full hover:border hover:underline">
                <Link href="/">Home</Link>
              </li>
              <li className="inline-block rounded-full hover:border hover:underline">
                <Link href="/Furniture">Furniture</Link>
              </li>
              <li className="inline-block rounded-full hover:border hover:underline">
                <Link href="/Resin_Work">Resin_Work</Link>
              </li>
              <li className="inline-block rounded-full hover:border hover:underline">
                <Link href="/Our_Work">Our_Work</Link>
              </li>
              <li className="inline-block rounded-full hover:border hover:underline">
                <Link href="/Contct_Us">Contact_Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
