import { useState } from 'react';
import axios from 'axios';
import { UserCreate } from '@/types/user';

interface UsePostUsersReturn {
  postUser: (userData: UserCreate) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function usePostUsers(): UsePostUsersReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postUser = async (userData: UserCreate) => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...userData,
        cpf: userData.cpf.replace(/\D/g, '')
      };
      
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, 
        payload
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
