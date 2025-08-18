<h1 style="text-align: center;">Frontend - WimBelemDon+</h1>

This repository hosts the code for the frontend of the WimBelemDon+ project. It is a minimal PWA designed to improve the user experience of the WimBelemDon platform collaborators.

<h2>Table of Contents</h2>

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
    - [With Docker (recommended)](#with-docker-recommended)
    - [Without Docker](#without-docker)
- [Technologies](#technologies)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

### Installation

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

Copy and rename the `.env.example` file to `.env` and update the values as needed.
This is a necessary step to ensure the application runs with the correct configuration.

### Development

#### With Docker (recommended)

To build and start the application, run:

```sh
docker compose up dev
```

To stop the application, run:

```sh
docker compose down dev
```

#### Without Docker

Using Node v22.18, run

```sh
npm install
npm run dev
```

## Technologies

Technology | Version | Description
--- | --- | ---
[React](https://reactjs.org/) | 19.1.1 | The core library
[Node](https://nodejs.org/) | 22.18.0 | JavaScript runtime
[React Router](https://reactrouter.com/) | 7.8.0 | Declarative routing for React.js
[TanStack React Query](https://tanstack.com/query/latest/docs/framework/react/installation) | 5.84.2 | Powerful data fetching and state management
[Vite](https://vitejs.dev/) | 7.1.2 | Frontend bundler
[TypeScript](https://www.typescriptlang.org/) | 5.8.3 | Typed JavaScript
[ESLint](https://eslint.org/) | 9.33.0 | Find and fix problems and inconsistencies in the code
[Husky](https://typicode.github.io/husky/#/) | 9.1.7 | Checks for errors before committing changes
[SASS](https://sass-lang.com/install) | 1.90.0 | CSS with superpowers
[vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/) | 1.0.2 | Allows for features such as installability

<!-- ## Screenshots (W.I.P) -->
