# Executive Academic Portfolio & Admin Dashboard Backend

A production-ready REST API built with **Express**, **TypeScript**, **Prisma ORM**, **PostgreSQL**, and **Zod Validation** for the Executive Academic Portfolio Website and Admin Console.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js & TypeScript
- **Framework**: Express.js
- **ORM**: Prisma ORM (`@prisma/client`, `prisma`)
- **Database**: PostgreSQL
- **Validation**: Zod (100% type-safe request validation for params, queries, and body payloads)
- **Authentication**: JWT (JSON Web Tokens) with `bcryptjs` password hashing and role-based access control (RBAC)
- **File Uploads**: Multer (Local disk storage under `/uploads` with strict mime-type verification)
- **Security & Logging**: Helmet, CORS, Morgan

---

## 📁 Project Architecture

```
backend/
├── prisma/
│   ├── schema.prisma          # Complete PostgreSQL schema (22 models & enums)
│   └── seed.ts                # Database seeder with realistic portfolio & admin data
├── src/
│   ├── config/
│   │   ├── env.ts             # Environment configuration
│   │   └── prisma.ts          # Prisma client singleton
│   ├── controllers/
│   │   ├── auth.controller.ts        # Authentication & user profile
│   │   ├── profile.controller.ts     # Executive profile & fast public overview
│   │   ├── crud.factory.ts           # Modular generic CRUD controller factory
│   │   ├── modules.controllers.ts    # Concrete controllers for all 16 modules
│   │   ├── stats.controller.ts       # Dashboard analytics & distribution metrics
│   │   ├── contact.controller.ts     # Secretariat inquiries & notifications
│   │   ├── settings.controller.ts    # Website identity & SEO configuration
│   │   └── upload.controller.ts      # Multi-format media and document uploader
│   ├── middlewares/
│   │   ├── auth.middleware.ts        # JWT verification & role authorization
│   │   ├── error.middleware.ts       # Centralized Prisma/Multer/Express error handler
│   │   ├── upload.middleware.ts      # Multer file upload filters & limits
│   │   └── validate.middleware.ts    # Zod schema validation middleware
│   ├── routes/
│   │   ├── admin.routes.ts           # Protected dashboard API endpoints
│   │   └── public.routes.ts          # Public website API endpoints
│   ├── utils/
│   │   ├── auditLogger.ts            # Audit logging to PostgreSQL activity table
│   │   └── response.ts               # Standardized JSON response formatting
│   ├── app.ts                        # Express application configuration
│   └── server.ts                     # HTTP server listener & graceful shutdown
├── .env.example                      # Template environment variables
├── .env                              # Active environment variables
├── package.json                      # Dependencies and npm scripts
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## ⚙️ Environment Configuration

Set your PostgreSQL connection string in `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# PostgreSQL Connection String (Prisma)
# Replace YOUR_POSTGRES_PASSWORD with your PostgreSQL password
DATABASE_URL="postgresql://postgres:YOUR_POSTGRES_PASSWORD@localhost:5432/portfolio_db?schema=public"

# JWT Authentication
JWT_SECRET="academic_portfolio_jwt_secret_key_super_secure_2026"
JWT_EXPIRES_IN="7d"

# Allowed CORS Origins (comma separated)
CORS_ORIGINS="http://localhost:5173,http://localhost:5174,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:5174"

# Uploads directory
UPLOAD_DIR="uploads"
```

---

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Generate Prisma Client
npm run prisma:generate

# 3. Synchronize Schema with PostgreSQL
npm run prisma:push

# 4. Seed Database with Real Profile & Module Data
npm run prisma:seed

# 5. Start Development Server with hot-reload
npm run dev

# 6. Or Build & Run Production Bundle
npm run build
npm start
```

Default credentials seeded:
- **Email**: `vc@davuniversity.org`
- **Password**: `AdminPassword@2026`
- **Role**: `SUPER_ADMIN`

