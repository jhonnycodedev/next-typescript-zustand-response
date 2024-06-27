// src/app/Search/app.tsx
"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import NavComponents from "../components/navcomponents";
import ProfileCard from "../components/ProfileCard";
import foto from "../../../public/images/hero-image.png";
import API_ENDPOINTS from '../config';

interface Profile {
  id: number;
  name: string;
  description: string;
  skills: string;
  education: string;
  certifications: string;
  github: string;
  linkedin: string;
 
}

const Search: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const fetchProfiles = async () => {
    const pageSize = 10;
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    let url = `${API_ENDPOINTS.SEARCH_PROFILE}?keyword=${encodedSearchTerm}&page=${page}&pageSize=${pageSize}`;

    try {
      const response = await axios.get(url);
      
      if (response.data && response.data.length >= 0) {
        const fetchedProfiles: Profile[] = response.data; // Assume que o array de perfis está diretamente no response.data
        const fetchedTotalPages: number = response.data.totalPages || 1; // Supondo que totalPages está no response.data
        setProfiles(fetchedProfiles);
        setTotalPages(fetchedTotalPages);
        setSearchPerformed(true);
      } else {
        console.error("Dados recebidos não são válidos:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
    }
  };

  useEffect(() => {
    if (searchPerformed) {
      fetchProfiles();
    }
  }, [page, searchTerm, searchPerformed]);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchPerformed(false); // Reinicia searchPerformed quando o termo de pesquisa muda
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setProfiles([]); // Limpar os perfis ao iniciar uma nova pesquisa
    setSearchPerformed(true); // Marca a pesquisa como realizada ao submeter o formulário
  };

  return (
    <div>
  <NavComponents />
  <section className="min-h-screen bg-tertiary flex flex-col items-center px-4 py-20 xl:gap-16 xl:px-16" id="searchprofiles">
    <form className="w-full max-w-6xl mx-auto my-4 md:my-8" onSubmit={handleSearchSubmit}>
      <div className="flex justify-center">
        <div className="relative flex-grow w-full max-w-lg">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full text-sm text-gray-100 bg-[#282a36] border border-[#33353F] focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-l-lg rounded-r-lg"
            placeholder="Search specific profiles..."
            required
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
    {searchPerformed && (
      <div className="w-full max-w-6xl mx-auto">
        {profiles.length > 0 ? (
          profiles.map((profile, index) => (
            <React.Fragment key={profile.id}>
              <ProfileCard profile={profile} />
              {index !== profiles.length - 1 && <br />}
            </React.Fragment>
          ))
        ) : (
          <p className="text-white">Nenhum perfil encontrado.</p>
        )}
        <div className="mt-4 flex justify-between">
          <button className="sm:text-xl nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline" onClick={goToPreviousPage} disabled={page === 1}>
            Página Anterior
          </button>
          <button className="sm:text-xl nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline" onClick={goToNextPage} disabled={page === totalPages}>
            Próxima Página
          </button>
        </div>
      </div>
    )}
    {/* Script de scroll integrado ao Search */}
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('searchprofiles').scrollIntoView({ behavior: 'smooth' });
        `,
      }}
    />
  </section>
</div>

  );
};

export default Search;
