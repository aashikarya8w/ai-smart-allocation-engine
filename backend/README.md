# SIH25033 – AI-Based Smart Allocation Engine
## Backend API

Production-ready Node.js + Express + TypeScript + MongoDB backend for the PM Internship Scheme platform.

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Runtime      | Node.js 20+                         |
| Framework    | Express.js 4                        |
| Language     | TypeScript 5                        |
| Database     | MongoDB + Mongoose 8                |
| Auth         | JWT (access + refresh tokens)       |
| Security     | Helmet, CORS, express-rate-limit    |
| Validation   | Zod                                 |
| File Upload  | Multer (local storage)              |
| Email        | Nodemailer (mock in dev)            |
| Dev Server   | tsx watch                           |

---

## Folder Structure

```
backend/
├── src/
│   ├── config/          # DB, env, mail config
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Auth, error, upload, rate-limit
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routers
│   ├── services/        # Business logic
│   ├── utils/           # JWT, password, pagination, scoring
│   ├── validators/      # Zod schemas
│   ├── app.ts           # Express app setup
│   └── server.ts        # Entry point
├── scripts/
│   └── seed.ts          # Database seeder
├── uploads/             # Uploaded resumes
├── .env                 # Environment variables (gitignored)
├── .env.example         # Template
├── package.json
└── tsconfig.json
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in values:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/sih25033

JWT_ACCESS_SECRET=your_access_secret_here
JWT_REFRESH_SECRET=your_refresh_secret_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000

# Email (leave blank to use dev console logging)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=InternAI <noreply@sih25033.com>

UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

---

## Installation

```bash
cd backend
npm install
```

---

## MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `sih25033`
3. Set `MONGO_URI` in `.env`

---

## Running

```bash
# Development (hot reload)
npm run dev

# Build
npm run build

# Production
npm start

# Seed database
npm run seed
```

---

## Seed Data

The seed script creates:

| Entity        | Count |
|---------------|-------|
| Skills        | 50    |
| Sectors       | 15    |
| Locations     | 15    |
| Students      | 21    |
| Companies     | 11    |
| Internships   | 25    |
| Applications  | ~50   |
| Allocations   | 10    |
| Notifications | 11    |
| Rules         | 3     |

### Demo Credentials

| Role    | Email                     | Password     |
|---------|---------------------------|--------------|
| Admin   | admin@sih25033.com        | Admin@123    |
| Company | company@sih25033.com      | Company@123  |
| Student | student@sih25033.com      | Student@123  |

---

## API Overview

Base URL: `http://localhost:5000/api`

### Authentication
| Method | Endpoint                    | Description           |
|--------|-----------------------------|-----------------------|
| POST   | /auth/register              | Register user         |
| POST   | /auth/login                 | Login                 |
| POST   | /auth/logout                | Logout                |
| POST   | /auth/refresh               | Refresh tokens        |
| GET    | /auth/me                    | Get current user      |
| POST   | /auth/verify-email          | Verify email          |
| POST   | /auth/forgot-password       | Forgot password       |
| POST   | /auth/reset-password        | Reset password        |
| POST   | /auth/change-password       | Change password       |

### Students
| Method | Endpoint                 | Auth     |
|--------|--------------------------|----------|
| GET    | /students/profile        | Student  |
| PUT    | /students/profile        | Student  |
| PUT    | /students/skills         | Student  |
| PUT    | /students/education      | Student  |
| GET    | /students/dashboard      | Student  |
| GET    | /students/:id            | Any Auth |

### Companies
| Method | Endpoint                 | Auth     |
|--------|--------------------------|----------|
| GET    | /companies/profile       | Company  |
| PUT    | /companies/profile       | Company  |
| GET    | /companies/dashboard     | Company  |
| GET    | /companies/:id           | Any Auth |

### Internships
| Method | Endpoint                    | Auth     |
|--------|-----------------------------|----------|
| GET    | /internships                | Public   |
| GET    | /internships/:id            | Public   |
| POST   | /internships                | Company  |
| PUT    | /internships/:id            | Company  |
| DELETE | /internships/:id            | Company  |
| GET    | /internships/my/list        | Company  |
| PUT    | /internships/:id/approve    | Admin    |
| PUT    | /internships/:id/reject     | Admin    |

### Applications
| Method | Endpoint                      | Auth     |
|--------|-------------------------------|----------|
| POST   | /applications                 | Student  |
| GET    | /applications/my              | Student  |
| PUT    | /applications/:id/withdraw    | Student  |
| GET    | /applications/company         | Company  |
| PUT    | /applications/:id/status      | Company  |
| GET    | /applications                 | Admin    |
| GET    | /applications/:id             | Any Auth |

### Matching & Recommendations
| Method | Endpoint                              | Auth     |
|--------|---------------------------------------|----------|
| GET    | /matching/recommendations             | Student  |
| POST   | /matching/recommendations/generate    | Student  |
| POST   | /matching/run                         | Admin    |
| GET    | /matching/results                     | Admin    |
| GET    | /matching/score/:studentId/:internshipId | Any Auth |

