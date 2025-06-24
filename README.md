# ERP-with-MFE 🧩

**Enterprise Resource Planning System** (ERP) สถาปัตยกรรมแบบ Micro Frontends และ Microservices รองรับการขยายตัวในระดับองค์กร พร้อมระบบ Event-driven เพื่อรองรับการประมวลผลแบบกระจาย

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
ระบบ backend ถูกออกแบบให้แยก concerns อย่างชัดเจนตามหลัก Clean Architecture และสื่อสารกันผ่าน Event ด้วย Kafka

| Tool / Library | Description |
|----------------|-------------|
| ⚡ Fastify      | High performance web framework |
| 🛢️ Prisma + PostgreSQL | ORM สำหรับ PostgreSQL |
| 🧠 Redis        | Caching layer |
| 📘 Swagger      | API documentation |
| 🔍 OpenTelemetry | Distributed tracing & observability |
| 📚 Event Sourcing | Log History ด้วยรูปแบบ Event |
| 📨 Kafka        | Event broker สำหรับระบบ event-driven |
| 🧪 Unit Testing | ใช้สำหรับ core service logic |

---

## 🧪 Testing Strategy

### ✅ Frontend
- **Unit Tests**: Component logic, utils, form validation
- **Integration Tests**: API mocking, page-level behavior

### ✅ Backend
- **Unit Tests**: Domain logic, use-cases, services

---

## 📦 Folder Structure (Sample)

```bash
erp-with-mfe/
├── apps/
│   ├── frontend-mfe-1/
│   ├── frontend-mfe-2/
│   └── backend-services/
│       ├── auth/
│       ├── inventory/
│       └── ...
├── libs/
│   ├── ui-components/
│   ├── hooks/
│   ├── utils/
│   └── shared-api/
├── packages/
│   ├── eslint-config/
│   ├── i18n/
│   └── types/
