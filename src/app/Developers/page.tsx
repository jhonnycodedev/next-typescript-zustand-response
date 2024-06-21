// src/app/Developers/page.tsx

"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import NavComponents from "../components/navcomponents";
import ProfileCard from "../components/ProfileCard";
import foto from "../../../public/images/hero-image.png";
import API_ENDPOINTS from '../config';
import Link from "next/link";

const Developers: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  useEffect(() => {
    fetchProfiles();
  }, [page]);

  const fetchProfiles = async () => {
    const pageSize = 10;
    let url = `${API_ENDPOINTS.FIND_PROFILES}?page=${page}&pageSize=${pageSize}`;

    try {
      const response = await axios.get(url);
      console.log("findall", response);
      if (response.data) {
        const { profiles: fetchedProfiles, totalPages: fetchedTotalPages } = response.data;
        setProfiles(fetchedProfiles || []);
        setTotalPages(fetchedTotalPages || 1);
      } else {
        console.error('Dados recebidos não são válidos:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar perfis:', error);
    }
  };

  const universalImage = foto;

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const goToNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };


  return (
    <div>
    <NavComponents />
    <section className="min-h-screen  bg-tertiary md:grid md:grid-cols-1 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16" id="developers">
        <div className="mt-16 md:mt-0 text-left flex flex-col h-full">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500">
                    Perfis
                </span>
            </h1>
            <h2 className="text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white flex justify-end">
                <Link className="sm:text-xl nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline" href="/Search">Search</Link>
            </h2>
            <div className="flex flex-col gap-4 flex-grow">
                {profiles.length > 0 ? profiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={{ ...profile, image: universalImage }} />
                )) : (
                    <p className="text-white">Nenhum perfil encontrado.</p>
                )}
            </div>
            {profiles.length > 0 && (
                <div className="mt-4 flex justify-between">
                    <button className="sm:text-xl nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline" onClick={goToPreviousPage} disabled={page === 1}>Página Anterior</button>
                    <button className="sm:text-xl nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline" onClick={goToNextPage} disabled={page === totalPages}>Próxima Página</button>
                </div>
            )}
        </div>
    </section>
  </div>
  );
};

export default Developers;
