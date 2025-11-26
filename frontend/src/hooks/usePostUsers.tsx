import { useState } from 'react';
import axios from 'axios';

interface UserData {
  name: string;
  cpf: string;
  birthDate: string;
  gender: string;
}

interface UsePostUsersReturn {
  postUser: (userData: UserData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function usePostUsers(): UsePostUsersReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postUser = async (userData: UserData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(
        `${process.env.BACKEND_URL}/api/users`, 
        userData
      );
      return data;
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Erro ao criar usuário'
        : 'Erro desconhecido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { postUser, isLoading, error };
}
