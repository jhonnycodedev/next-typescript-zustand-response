// src/app/components/ProfileCard.jsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import GithubIcon from "../../../public/github-icon.svg";
import LinkedinIcon from "../../../public/linkedin-icon.svg";
import foto from "../../../public/images/hero-image.png";

interface Profile {
  name: string;
  description: string;
  skills: string; 
  education: string; 
  certifications: string; 
  github: string;
  linkedin: string;
}

const ProfileCard: React.FC<{ profile: Profile }> = ({ profile }) => {
  
  const skillsArray = profile.skills ? profile.skills.split(',') : [];
  
  return (
    
    <div className=" bg-gray-800 text-white p-4 rounded-lg shadow-md w-full">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-700 overflow-hidden mr-4">
          <Image
            src={foto}
            alt={`${profile.name}'s profile picture`}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">{profile.name}</h3>
          <p className="text-sm">{profile.description}</p>
        </div>
      </div>
      <div className="mb-4">
      <h3 className="font-bold mb-2">Education</h3>
          <p>{profile.education}</p>
          <br/>
          <h3 className="font-bold mb-2">Certifications</h3>
          <p>{profile.certifications}</p>
          <br/>
        </div>
      <div className="mb-4">
        <h4 className="font-bold mb-2">Habilidades:</h4>
          <ul className="list-disc pl-4">
            {skillsArray.map((skill, index) => (
              <li key={index}>{skill.trim()}</li> // trim() para remover espaços em branco extras
            ))}
          </ul>
      </div>
      <div className="flex flex-col">
        {profile.github && (
          <Link href={profile.github} className="flex items-center mb-2">
            <Image src={GithubIcon} alt="Github Icon" width={20} height={20} />
            <span className="ml-2">{profile.github}</span>
          </Link>
        )}
        {profile.linkedin && (
          <Link href={profile.linkedin} className="flex items-center">
            <Image src={LinkedinIcon} alt="Linkedin Icon" width={20} height={20} />
            <span className="ml-2">{profile.linkedin}</span>
          </Link>
        )}
      </div>
    </div>
    
  );
};

export default ProfileCard;
