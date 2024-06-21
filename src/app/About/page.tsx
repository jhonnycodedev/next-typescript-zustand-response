// .src/app/About/page.jsx

"use client";

import NavComponents from "../components/navcomponents";
import React from "react";
import Image from "next/image";

const About: React.FC = () => {
  return (
    <div>
    <NavComponents />
    <section id="about" className="flex-col min-h-screen bg-tertiary grid md:grid-cols-2 py-18 gap-4">
      {/* Parte do Texto */}
      <section className="min-h-screen bg-tertiary flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500">
              About
            </span>
          </h2>
          <p className="text-[#ADB7BE] mb-4 max-w-md">
            Hello! This website is built using modern technologies like React, which provides a dynamic and responsive user experience.
            We use Tailwind CSS for styling, ensuring an elegant and scalable design without compromising performance.
            Zustand was adopted to manage the application state in a simple and efficient way, facilitating the management of data shared between components.
            Furthermore, TypeScript was chosen to offer more robust and secure code, helping to avoid errors and improving the projects maintainability.
            We hope your experience exploring this site is as enjoyable as it was developing it with these powerful tools.
          </p>
        </div>
      </section>
  
      {/* Parte da Imagem */}
      <section className="min-h-screen bg-tertiary flex items-center justify-center px-4">
        <div className="relative w-full h-auto overflow-hidden" style={{ height: '500px' }}>
            <div className="absolute top-0 right-0" style={{ width: '50%', height: '50%' }}>
              <Image 
                alt="aboutimage" 
                src="/images/react.png"
                layout="fill"
                objectFit="cover"
                className="rounded-tr-lg shadow-md"
                style={{ filter: 'brightness(70%)' }} 
              />
           </div>
            <div className="absolute top-0 left-0" style={{ width: '50%', height: '50%' }}>
              <Image 
                alt="aboutimage" 
                src="/images/tailwind.png"
                layout="fill"
                objectFit="cover"
                className="rounded-tl-lg shadow-md"
                style={{ filter: 'brightness(70%)' }} 
              />
            </div>
            <div className="absolute bottom-0 right-0" style={{ width: '50%', height: '50%' }}>
              <Image 
                alt="aboutimage" 
                src="/images/TS.png" 
                layout="fill"
                objectFit="cover"
                className="rounded-br-lg shadow-md"
                style={{ filter: 'brightness(70%)' }} 
              />
            </div>
            <div className="absolute bottom-0 left-0" style={{ width: '50%', height: '50%' }}>
              <Image 
                alt="aboutimage" 
                src="/images/zustand.png" 
                layout="fill"
                objectFit="cover"
                className="rounded-bl-lg shadow-md"
                style={{ filter: 'brightness(70%)' }} 
                />
            </div>
          </div>
      </section>
    </section>
  </div>
  );
}
  
export default About;