import { useState } from 'react';
import axios from 'axios';

interface UseGetReportReturn {
  generateReport: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useGetReport(): UseGetReportReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateReport = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/reports`,
        { responseType: 'blob' }
      );

      const blob = new Blob([response.data], { 
        type: response.headers['content-type'] || 'application/pdf' 
      });
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const fileName = response.headers['content-disposition']
        ?.split('filename=')[1]
        ?.replace(/"/g, '') || `relatorio_${Date.now()}.pdf`;
      
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) 
        ? err.response?.data?.message || 'Erro ao gerar relatório'
        : 'Erro desconhecido';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { generateReport, isLoading, error };
}