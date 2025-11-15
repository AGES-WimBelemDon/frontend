<h1 style="text-align: center;">Frontend - WimBelemDon+</h1>

This repository hosts the code for the frontend of the WimBelemDon+ project. It is a minimal PWA designed to improve the user experience of the WimBelemDon platform collaborators.

## About

WimBelemDon+ is a comprehensive educational management system that helps organize activities, track attendance, and manage student information.

### Key Features
- **Attendance Management**: Digital attendance tracking for activities and classes
- **Student Registration**: Comprehensive student enrollment and profile management  
- **Activity Organization**: Scheduling and management of educational activities
- **User Management**: Role-based access control for different user types
- **Progressive Web App**: Installable, works offline, native app-like experience
- **Multi-language Support**: Portuguese (primary) and English

**Live Application**: https://ages-wimbelemdon.github.io/frontend/

## How to Run

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) OR [Node.js v22.18+](https://nodejs.org/)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/AGES-WimBelemDon/frontend.git
cd frontend
```

2. **Setup environment**
```bash
cp .env.example .env.production
# Edit .env.production with your configuration if needed
```

3. **Run the application**

#### Option A: With Docker (Recommended)
```bash
docker compose up prod
```
Access at: http://localhost:8080/frontend/

#### Option B: With Node.js
```bash
npm install
npm run build
npm run preview
```
Access at: http://localhost:4173/frontend/

### Environment Configuration

The application requires these environment variables in your `.env` file:
- `VITE_API_URL` - Backend API URL
- `VITE_API_VERSION` - API version (e.g., v1)
- `VITE_FIREBASE_*` - Firebase authentication configuration

> **For Development**: See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development setup, code guidelines, and contribution instructions.

## Technologies

Built with modern web technologies for optimal performance:

- **Frontend**: React 19.1, TypeScript 5.8, Material-UI 7.3
- **Build Tool**: Vite 7.1 with PWA support
- **State Management**: TanStack React Query 5.8
- **Authentication**: Firebase 12.1 (Google OAuth)
- **Testing**: Cypress 14.5 (E2E)
- **Deployment**: GitHub Pages with automated CI/CD

<!-- ## Screenshots (W.I.P) -->
