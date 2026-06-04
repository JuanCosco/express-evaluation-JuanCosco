# 🔐 REST API — Node.js + Express + TypeScript + PostgreSQL + JWT

API REST con sistema completo de autenticación, autorización por roles, gestión de usuarios, posts y likes. Implementada con arquitectura en capas, middleware de seguridad y tests de integración.

---

## 🚀 Funcionalidades

**Autenticación y seguridad**
- Registro e inicio de sesión con contraseña hasheada (bcrypt)
- Autenticación stateless mediante JSON Web Tokens (JWT)
- Middleware `verifyToken` — valida token en rutas protegidas
- Middleware `isAdmin` — restringe acceso a rutas administrativas

**Gestión de usuarios**
- CRUD completo de usuarios
- Sistema de roles: `user` (por defecto) y `admin`

**Posts y likes**
- Listado de posts con paginación
- Posts por usuario específico
- Sistema de likes por usuario

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Lenguaje | TypeScript |
| Base de datos | PostgreSQL (cliente `pg`) |
| Auth | JWT + bcrypt |
| Testing | Jest |
| Variables de entorno | dotenv |

---

## 📁 Estructura del proyecto

```
express-evaluation-JuanCosco/
├── src/                          # Código fuente TypeScript
├── EvaluacionJC.sql              # Schema y datos iniciales de la BD
├── Insomnia Express 2025-12-07.yaml  # Colección de endpoints para Insomnia
├── .env.example                  # Variables de entorno requeridas
├── jest.config.js                # Configuración de tests
├── tsconfig.json
└── package.json
```

---

## ⚙️ Instalación y uso

### 1. Clonar e instalar dependencias

```bash
git clone https://github.com/JuanCosco/express-evaluation-JuanCosco.git
cd express-evaluation-JuanCosco
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con tus valores:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nombre_bd
DB_USER=usuario
DB_PASSWORD=contraseña
JWT_SECRET=tu_secreto_jwt
```

### 3. Crear la base de datos

```bash
psql -U tu_usuario -f EvaluacionJC.sql
```

### 4. Levantar el servidor

```bash
npm run dev       # desarrollo con hot reload
npm run build     # compilar TypeScript
npm start         # producción
```

### 5. Ejecutar tests

```bash
npm test
```

---

## 📡 Endpoints principales

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ❌ | Registro de usuario |
| `POST` | `/auth/login` | ❌ | Login, retorna JWT |
| `GET` | `/users` | Admin | Lista todos los usuarios |
| `GET` | `/posts` | ✅ | Lista posts con paginación |
| `GET` | `/posts/user/:id` | ✅ | Posts de un usuario |
| `POST` | `/likes` | ✅ | Dar like a un post |

> La colección completa de endpoints está disponible en `Insomnia Express 2025-12-07.yaml` — importar directamente en Insomnia.

---

## 👤 Autor

**Juan Armando Cosco Turín**  
[GitHub](https://github.com/JuanCosco)