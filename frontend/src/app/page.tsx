'use client';

import { useState } from 'react';
import  FilterInput from '@/components/FilterInput/filterInput';
import styles from './styles.module.css';
import  CreateButton from '@/components/CreateButton/createButton';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gerenciamento de Usuários</h1>
      </div>
      
      <div className={styles.actions}>
        <FilterInput value={searchTerm} onChange={setSearchTerm} />
        <CreateButton/>
      </div>
      
      <div className={styles.tableContainer}>
        {/* <UserTable /> */}
      </div>
    </section>
  );
}
