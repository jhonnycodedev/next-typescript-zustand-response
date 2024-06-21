// .src/app/Contact/page.jsx

"use client";
import React, { useState } from "react";
import NavComponents from "../components/navcomponents";
import {Inter} from "next/font/google";// Componente para exibir perfis

const inter = Inter({subsets: ["latin"]});


const Contact = () => {

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget); 
  
    const data = {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      message: formData.get('message') as string
    };
  
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        console.log("Mensagem Enviada.");
        setEmailSubmitted(true); // Atualiza o estado emailSubmitted para true
      } else {
        console.error("Falha ao enviar mensagem:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };
  

  return (
    <div>
    <NavComponents/>
    <section id="contact" className=" flex-col min-h-screen bg-tertiary grid md:grid-cols-2 py-18 gap-4">
    <section className="min-h-screen bg-tertiary flex flex-col items-center justify-center px-4">
    <div className="text-center">
      <h2 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl lg:leading-normal font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-500 to-secondary-500 ">
          Contact
        </span>
      </h2>
      <p className="text-[#ADB7BE] mb-4 max-w-md">
        We are currently looking for new implementations,
        our inbox is always open. If you have
        Any suggestions or just want to say hi, well be happy
        to receive your message!
      </p>
      <br/>
    </div>
  </section>

  <section className=" flex items-center justify-center">
    <div className="w-96"> {/* Definindo a largura máxima do formulário */}
      {emailSubmitted ? (
        <p className="text-green-500 text-sm mt-2">
          Email successfully sent!!
        </p>
      ) : (
        <div className="flex flex-col w-full min-h-screen bg-tertiary md:flex-row items-center justify-center gap-8 px-4 ">
        <form className="flex flex-col bg-formcolor p-6 rounded-lg shadow-md w-full max-w-[400px] mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white block mb-2 text-sm font-medium">
              From email
            </label>
            <input 
              name="email"
              type="email"
              id="email"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="address@providers.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="text-white block text-sm mb-2 font-medium">
              From name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              required
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
              placeholder="your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="text-white block text-sm mb-2 font-medium">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 h-20 resize-none"
              style={{ width: "100%" }} 
              placeholder="your message"
            />
          </div>
          <button 
            type="submit" 
            className="px-1 inline-block py-1 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3">
            <span className="block bg-tertiary-800 hover:bg-slate-800 rounded-full px-5 py-2">
              Send Message
            </span>
          </button>
        </form>
        </div>
      )}
    </div>
  </section>
</section>
</div>
    
);
    
};

export default Contact;
