import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Image from 'next/image';
import { useDebounce } from '@/hooks/useDebounce';

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FilterInput({  
  value, 
  onChange
}: FilterInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue]);

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
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
}