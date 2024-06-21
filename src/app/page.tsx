// src/app/Login/page.tsx


import Navbar from "./components/navbar";
import React from 'react';

const Index : React.FC = () => {

  return (
  <div>
  <Navbar />
  <div id="Index" className="flex flex-col min-h-screen rounded-full md:flex-row items-center justify-center gap-8 py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
    <section className="flex flex-col items-center justify-center w-full md:w-1/2">
      <h2 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal text-center">
        <span className="block text-transparent bg-clip-text font-bold bg-gradient-to-br from-primary-500 to-secondary-500">
          Script 
        </span>
        <p className="text-base lg:text-4xl block text-center">And</p>
        <span className="block text-transparent bg-clip-text font-bold bg-gradient-to-br from-primary-500 to-secondary-500">
          Socials
        </span>
        <p className="block text-center text-base lg:text-4xl">
          Your social network for beginner developers.
        </p>
      </h2>
    </section>
  </div>
</div>

  );
};

export default Index;
