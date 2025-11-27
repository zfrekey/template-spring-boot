'use client';

import { useState } from 'react';
import FilterInput from '@/components/FilterInput/filterInput';
import styles from './styles.module.css';
import CreateButton from '@/components/CreateButton/createButton';
import UserModal from '@/components/UserModal/UserModal';
import Toast from '@/components/Toast/Toast';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setToast({ message: 'Usuário criado com sucesso!', type: 'success' });
  };

  const handleError = () => {
    setToast({ message: 'Erro ao criar usuário. Tente novamente.', type: 'error' });
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gerenciamento de Usuários</h1>
      </div>
      
      <div className={styles.actions}>
        <FilterInput value={searchTerm} onChange={setSearchTerm} />
        <CreateButton onClick={() => setIsModalOpen(true)} />
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
