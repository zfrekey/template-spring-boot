import "@/styles/globals.css";
import Image from 'next/image'

export const metadata = {
  title: "CRUD Usuários",
  description: "Sistema simples de clientes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <Image
            src='/logo_dataprev.png'
            alt='Logo DataPrev'
            width={100}
            height={35}
            priority
          />
        </header>

        <main>
          {children}
        </main>

        <footer>
          Dataprev © 2025
        </footer>
      </body>
    </html>
  );
}
