# ERP-with-MFE 🧩

**Enterprise Resource Planning System** (ERP) สถาปัตยกรรมแบบ Micro Frontends 

---

## 🏗️ Architecture Overview

### Frontend — Micro Frontends
แยกแต่ละโมดูลเป็นอิสระด้วย Micro Frontend (MFE) โดยใช้ React และสถาปัตยกรรมแบบ State-first เพื่อการพัฒนาแบบ async และ scalable UI

| Tool / Library | Description |
|----------------|-------------|
| ⚛️ React        | JavaScript UI Library |
| 🧠 Zustand      | Lightweight state management |
| 🔄 React Query  | Server state management (data fetching, caching, syncing) |
| 📦 Ant Design / DaisyUI | UI component library (เลือกใช้ตามบริบท) |
| 📝 React Hook Form | Simplified form handling and validation |
| 🌍 i18next     | Internationalization (i18n) |
| 🧪 Testing      | Unit Testing & Integration Testing (API, mocks) |

---

### Backend — Clean Architecture + Microservices + Event-driven
ระบบ backend ยังเป็นระบบแบบ monolith อยู่

| Tool / Library | Description |
|----------------|-------------|
| ⚡ Fastify      | High performance web framework |
| 🛢️ Prisma + MySQL | ORM สำหรับ MySQL |
| 📘 Swagger      | API documentation | 

---

## 🧪 Testing Strategy

### ✅ Frontend
- **Unit Tests**: Component logic, utils, form validation
- **Integration Tests**: API mocking, page-level behavior

### ✅ Backend
- **Unit Tests**: Domain logic, use-cases, services

---
