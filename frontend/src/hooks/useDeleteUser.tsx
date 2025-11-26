import { useState } from 'react';
import axios from 'axios';

interface UseDeleteUserReturn {
  deleteUser: (userCpf: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useDeleteUser(): UseDeleteUserReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userCpf: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await axios.delete(
        `${process.env.BACKEND_URL}/api/users/${userCpf}`
      );
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Erro ao deletar usuário'
        : 'Erro desconhecido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteUser, isLoading, error };
}
