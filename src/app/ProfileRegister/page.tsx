// src/app/Register/page.tsx

"use client";
import React, { ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import useProfile from "../models/profile";
import API_ENDPOINTS from '../config';
import axios from 'axios';
import { Inter } from "next/font/google";
import NavComponents from '../components/navcomponents';
import Link from "next/link"
const inter = Inter({ subsets: ["latin"] });

const RegisterProfile: React.FC = () => {
  const router = useRouter();
  const { profileData, setProfile } = useProfile();
  const [error, setError] = React.useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({[name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Limpa qualquer erro existente

    const url = API_ENDPOINTS.CREATE_PROFILE;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token not found. Please login again.');
        return;
      }

      const form = {
        name: profileData.name,
        description: profileData.description,
        skills: profileData.skills,
        education: profileData.education,
        certifications: profileData.certifications,
        image: profileData.image,
        github: profileData.github,
        linkedin: profileData.linkedin, // Corrigido para linkedin
      };

      const response = await axios.post(url, form, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Adiciona o token no cabeçalho Authorization
        },
      });

      const data = response.data;
      console.log(data);
      
      if (data.error) {
        setError(data.error.message || 'Erro no servidor');
      } else if (data.message === 'OK') {
        router.push('/Profile');
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again.');
    }
  };


  return (
    <div className={`${inter.className}`}>
      <NavComponents />
      <div className="flex flex-col min-h-screen bg-tertiary md:flex-row items-center justify-center gap-8 py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <form className="flex flex-col bg-formcolor p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="name" className="text-white block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              required
              value={profileData.name}
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="text-white block mb-2 text-sm font-medium">
              Graduation
            </label>
            <input
              name="description"
              type="text"
              id="description"
              required
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Your graduation"
              value={profileData.description}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="education" className="text-white block mb-2 text-sm font-medium">
              Institute
            </label>
            <input
              name="education"
              type="text"
              id="education"
              required
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Your Institute"
              value={profileData.education}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="certifications" className="text-white block mb-2 text-sm font-medium">
              Certifications
            </label>
            <input
              name="certifications"
              type="text"
              id="certifications"
              required
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Your certifications"
              value={profileData.certifications}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="skills" className="text-white block mb-2 text-sm font-medium">
              Skills
            </label>
            <textarea
              name="skills"
              id="skills"
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="Your skills"
              value={profileData.skills}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact.github" className="text-white block mb-2 text-sm font-medium">
              Github
            </label>
            <input
              type="text"
              name="github"
              id="github"
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="https://github.com/"
              value={profileData.github}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contact.linkedin" className="text-white block mb-2 text-sm font-medium">
              Linkedin
            </label>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              onChange={handleChange}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="https://www.linkedin.com/in/"
              value={profileData.linkedin}
            />
          </div>
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

export default RegisterProfile;