### Allocations
| Method | Endpoint                         | Auth     |
|--------|----------------------------------|----------|
| POST   | /allocations/run                 | Admin    |
| GET    | /allocations                     | Admin    |
| GET    | /allocations/:id                 | Admin    |
| POST   | /allocations/:id/approve         | Admin    |
| POST   | /allocations/:id/reject          | Admin    |
| GET    | /allocations/student/my          | Student  |
| GET    | /allocations/company/my          | Company  |

### Assessments
| Method | Endpoint                         | Auth     |
|--------|----------------------------------|----------|
| POST   | /assessments                     | Company  |
| GET    | /assessments/:id                 | Any Auth |
| PUT    | /assessments/:id                 | Company  |
| DELETE | /assessments/:id                 | Company  |
| POST   | /assessments/:id/start           | Student  |
| POST   | /assessments/:id/submit          | Student  |
| GET    | /assessments/:id/result          | Student  |
| GET    | /assessments/student/my-results  | Student  |

### Rules
| Method | Endpoint                  | Auth  |
|--------|---------------------------|-------|
| GET    | /rules                    | Any   |
| GET    | /rules/matching           | Any   |
| GET    | /rules/allocation         | Any   |
| GET    | /rules/eligibility        | Any   |
| PUT    | /rules/matching           | Admin |
| PUT    | /rules/allocation         | Admin |
| PUT    | /rules/eligibility        | Admin |

### Skills / Sectors / Locations
| Method | Endpoint                  | Auth  |
|--------|---------------------------|-------|
| GET    | /skills                   | Any   |
| GET    | /sectors                  | Any   |
| GET    | /locations                | Any   |
| GET    | /locations/states         | Any   |
| GET    | /locations/cities         | Any   |
| POST   | /skills                   | Admin |
| POST   | /sectors                  | Admin |

### Notifications
| Method | Endpoint                      | Auth     |
|--------|-------------------------------|----------|
| GET    | /notifications                | Auth     |
| GET    | /notifications/unread-count   | Auth     |
| PATCH  | /notifications/:id/read       | Auth     |
| PATCH  | /notifications/read-all       | Auth     |
| DELETE | /notifications/:id            | Auth     |

### Feedback & Evaluations
| Method | Endpoint                            | Auth     |
|--------|-------------------------------------|----------|
| POST   | /feedback                           | Student  |
| GET    | /feedback/my                        | Student  |
| GET    | /feedback/internship/:id            | Any Auth |
| POST   | /feedback/evaluations               | Company  |
| GET    | /feedback/evaluations/student/:id   | Any Auth |

### Admin
| Method | Endpoint                           | Auth  |
|--------|------------------------------------|-------|
| GET    | /admin/dashboard                   | Admin |
| GET    | /admin/students                    | Admin |
| GET    | /admin/companies                   | Admin |
| GET    | /admin/internships                 | Admin |
| GET    | /admin/applications                | Admin |
| GET    | /admin/allocations                 | Admin |
| POST   | /admin/allocations/run             | Admin |
| GET    | /admin/analytics                   | Admin |
| GET    | /admin/audit-logs                  | Admin |
| GET    | /admin/reports                     | Admin |
| POST   | /admin/reports/generate            | Admin |
| GET    | /admin/administrators              | Admin |
| POST   | /admin/administrators              | Admin |

---

## Standard Response Format

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Something went wrong",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": []
  }
}
```

**Paginated list:**
```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

## Matching Algorithm

Weights (configurable via admin rules):

| Factor        | Default Weight |
|---------------|---------------|
| Skill Match   | 40%           |
| Qualification | 20%           |
| Location      | 15%           |
| Interest      | 15%           |
| Experience    | 10%           |

Score = sum of weighted individual scores (0–100).

---

## Allocation Engine

1. Fetch active internships with available seats
2. For each internship, score all applied students
3. Sort by: eligibility → score → CGPA → application timestamp (deterministic)
4. Allocate top N students (N = available seats)
5. Mark remaining eligible candidates as Waitlisted
6. Update seat counts atomically via MongoDB transactions
7. Create notifications for all students
8. Log action in audit trail

---

## Frontend Integration

The frontend at `http://localhost:3000` connects via:
- `Authorization: Bearer <accessToken>` header on all protected routes
- Replace mock service calls with `fetch`/`axios` to `http://localhost:5000/api/...`

---

## Security

- Passwords hashed with bcrypt (12 rounds)
- JWT access tokens expire in 15 minutes
- Refresh tokens expire in 7 days
- Helmet sets secure HTTP headers
- CORS restricted to `CLIENT_URL`
- Rate limiting: 100 req/15min globally, 20 req/15min on auth routes
- Passwords never returned in API responses
- Stack traces hidden in production
