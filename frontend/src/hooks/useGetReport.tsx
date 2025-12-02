import { useState } from 'react';
import { api } from '@/services/api';
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
      const response = await api.get('/users/reports', { 
        responseType: 'blob' 
      });

      // O próprio response.data já é um Blob
      const pdfBlob = response.data;

      const downloadUrl = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Detectar nome do arquivo vindo do backend
      const contentDisposition = response.headers['content-disposition'];
      const fileName =
        contentDisposition?.split('filename=')[1]?.replace(/"/g, '') ||
        `relatorio_${Date.now()}.pdf`;

      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

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
