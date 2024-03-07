import Link from "next/link";
import React from "react";

const newmain = () => {
  return (
    <div className="bg-gradient-to-t from-blue-500 to-purple-700 min-h-screen flex items-center justify-center">
      <div className="max-w-6xl flex justify-center">
        <div className="w-full md:flex">
          <div className="w-1/2 hidden md:block">
            <img
              src="https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3"
              className="h-80 w-full max-w-sm rounded-lg object-cover shadow-2xl"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl font-bold leading-tight text-slate-100">
              Get your Data{" "}
              <span className="block">managed by US</span>
            </h1>
            <p className="mt-4 py-2 pr-12 text-xl text-slate-100">
              Use our specially powered designed website to manage your data
              <br /> in minutes.
            </p>
            <Link href="/auth/login">
              <button className="btn btn-primary mt-16 px-12 text-lg normal-case flex items-center justify-center">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default newmain;