import styles from './styles.module.css';
import { User, PageResponse } from '@/types/page';
import Pagination from '@/components/Pagination/Pagination';
import Image from 'next/image';

interface TableProps {
  data?: PageResponse<User> | null;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function Table({ data, isLoading, onPageChange, onEdit, onDelete }: TableProps) {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatCpf = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>CPF</th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Sexo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>Carregando...</td>
              </tr>
            ) : !data || data.content.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>Nenhum usuário encontrado</td>
              </tr>
            ) : (
              data.content.map((user) => (
              <tr key={user.id}>
                <td>{formatCpf(user.cpf)}</td>
                <td>{user.name}</td>
                <td>{formatDate(user.nascimento)}</td>
                <td>{user.sexo === 'MASCULINO' ? 'Masculino' : 'Feminino'}</td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      className={styles.editButton}
                      onClick={() => onEdit(user)}
                      title="Editar"
                    >
                      <Image src="/icons/edit.svg" alt="Editar" width={16} height={16} />
                    </button>
                    <button 
                      className={styles.deleteButton}
                      onClick={() => onDelete(user.id)}
                      title="Deletar"
                    >
                      <Image src="/icons/delete.svg" alt="Deletar" width={16} height={16} />
                    </button>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={data.number}
          totalPages={data.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}