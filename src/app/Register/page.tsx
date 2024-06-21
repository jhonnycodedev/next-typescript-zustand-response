// app/Register/page.tsx

"use client";

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import API_ENDPOINTS from '../config';
import NavComponents from '../components/navcomponents';
import { Inter } from "next/font/google";
import Link from "next/link";
import useUserStore from '../models/user';
import Loading from "../components/loading";

const inter = Inter({ subsets: ["latin"] });

const Register: React.FC = () => {
  const { username, lastname, email, password, setUsername, setLastname, setEmail, setPassword } = useUserStore();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'lastname') setLastname(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear existing errors
    setIsLoading(true);

    const url = API_ENDPOINTS.REGISTER;

    try {
      const result = { username, lastname, email, password };

      const response = await axios.post(url, result, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(result); // Log input data for debugging
      const data = response.data;
      console.log(data); // Log response data for debugging

      if (data.error) {
        setError('Server error: ' + data.error);
      } else if (data.message === true && data.token) {
        localStorage.setItem('token', data.token); // Consider using secure cookies instead
        router.push('/ProfileRegister');
      } else {
        setError('An error occurred. Please try again.');
      }
      
    } catch (error) {
      console.error('An error occurred:', error); // Log the error
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`${inter.className}`}>
      <NavComponents />
      <div className="flex flex-col min-h-screen bg-tertiary md:flex-row items-center justify-center gap-8 py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <form className="flex flex-col bg-formcolor p-6 rounded-lg shadow-md w-80" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-white block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              name="username"
              type="username"
              id="username"
              required
              value={username}
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="example 'Bill'"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="text-white block mb-2 text-sm font-medium">
              Last name
            </label>
            <input
              name="lastname"
              type="lastname"
              id="lastname"
              required
              value={lastname}
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="example 'Gates'"
            />
          </div>
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
          {isLoading && <Loading />}
          <button
            type="submit"
            className="px-5 py-2 w-full rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-primary-600 text-white font-medium">
            Create
          </button>
          <Link href="/Login">
            <button
              type="button"
              className="px-5 py-2 w-full rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 hover:bg-gray-600 text-white font-medium mt-2">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
