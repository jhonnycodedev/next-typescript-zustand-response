// .src/app/components/loading.tsx

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../globals.css";

const Loading = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Define o tempo de carregamento (em milissegundos)
    const timer = setTimeout(() => {
      setLoading(false);
      setError(true);
    }, 5000); // 5 segundos de carregamento

    // Limpa o temporizador quando o componente é desmontado
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="text-white flex flex-col bg-tertiary min-h-screen">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16"></div>
      <div className="container p-12 flex justify-center items-center flex-grow">
        {loading && (
          <div className="carregando">
            <span className="carregando"></span>
          </div>
        )}
        {error && (
          <div className="error-message text-center">
            <p className="text-2xl mb-4 font-medium text-gray-500 ">Erro ao carregar os dados.</p>
            <button 
              className="px-4 py-2  text-white rounded bg-gradient-to-br from-primary-500 to-secondary-500"
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </button>
            <br/>
            <br/>
              <Link className=" sm:text-xl nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"href="/Login">voltar</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Loading;
