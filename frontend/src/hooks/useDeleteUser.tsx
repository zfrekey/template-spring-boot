import { useState } from 'react';
import { api } from '@/services/api';
import axios from 'axios';

interface UseDeleteUserReturn {
  deleteUser: (userId: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}export function useDeleteUser(): UseDeleteUserReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.delete(`/users/${userId}`);
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
