# InternAI — AI-Based Smart Allocation Engine

PM Internship Scheme ke liye AI-driven Allocation Engine aur Full-Stack Platform.

---

## 🚀 Quick Start / Kaise Run Karein

Aap platform ko nimnlikhit tariko se easily run kar sakte hain:

### Option 1: One-Click Runner (Windows)
Double-click karein:
- **`start-dev.bat`** (ya PowerShell me: `.\start-dev.ps1`)
Ye backend aur frontend dono ko separate console windows me start kar dega.

---

### Option 2: NPM Scripts (Root Folder se)
Root directory me terminal open karke:
```bash
# Backend start karne ke liye:
npm run dev:backend

# Frontend start karne ke liye:
npm run dev:frontend

# Backend build:
npm run build:backend

# Frontend build:
npm run build:frontend

# Tests run karne ke liye:
npm run test:backend

# Database seed karne ke liye:
npm run seed
```

---

### Option 3: Manual Startup
Dono services ko manually run karne ke liye 2 terminal tabs open karein:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
Backend chalega: `http://localhost:5001`
Swagger API Docs: `http://localhost:5001/api-docs`

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
Frontend chalega: `http://localhost:3000`

---

## 🔑 Login Credentials (Demo Accounts)

Platform par teeno roles ke demo credentials:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@internai.gov.in` ya `admin@sih25033.com` | `Admin@123` |
| **Company** | `hr@technova.com` ya `company@sih25033.com` | `Company@123` |
| **Student** | `aashikrock1254@gmail.com` ya `student@sih25033.com` | `Student@123` |

> Login page (`http://localhost:3000/login`) par **Quick Demo Copy** buttons bhi maujood hain jinhe click karke direct credentials fill ho jate hain.

---

## 🛠️ Verification & Status
- **Backend Build (`tsc`):** ✅ Passed (0 errors)
- **Backend Tests (Jest):** ✅ Passed (72 / 72 tests passed)
- **Frontend Build (`next build`):** ✅ Passed (66 / 66 routes compiled)
- **Frontend Lint (`eslint`):** ✅ Passed (0 errors)
- **MongoDB Database:** ✅ Connected (`localhost:27017/sih25033`)
