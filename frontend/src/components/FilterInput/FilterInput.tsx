import styles from './styles.module.css';
import Image from 'next/image';

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FilterInput({  
  value, 
  onChange 
}: FilterInputProps) {
  return (
    <div className={styles.inputWrapper}>
      <Image 
        src="/search.png"
        alt="Search icon"
        width={20}
        height={20}
        className={styles.searchIcon}
      />
      <input
        type="text"
        className={styles.input}
        placeholder="Buscar por Nome ou CPF..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}