import { useState } from 'react';
import { api } from '@/services/api';
import { UserEdit } from '@/types/user';
import axios from 'axios';

interface UseEditUserReturn {
  editUser: (id: number, userData: UserEdit) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useEditUser(): UseEditUserReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editUser = async (id: number, userData: UserEdit) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.patch(`/users/${id}`, userData);
      return data;
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Erro ao editar usuário'
        : 'Erro desconhecido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { editUser, isLoading, error };
}
