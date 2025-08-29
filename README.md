<h1 style="text-align: center;">Frontend - WimBelemDon+</h1>

This repository hosts the code for the frontend of the WimBelemDon+ project. It is a minimal PWA designed to improve the user experience of the WimBelemDon platform collaborators.

<h2>Table of Contents</h2>

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
  - [With Docker](#with-docker)
  - [Without Docker](#without-docker)
- [Deployment](#deployment)
  - [With Docker](#with-docker-1)
  - [Without Docker](#without-docker-1)
- [Technologies](#technologies)
  - [Core Libraries](#core-libraries)
  - [State \& Data Management](#state--data-management)
  - [UI \& Styling](#ui--styling)
  - [Build \& Tooling](#build--tooling)

## Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

## Installation

1. Clone the repo
```sh
git clone https://github.com/AGES-WimBelemDon/frontend.git
```

2. Access the project directory
```sh
cd frontend
```

3. Verify and setup git credentials for the project

Remember to use your academic email

```sh
git config user.name "Your Name"
git config user.email your_email@example.com
```

4. Environment variables

This is a necessary step to ensure the application runs with the correct configuration.
Copy and rename the `.env.example` file to `.env` and update the values as needed.

```sh
cp .env.example .env # Linux-based
copy .env.example .env # Windows
```

## Development

### With Docker

To build and start the application, run:

```sh
docker compose up dev
```

Note: If changes are made to one of [`Dockerfile`, `docker-compose.yml`, `package.json`] files, you may need to run the above command ending with the `--build` flag in the end.

To stop the application, run:

```sh
docker compose down dev
```

### Without Docker

Using Node v22.18, run

```sh
npm install
npm run dev
```

## Deployment

The frontend is automatically deployed to GitHub Pages whenever code is pushed to the main branch, as specified on the [pages-deploy.yml file](.github/workflows/pages-deploy.yml).
The deployed site is available at https://ages-wimbelemdon.github.io/frontend/.

However, you can also run the app simulating the production environment locally.

### With Docker

You can simulate a production-ready container with Nginx:

```sh
docker compose up prod -d
```

The local deployment can be accessed at http://localhost:8080/frontend/

To stop the production container, run:

```sh
docker compose down prod
```

### Without Docker

Thanks to Vite, you can simulate a production-ready build with:

```sh
npm run build
```

Then run:

```sh
npm run preview
```

## Technologies

This project uses modern web development tools and libraries to build a performant PWA.

### Core Libraries
| Technology | Version | Purpose / Description |
|---|---|---|
| [React](https://reactjs.org/) | 19.1.1 | Core UI library for building components |
| [React DOM](https://react.dev/reference/react-dom) | 19.1.1 | Rendering React components to the DOM |
| [React Router](https://reactrouter.com/) | 7.8.0 | Declarative routing for single-page applications |
| [TypeScript](https://www.typescriptlang.org/) | 5.8.3 | Adds static typing to JavaScript |

### State & Data Management
| Technology | Version | Purpose / Description |
|---|---|---|
| [TanStack React Query](https://tanstack.com/query/latest/docs/framework/react/installation) | 5.84.2 | Data fetching, caching, and state management |
| [Axios](https://axios-http.com/) | 1.11.0 | HTTP client for API requests |
| [Firebase](https://firebase.google.com/) | 12.1.0 | Backend services used for authentication |

### UI & Styling
| Technology | Version | Purpose / Description |
|---|---|---|
| [MUI](https://mui.com/) | 7.3.1 | Material UI components and icons |
| [Emotion](https://emotion.sh/docs/introduction) | 11.14.x | Styled components and CSS-in-JS support |

### Build & Tooling
| Technology | Version | Purpose / Description |
|---|---|---|
| [Vite](https://vite.dev/) | 7.1.2 | Fast frontend bundler and development server |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | 5.0.0 | React plugin for Vite |
| [ESLint](https://eslint.org/) | 9.33.0 | Linting tool to enforce code quality and consistency |
| [Husky](https://typicode.github.io/husky/#/) | 9.1.7 | Git hooks to run tasks before committing |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | 1.0.2 | Adds PWA support: service workers, manifest, offline caching |
| [Cypress](https://www.cypress.io/) | 14.5.4 | End-to-end testing framework |
| [cypress-dotenv](https://www.npmjs.com/package/cypress-dotenv) | 3.0.1 | Loads environment variables into Cypress tests |

<!-- ## Screenshots (W.I.P) -->
