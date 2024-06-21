//app/Profile/page.tsx


"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_ENDPOINTS from '../config';
import NavProfile from '../components/navprofile';
import foto from "../../../public/images/hero-image.png";
import Image from "next/image";
import Loading from '../components/loading';
import useProfile from '../models/profile';  // Importando a store


const UserProfile = () => {
  const { profileData, setProfile } = useProfile();  // Usando a store do Zustand
  const [error, setError] = useState('');
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        <Loading/>
        return;
      }

      const url = API_ENDPOINTS.LOADING_PROFILE;

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile({
          id: response.data.user._id,
          name: response.data.user.name,
          description: response.data.user.description,
          skills: response.data.user.skills,
          education: response.data.user.education,
          image: null,
          certifications: response.data.user.certifications,
          github: response.data.user.github,
          linkedin: response.data.user.linkedin,
          userId: response.data.user.userId
        });
        setError('');
      } catch (err) {
        setProfile({
          name: '',
          description: '',
          skills: '',
          education: '',
          certifications: '',
          image: null,
          github: '',
          linkedin: '',
        });
        setError('Dados não encontrados ou não cadastrados');
      }
    };

    fetchUserData();
  }, [setProfile]);

  const handleCancelEdit = () => {
    setProfile({
      id: profileData.id,
      name: profileData.name,
      description: profileData.description,
      skills: profileData.skills,
      education: profileData.education,
      image: null,
      certifications: profileData.certifications,
      github: profileData.github,
      linkedin: profileData.linkedin,
      userId: profileData.userId
    });
    setEditable(false); // Define o modo de edição como falso para bloquear os campos do formulário novamente
  };

  const handleEditToggle = () => {
    setEditable(!editable); // Alternar entre o modo de edição e o modo de visualização
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({
      [name]: value,
    } as Partial<typeof profileData>);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      <Loading/>
      return;
    }

    const url = API_ENDPOINTS.UPDATE_PROFILE;

    try {
      if (!profileData) {
        setError('Dados do usuário não encontrados');
        return;
      }

      const result = await axios.patch(url, profileData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Perfil atualizado com sucesso', result);
      setEditable(false); // Define o modo de edição como falso após a atualização bem-sucedida

    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Erro Axios:', err);
      } else {
        console.error('Erro inesperado:', err);
      }
      setError('Erro ao atualizar perfil');
    }
  };

  if (!profileData) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
  <NavProfile />
  <section className="items-center justify-center min-h-screen bg-tertiary text-white md:mt-0 text-base flex flex-col lg:py-16">
    <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
    <div className="flex items-center justify-center mt-14 md:mt-0">
  <div className="rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 p-2 w-[250px] h-[250px] lg:w-[260px] lg:h-[360px] flex items-center justify-center overflow-hidden">
    <div className="rounded-full bg-[#121212] w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full">
              <Image
                src={foto}
                alt="hero image"
                className="rounded-full"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-tertiary md:flex-row items-center justify-center gap-8 py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        {error && <p>{error}</p>}
        <form className="flex flex-col bg-formcolor p-6 rounded-lg shadow-md w-96" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-white block mb-2 text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              disabled={!editable}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="py-4">
            <label htmlFor="description" className="text-white block mb-2 text-sm font-medium">Course:</label>
            <input
              type="text"
              name="description"
              value={profileData.description}
              onChange={handleChange}
              disabled={!editable}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="py-4">
            <label htmlFor="skills" className="text-white block mb-2 text-sm font-medium">Skills:</label>
            <input
              type="text"
              name="skills"
              value={profileData.skills}
              onChange={handleChange}
              disabled={!editable}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="py-4">
            <label htmlFor="education" className="text-white block mb-2 text-sm font-medium">Education:</label>
            <input
              type="text"
              name="education"
              value={profileData.education}
              onChange={handleChange}
              disabled={!editable}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="py-4">
            <label htmlFor="certifications" className="text-white block mb-2 text-sm font-medium">Certifications:</label>
            <input
              type="text"
              name="certifications"
              value={profileData.certifications}
              onChange={handleChange}
              disabled={!editable}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="py-4">
            <label htmlFor="github" className="text-white block mb-2 text-sm font-medium">GitHub:</label>
            <input
              type="text"
              name="github"
              value={profileData.github}
              onChange={handleChange}
              disabled={!editable}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="py-4">
            <label htmlFor="linkedin" className="text-white block mb-2 text-sm font-medium">LinkedIn:</label>
            <input
              type="text"
              name="linkedin"
              value={profileData.linkedin}
              onChange={handleChange}
              disabled={!editable}
              className="bg-[#282a36] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
          <div className="py-4">
            {editable ? (
              <div>
                <button
                  type="submit"
                  className="px-5 py-2 w-full rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-primary-600 text-white font-medium">
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-5 py-2 w-full rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 hover:bg-gray-600 text-white font-medium mt-2">
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleEditToggle}
                className="px-5 py-2 w-full rounded-lg bg-gradient-to-br from-gray-500 to-gray-700 hover:bg-gray-600 text-white font-medium mt-2">
                Editar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  </section>
</div>

  );
};

export default UserProfile;
