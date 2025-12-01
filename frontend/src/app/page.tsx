'use client';

import { useState } from 'react';
import FilterInput from '@/components/FilterInput/filterInput';
import styles from './styles.module.css';
import UserModal from '@/components/UserModal/UserModal';
import Toast from '@/components/Toast/Toast';
import Button from '@/components/Button/Button';
import { useGetReport } from '@/hooks/useGetReport';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const { generateReport } = useGetReport();

  const handleSuccess = () => {
    setIsModalOpen(false);
    setToast({ message: 'Usuário criado com sucesso!', type: 'success' });
  };

  const handleError = () => {
    setToast({ message: 'Erro ao criar usuário. Tente novamente.', type: 'error' });
  };

  const handleGenerateReport = async () => {
    setToast({ message: 'Relatório está sendo gerado...', type: 'info' });

    try {
      await generateReport();
      setToast({ message: 'Relatório gerado com sucesso!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Erro ao gerar relatório. Tente novamente.', type: 'error' });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gerenciamento de Usuários</h1>
      </div>
      
      <div className={styles.actions}>
        <FilterInput value={searchTerm} onChange={setSearchTerm} />
        <Button onClick={() => setIsModalOpen(true)} text='Criar Usuário'/>
        <Button 
          text='Gerar Relatório'
          onClick={handleGenerateReport}
        />
      </div>
      
      <div className={styles.tableContainer}>
        {/* <UserTable /> */}
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        onError={handleError}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
