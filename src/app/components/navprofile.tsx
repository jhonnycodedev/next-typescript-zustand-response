// .src/app/components/navprofile.jsx

'use client'

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from 'axios';
import API_ENDPOINTS from '../config';
import useProfile from '../models/profile'; // Importe a store do perfil

const NavProfile = () => {
  const [nav, setNav] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettingsOptions, setShowSettingsOptions] = useState(false);
  const router = useRouter();
  const { profileData, setProfile } = useProfile(); // Utilize a store do perfil

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.replace('/Login');
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Token não encontrado');
      return;
    }

    const userId = profileData.userId; // Obtém o userId do estado do perfil
    const url = `${API_ENDPOINTS.DELETE_ACCOUNT}/${userId}`; // URL para deletar a conta

    const confirmDelete = window.confirm('Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.');

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      handleLogout(); // Faz logout após deletar a conta com sucesso

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 403) {
          setError('Você não tem permissão para deletar esta conta.');
        } else {
          setError('Erro ao deletar conta');
        }
        console.error('Erro Axios:', axiosError.message);
      } else {
        setError('Erro inesperado ao deletar conta');
        console.error('Erro inesperado:', error);
      }
    }
  };

  const handleSettingsClick = () => {
    setShowSettingsOptions(!showSettingsOptions);
  };

  const links = [
    {
      id: 1,
      name: "",
      path: "",
    },
    {
      id: 2,
      name: "Logout",
      onClick: handleLogout,
    },
    {
      id: 3,
      name: "Settings",
      onClick: handleSettingsClick,
    },
  ];

  const settingsOptions = [
    {
      id: 4,
      name: "Edit Account",
      path: "/edit-account",
    },
    {
      id: 5,
      name: "Delete Account",
      onClick: handleDeleteAccount,
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-tertiary fixed nav sm:mt-0 md:mt-0">
      <div>
        <h1 className="text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white">
          {/*<Link href="/Developers"></Link>*/}
        </h1>
      </div>
      <ul className="hidden md:flex">
        {links.map(({ id, name, path, onClick }) => (
          <li
            key={id}
            className="sm:text-xl nav-links px-2 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline"
          >
            {onClick ? (
              <a onClick={onClick}>{name}</a>
            ) : (
              <Link href={path}>{name}</Link>
            )}
          </li>
        ))}
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? "Close" : "Menu"}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, name, path, onClick }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              {onClick ? (
                <a onClick={() => { onClick(); setNav(!nav); }}>{name}</a>
              ) : (
                <Link onClick={() => setNav(!nav)} href={path}>
                  {name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}

      {showSettingsOptions && (
        <ul className="absolute top-20 right-4 bg-formcolor rounded p-2">
          {settingsOptions.map(({ id, name, path, onClick }) => (
            <li
              key={id}
              className="text-gray-400 cursor-pointer hover:text-white"
            >
              {onClick ? (
                <a onClick={() => { onClick(); setShowSettingsOptions(false); }}>{name}</a>
              ) : (
                <Link href={path}>{name}</Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavProfile;
