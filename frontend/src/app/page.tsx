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

type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
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

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setUserIdToDelete(null);
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const handleSuccess = () => {
    const message = selectedUser ? 'Usuário editado com sucesso!' : 'Usuário criado com sucesso!';
    closeModal();
    showToast(message, 'success');
    refetch();
  };

  const handleError = (message: string) => {
    showToast(message, 'error');
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
      showToast('Usuário deletado com sucesso!', 'success');
      refetch();
    } catch {
      showToast('Erro ao deletar usuário. Tente novamente.', 'error');
    } finally {
      closeConfirmModal();
    }
  };

  const handleGenerateReport = async () => {
    showToast('Relatório está sendo gerado...', 'info');

    try {
      await generateReport();
      showToast('Relatório gerado com sucesso!', 'success');
    } catch {
      showToast('Erro ao gerar relatório. Tente novamente.', 'error');
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
        <Table 
          data={data}
          isLoading={isLoading}
          error={error}
          onPageChange={setCurrentPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onSuccess={handleSuccess}
        onError={handleError}
        mode={selectedUser ? 'edit' : 'create'}
        initialData={selectedUser ?? undefined}
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
        onCancel={closeConfirmModal}
        confirmText="Deletar"
        cancelText="Cancelar"
      />
    </section>
  );
}
