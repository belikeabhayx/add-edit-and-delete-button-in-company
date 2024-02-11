"use client"
import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaCogs, FaEnvelope } from 'react-icons/fa';

const SideNavbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 h-[80vh] w-16 bg-gray-800 transition-width duration-300 ease-in-out hover:w-64 flex flex-col justify-center rounded-r-2xl mt-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-white p-4 cursor-pointer hover:bg-gray-700 flex items-center justify-center">
        {isHovered ? (
          <>
            <FaHome className="mr-2" />
            Home
          </>
        ) : (
          <FaHome />
        )}
      </div>
      <div className="text-white p-4 cursor-pointer hover:bg-gray-700 flex items-center justify-center">
        {isHovered ? (
          <>
            <FaInfoCircle className="mr-2" />
            About
          </>
        ) : (
          <FaInfoCircle />
        )}
      </div>
      <div className="text-white p-4 cursor-pointer hover:bg-gray-700 flex items-center justify-center">
        {isHovered ? (
          <>
            <FaCogs className="mr-2" />
            Services
          </>
        ) : (
          <FaCogs />
        )}
      </div>
      <div className="text-white p-4 cursor-pointer hover:bg-gray-700 flex items-center justify-center">
        {isHovered ? (
          <>
            <FaEnvelope className="mr-2" />
            Contact
          </>
        ) : (
          <FaEnvelope />
        )}
      </div>
    </div>
  );
};

export default SideNavbar;