---

## 📡 API Reference

### 🌐 Public Endpoints (`/api/public`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/public/overview` | Fast consolidated payload for homepage (Profile, Top Metrics, Recent Publications, News, Gallery) |
| `GET` | `/api/public/profile` | Executive profile details |
| `GET` | `/api/public/settings` | Public website metadata & toggles |
| `GET` | `/api/public/seo` | SEO metadata, open graph images, keywords |
| `GET` | `/api/public/positions` | Academic & leadership positions |
| `GET` | `/api/public/education` | Degrees and credentials |
| `GET` | `/api/public/awards` | Honors and recognitions |
| `GET` | `/api/public/patents` | Patents and IP |
| `GET` | `/api/public/publications` | Indexed research papers (Supports `?search=`, `?indexing=`, `?page=`) |
| `GET` | `/api/public/books` | Authored and edited books |
| `GET` | `/api/public/grants` | Sponsored research projects |
| `GET` | `/api/public/supervision` | Supervised PhD scholars |
| `GET` | `/api/public/conferences` | Keynotes and conference lectures |
| `GET` | `/api/public/affiliations` | Governance councils and bodies |
| `GET` | `/api/public/mous` | Institutional MoUs & Alliances |
| `GET` | `/api/public/news` | Press releases and media coverage |
| `GET` | `/api/public/gallery` | Campus & photo gallery items |
| `GET` | `/api/public/documents` | Publicly downloadable credentials/CV |
| `POST` | `/api/public/contact` | Secretariat inquiry form with Zod validation (saves to DB and notifies admin) |

### 🔐 Admin & Dashboard Endpoints (`/api/admin`)
Requires `Authorization: Bearer <token>` (except login/register):

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/auth/login` | Admin authentication & JWT token generation |
| `POST` | `/api/admin/auth/register` | Register new admin/editor user |
| `GET` | `/api/admin/auth/me` | Fetch active authenticated user session |
| `PUT` | `/api/admin/auth/account` | Update account profile |
| `POST` | `/api/admin/auth/change-password` | Change account password |
| `GET` | `/api/admin/stats` | Analytics counters, content distribution, recent activities |
| `POST` | `/api/admin/upload` | Multipart file upload (images, PDFs, documents) |
| `GET/PUT` | `/api/admin/profile` | Read/update executive academic profile |
| `GET/PUT` | `/api/admin/website-settings` | Read/update website settings |
| `GET/PUT` | `/api/admin/seo-settings` | Read/update SEO settings |
| `GET/PUT/DELETE` | `/api/admin/contact-messages` | Manage received inquiries |
| `GET` | `/api/admin/activity-logs` | Read audit trail of all console operations |
| `CRUD` | `/api/admin/positions` | Manage positions |
| `CRUD` | `/api/admin/education` | Manage education |
| `CRUD` | `/api/admin/awards` | Manage awards |
| `CRUD` | `/api/admin/patents` | Manage patents |
| `CRUD` | `/api/admin/publications` | Manage publications |
| `CRUD` | `/api/admin/supervision` | Manage PhD scholars |
| `CRUD` | `/api/admin/books` | Manage books & chapters |
| `CRUD` | `/api/admin/grants` | Manage research grants |
| `CRUD` | `/api/admin/mous` | Manage MoUs |
| `CRUD` | `/api/admin/affiliations` | Manage affiliations |
| `CRUD` | `/api/admin/conferences` | Manage conferences |
| `CRUD` | `/api/admin/gallery` | Manage gallery items |
| `CRUD` | `/api/admin/news` | Manage news & media |
| `CRUD` | `/api/admin/media` | Media asset library |
| `CRUD` | `/api/admin/documents` | Document management |
| `CRUD` | `/api/admin/users` | Admin & editor user management (Super Admin only) |
| `CRUD` | `/api/admin/notifications` | In-app alerts |
