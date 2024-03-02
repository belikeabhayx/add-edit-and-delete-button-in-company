import Link from "next/link";
import React from "react";

const newmain = () => {
  return (
    <div className="hero bg-gradient-to-t from-blue-500 to-purple-700 py-12">
      <div className="hero-content max-w-6xl flex-col px-4 md:px-0 lg:flex-row-reverse">
        <img
          src="https://plus.unsplash.com/premium_photo-1681319553238-9860299dfb0f?auto=format&fit=crop&q=80&w=2831&ixlib=rb-4.0.3"
          className="h-80  max-w-sm rounded-lg object-cover shadow-2xl"
        />
        <div>
          <h1 className="mt-10 text-5xl font-bold leading-tight text-slate-100 md:mt-0 md:leading-none">
            Get your Website{" "}
            <span className="mt-4 md:block">designed by AI</span>
          </h1>
          <p className="mt-4 py-2 pr-12 text-xl text-slate-100">
            Use our AI powered designed tool to get website
            <br /> in minutes.
          </p>
          <Link href="/start-designing">
            <button className="btn btn-primary mt-16 px-12 text-lg normal-case">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default newmain;
