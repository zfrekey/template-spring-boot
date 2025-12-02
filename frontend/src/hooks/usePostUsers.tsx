import { useState } from 'react';
import { api } from '@/services/api';
import { UserCreate } from '@/types/user';
import { AxiosError } from 'axios';

interface UsePostUsersReturn {
  postUser: (userData: UserCreate) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function usePostUsers(): UsePostUsersReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postUser = async (userData: UserCreate): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...userData,
        cpf: userData.cpf.replace(/\D/g, ''),
      };

      await api.post('/users', payload);
    } catch (err) {
      const message = extractErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { postUser, isLoading, error };
}

function extractErrorMessage(err: unknown): string {
  const defaultMessage = 'Erro ao criar usuário';

  if (err instanceof AxiosError) {
    const data = err.response?.data;
    
    if (typeof data === 'string' && data) {
      return data;
    }
    
    if (typeof data === 'object' && data !== null) {
      return data.message ?? data.error ?? err.message ?? defaultMessage;
    }
    
    return err.message ?? defaultMessage;
  }

  return defaultMessage;
}
