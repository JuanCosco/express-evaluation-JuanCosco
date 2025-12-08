# Proyecto API con Node.js, Express, PostgreSQL y JWT

Este proyecto es una API REST desarrollada con **Node.js**, **Express**, **PostgreSQL** y **JWT Authentication**, que implementa un sistema de usuarios, roles, posts y likes.

---

## 🚀 Características Principales

### 🔐 Autenticación y Seguridad
- Registro e inicio de sesión con **contraseña hasheada usando bcrypt**.
- Autenticación y autorización mediante **JSON Web Tokens (JWT)**.
- Middlewares de seguridad:
  - `verifyToken` → Verifica la validez del token.
  - `isAdmin` → Restringe rutas solo para administradores.

### 👥 Roles de Usuario
- **user** (por defecto)
- **admin** Lista todos los usuarios.

### 📝 Funcionalidades
- CRUD básico de **usuarios**.
- Sistema de **likes por usuario**.
- Listado de posts con **paginación**.
- Ver posts de un **usuario específico**.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **TypeScript**
- **PostgreSQL** (con el cliente `pg`)
- **JWT**
- **bcrypt**

---

