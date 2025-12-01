/**
 * Componente de paginação reutilizável com navegação por páginas.
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={0}
 *   totalPages={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 * />
 * ```
 *
 * @param currentPage - Página atualmente ativa (baseada em 0)
 * @param totalPages - Total de páginas disponíveis
 * @param onPageChange - Callback chamado quando o usuário seleciona uma nova página
 *
 * @remarks
 * - Renderiza botões de Anterior/Próxima que ficam desabilitados nos limites
 * - Mostra elipse (...) quando há muitas páginas para melhor UX
 * - A página ativa é destacada em azul
 */

import styles from './styles.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible + 2) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(0);
    if (currentPage > 1) pages.push("...");

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages - 2, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages - 1);

    return pages;
  };

  const pages = buildPages();

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationPrev}
        onClick={() => currentPage > 0 && onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p as number)}
            className={`${styles.paginationButton} ${currentPage === p ? styles.paginationButtonActive : ""}`}
          >
            {(p as number) + 1}
          </button>
        )
      )}

      <button
        className={styles.paginationNext}
        onClick={() => currentPage < totalPages - 1 && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        aria-label="Próxima página"
      >
        ›
      </button>
    </div>
  );
}
