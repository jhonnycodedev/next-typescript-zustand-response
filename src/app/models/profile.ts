// src/app/profile.ts
import { create } from 'zustand'


interface Profile {
  id:string;
  name: string;
  description: string;
  skills: string;
  education: string;
  certifications: string;
  image: File | null;
  github: string,
  linkedin: string,
  userId:string
}

interface ProfileState {
  profileData: Profile;
  setProfile: (data: Partial<Profile>) => void;
}

const useProfile = create<ProfileState>((set) => ({
  profileData: {
    id:'',
    name: '',
    description: '',
    skills: '',
    education: '',
    certifications: '',
    image: null,
    github: '',
    linkedin: '',
    userId:''
    
  },
  setProfile: (data) => set((state) => ({
    profileData: {
      ...state.profileData,
      ...data,
    },
  })),
}));

export default useProfile;
