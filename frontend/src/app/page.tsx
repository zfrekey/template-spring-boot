'use client';

import { useState } from 'react';
import FilterInput from '@/components/FilterInput/filterInput';
import styles from './styles.module.css';
import UserModal from '@/components/UserModal/UserModal';
import Toast from '@/components/Toast/Toast';
import Button from '@/components/Button/Button';
import Table from '@/components/Table/Table';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { useGetReport } from '@/hooks/useGetReport';
import { useGetUsers } from '@/hooks/useGetUsers';
import { useDeleteUser } from '@/hooks/useDeleteUser';
import { User } from '@/types/page';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  
  const { generateReport } = useGetReport();
  const { data, isLoading, error, refetch } = useGetUsers({ 
    page: currentPage, 
    size: 10, 
    searchTerm 
  });
  const { deleteUser } = useDeleteUser();

  const handleSuccess = () => {
    const message = selectedUser ? 'Usuário editado com sucesso!' : 'Usuário criado com sucesso!';
    setIsModalOpen(false);
    setSelectedUser(null);
    setToast({ message, type: 'success' });
    refetch();
  };

  const handleError = () => {
    setToast({ message: 'Erro ao criar usuário. Tente novamente.', type: 'error' });
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUserIdToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    if (userIdToDelete === null) return;

    try {
      await deleteUser(userIdToDelete);
      setToast({ message: 'Usuário deletado com sucesso!', type: 'success' });
      refetch();
    } catch (error) {
      setToast({ message: 'Erro ao deletar usuário. Tente novamente.', type: 'error' });
    } finally {
      setIsConfirmModalOpen(false);
      setUserIdToDelete(null);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        {error && <p style={{ color: '#ef4444', textAlign: 'center', padding: '1rem' }}>Erro: {error}</p>}
        <Table 
          data={data}
          isLoading={isLoading}
          onPageChange={handlePageChange}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onSuccess={handleSuccess}
        onError={handleError}
        mode={selectedUser ? 'edit' : 'create'}
        initialData={selectedUser ? {
          id: selectedUser.id,
          name: selectedUser.name,
          cpf: selectedUser.cpf,
          nascimento: selectedUser.nascimento,
          sexo: selectedUser.sexo
        } : undefined}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Confirmar exclusão"
        message="Tem certeza que deseja deletar este usuário? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsConfirmModalOpen(false);
          setUserIdToDelete(null);
        }}
        confirmText="Deletar"
        cancelText="Cancelar"
      />
    </section>
  );
}
