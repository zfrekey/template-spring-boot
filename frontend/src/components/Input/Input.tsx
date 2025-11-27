import styles from './styles.module.css';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  required = false
}: InputProps) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={error ? styles.inputError : styles.input}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
