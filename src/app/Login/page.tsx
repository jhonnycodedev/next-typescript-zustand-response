// app/Login/page.tsx

"use client";

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_ENDPOINTS from '../config';
import Link from "next/link";
import useUserStore from '../models/user';
import Loading from "../components/loading";

const Login: React.FC = () => {
  const { email, password, setEmail, setPassword } = useUserStore();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Limpa qualquer erro existente
    setIsLoading(true); // Inicia o carregamento

    const url = API_ENDPOINTS.LOGIN;

    try {
      const result = { email, password };

      const response = await axios.post(url, result, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      console.log(data);

      if (data.error === 'Invalid email or password') {
        setError('Invalid email or password.');
      } else if (data.error) {
        setError('Erro no servidor: ' + data.error);
      } else if (data.token == null) {
        setError('An error occurred. Please try again.');
      } else if (data.message === true && data.token) {
        localStorage.setItem('token', data.token);
        router.push('/Profile'); // Certifique-se que a rota '/Profile' está correta
      } else {
        setError('An error occurred. Please try again.');
      }
      
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Finaliza o carregamento
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <h1 className="text-[#ADB7BE] ml-4 mt-4 sm:text-xl rounded md:p-0 hover:text-white">
          <Link className="sm:text-xl nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline" href="/">Initial</Link>
        </h1>
      </div>
      <div className="flex flex-col mt-12 bg-tertiary md:flex-row items-center justify-center gap-8 py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <form className="flex flex-col bg-formcolor p-6 rounded-lg shadow-md w-full md:w-80" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              value={email}
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="name@email.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="text-white block text-sm mb-2 font-medium">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              required
              value={password}
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="your password"
            />
          </div>
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <button
                type="submit"
                className="px-5 py-2 w-full rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-primary-600 text-white font-medium">
                Login
              </button>
              <Link href="/Register">
                <button
                  type="button"
                  className="px-5 py-2 w-full rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 hover:bg-gray-600 text-white font-medium mt-2">
                  Register
                </button>
              </Link>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
