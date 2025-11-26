import styles from './styles.module.css';

interface CreateButtonProps {
  onClick?: () => void;
}

export default function CreateButton({ onClick }: CreateButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.icon}>+</span>
      Criar Usuário
    </button>
  );
}