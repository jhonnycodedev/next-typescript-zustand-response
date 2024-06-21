// src/config/index.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_ENDPOINTS = {
  // rotas de user
  REGISTER: `${API_BASE_URL}/api/users/register`,
  LOGIN: `${API_BASE_URL}/api/users/login`,
  DELETE_ACCOUNT: `${API_BASE_URL}/api/users/delete`,

  // rotas de profile
  CREATE_PROFILE: `${API_BASE_URL}/api/profiles/create`,
  LOADING_PROFILE: `${API_BASE_URL}/api/profiles/findByToken`,
  FIND_PROFILES: `${API_BASE_URL}/api/profiles/getAll`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/profiles/update`,
  SEARCH_PROFILE: `${API_BASE_URL}/api/profiles/search`,
  // Adicione outros endpoints conforme necessário
};

export default API_ENDPOINTS;
