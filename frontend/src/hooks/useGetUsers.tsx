import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { User, PageResponse } from '@/types/page';
import axios from 'axios';

interface PaginationParams {
  page: number;
  size: number;
}

interface SearchParams {
  searchTerm: string;
}

interface UseGetUsersParams extends Partial<PaginationParams>, Partial<SearchParams> {}

interface UseGetUsersState {
  data: PageResponse<User> | null;
  isLoading: boolean;
  error: string | null;
}

interface UseGetUsersActions {
  refetch: () => void;
}

interface UseGetUsersReturn extends UseGetUsersState, UseGetUsersActions {}

export function useGetUsers({ 
  page = 0, 
  size = 10, 
  searchTerm = '' 
}: UseGetUsersParams = {}): UseGetUsersReturn {
  const [data, setData] = useState<PageResponse<User> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
      });

      if (searchTerm) {
        params.append('query', searchTerm);
      }

      const response = await api.get<PageResponse<User>>(
        `/users/paginated?${params.toString()}`
      );

      setData(response.data);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Erro ao buscar usuários'
        : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, size, searchTerm]);

  return { data, isLoading, error, refetch: fetchUsers };
}
