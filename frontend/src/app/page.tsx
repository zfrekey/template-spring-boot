import styles from './styles.module.css';

export default function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gerenciamento de Usuários</h1>
      </div>
      
      <div className={styles.actions}>
        {/* <FilterInput/>
        <CreateButton/>  */}
      </div>
      
      <div className={styles.tableContainer}>
        {/* <UserTable /> */}
      </div>
    </section>
  );
}
