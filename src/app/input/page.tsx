import React from 'react';
import { HiOutlineHome, HiOutlineUser, HiOutlineDocumentReport } from 'react-icons/hi';

const navigation = [
  { name: 'Home', href: '#', icon: HiOutlineHome },
  { name: 'Profile', href: '#', icon: HiOutlineUser },
  { name: 'Projects', href: '#', icon: HiOutlineDocumentReport },
];

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            {/* Not implemented in this example */}
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-white text-2xl font-bold">My Navbar</h1>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* User menu, notifications, etc. (not implemented in this example) */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;