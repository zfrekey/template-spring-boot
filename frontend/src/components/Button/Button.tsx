import styles from './styles.module.css';

interface ButtonProps {
  onClick?: () => void;
  text: 'Criar Usuário' | 'Gerar Relatório';
}

export default function Button({ onClick, text }: ButtonProps) {
  const showIcon = text === 'Criar Usuário';
  const isReport = text === 'Gerar Relatório';

  return (
    <button 
      className={`${styles.button} ${isReport ? styles.yellow : ''}`} 
      onClick={onClick}
    >
      {showIcon && <span className={styles.icon}>+</span>}
      {text}
    </button>
  );
}