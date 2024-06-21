// .src/app/components/footer.jsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import GithubIcon from "../../../public/github-icon.svg";

const Footer = () => {
  return (
    <section className="text-white flex flex-col bg-tertiary" id="footer">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16"></div>
        <footer className="footer">
          <div className="container p-12 flex justify-between">
          <div className="socials flex flex-row">
            <Link href="https://github.com/jguimaraesdev">
              <Image src={GithubIcon} alt="Github Icon" width={30}height={30}/>
            </Link>
          </div>
          <p className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Developed © 2024.
          </p>
          </div>
      </footer>
    </section>
  );
};

export default Footer;
