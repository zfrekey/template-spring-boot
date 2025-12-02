# 📘 Template de Gerenciamento de Usuários

Sistema completo de gerenciamento de usuários composto por:

- **Backend**: Spring Boot + JPA + H2 + Lombok + JasperReports  
- **Frontend**: React + Next.js + Hooks customizados + componentes reutilizáveis  

---

## 🧾 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Arquitetura / Estrutura](#-arquitetura--estrutura)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Funcionalidades](#-funcionalidades)
- [Requisitos](#-requisitos)
- [Como executar](#-como-executar)
- [Configurações importantes](#-configurações-importantes)
- [Endpoints da API](#-endpoints-da-api)
- [Possíveis melhorias](#-possíveis-melhorias)
- [Autor(es)](#-autores)

---

## 📖 Sobre o projeto

Este projeto consiste em um sistema completo de gerenciamento de usuários, permitindo:

- Criar, editar, listar e excluir usuários  
- Buscar usuários por nome ou CPF  
- Paginar resultados no frontend e backend  
- Gerar relatório de usuários em **PDF** usando JasperReports  
- Criar seed automático de dados com Faker  

O objetivo é demonstrar boas práticas de arquitetura em camadas, integração entre API Java e frontend React/Next.js, além de geração de relatórios profissionais.

---

## 💻 Tecnologias utilizadas

### **Frontend**
- Next.js (App Router)
- React
- Axios
- CSS Modules
- TypeScript

### **Backend**
- Spring Boot
- Spring Data JPA
- H2 Database
- Lombok
- JasperReports
- Java 17+
- Faker
- Exception Handler Global

---

## 🏗 Arquitetura / Estrutura

### Backend

- `controllers/` – Entrada HTTP  
- `service/` – Regras de negócio  
- `repository/` – Persistência via JPA  
- `entity/` – Entidades da aplicação  
- `dto/` – Objetos de transferência  
- `exceptions/` – Exceções personalizadas  
- `config/` – CORS, seed, relatórios  
- `resources/reports/` – Templates JasperReports (.jrxml)  

```text
src/main/java/com/crud/
├── config/
│   ├── CorsConfig.java
│   └── DataSeeder.java
│
├── controllers/
│   └── UserController.java
│
├── dto/
│   ├── UserCreateDTO.java
│   ├── UserEditDTO.java
│   ├── UserReportDTO.java
│   └── UserResponseDTO.java
│
├── entity/
│   ├── enums/
│   └── UserEntity.java
│
├── exceptions/
│   ├── CpfJaCadastradoException.java
│   └── GlobalExceptionHandler.java
│
├── repositories/
│   └── UserRepository.java
│
├── services/
│   ├── ReportService.java
│   └── UserService.java
│
└── CrudApplication.java
```
