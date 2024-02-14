"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaCogs, FaEnvelope } from "react-icons/fa";

const SideNavbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="transition-width fixed left-0 top-0 mt-16 flex h-[80vh] w-16 flex-col justify-center rounded-r-2xl bg-gray-800 duration-300 ease-in-out hover:w-64"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex cursor-pointer items-center justify-center p-4 text-white hover:bg-gray-700">
        {isHovered ? (
          <>
            <FaHome className="mr-2" />
            Home
          </>
        ) : (
          <FaHome />
        )}
      </div>
      <Link href="/customer">
        <div className="flex cursor-pointer items-center justify-center p-4 text-white hover:bg-gray-700">
          {isHovered ? (
            <>
              <FaInfoCircle className="mr-2" />
              Customer
            </>
          ) : (
            <FaInfoCircle />
          )}
        </div>
      </Link>
      <div className="flex cursor-pointer items-center justify-center p-4 text-white hover:bg-gray-700">
        {isHovered ? (
          <>
            <FaCogs className="mr-2" />
            Invoices
          </>
        ) : (
          <FaCogs />
        )}
      </div>
      <div className="flex cursor-pointer items-center justify-center p-4 text-white hover:bg-gray-700">
        {isHovered ? (
          <>
            <FaEnvelope className="mr-2" />
            Products
          </>
        ) : (
          <FaEnvelope />
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
