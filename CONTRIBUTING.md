<h1 style="text-align: center;">Contributing to WimBelemDon+ Frontend</h1>

Thank you for your contribution! This guide is organized by importance for developers getting started quickly.

> **New to the project?** See [README.md](README.md) for project overview and basic setup.

<h2>Table of Contents</h2>

## Getting Started
- [Development Setup](#development-setup)
- [Available Scripts](#available-scripts)
- [Environment Setup and Configuration](#environment-setup-and-configuration)

## Development Guidelines  
- [Architecture and Development Guidelines](#architecture-and-development-guidelines)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Requests](#pull-requests)

## Technical Specifications
- [Localization and UI Text Management](#localization-and-ui-text-management)
- [Error Handling Patterns](#error-handling-patterns)
- [Accessibility Guidelines](#accessibility-guidelines)
- [API Integration Guide](#api-integration-guide)
- [Testing (E2E)](#testing-e2e)

---

## Development Setup

### Quick Development Start

#### With Docker
```bash
./scripts/dev-setup.sh # Must be run in a Unix-based terminal (Git Bash, WSL, macOS, Linux)
docker compose up dev
```
Access at: http://localhost:5173/frontend/

#### Without Docker
```bash
npm install
npm run dev
```
Access at: http://localhost:5173/frontend/

### Development vs Production Builds

#### Development Mode
- **Hot Module Replacement (HMR)** for instant updates
- **Source maps** for debugging  
- **Mock data fallbacks** when API is unavailable
- **Development-only routes** (e.g., `/tech-demo`)

#### Production Mode  
- **Code splitting** and tree shaking for optimal bundle size
- **Asset optimization** (images, fonts, etc.)
- **PWA features** enabled (service worker, manifest, offline caching)
- **Environment-specific configurations**

### Detailed Setup Instructions

#### With Docker
This project provides a helper script that handles everything for you, even if you don't have Node installed.

After cloning the repository, run (on a Unix-based terminal like Git Bash or WSL on Windows, or the default terminal on macOS/Linux):

```sh
./scripts/dev-setup.sh
```

This script will:
1. Set up Git hooks so that pre-commit and pre-push verifications are in place
2. Copy `node_modules` folder from the Docker container to the host machine

**Important**: If changes are made to [`Dockerfile`, `docker-compose.yml`, `package.json`] files, you need to update your local `node_modules`:

1. Docker setup (on a Unix-based terminal):
```sh
./scripts/setup_node_docker.sh
```

2. Rebuild the Docker image:
```sh
docker compose up dev --build
```

#### Without Docker
Using Node v22.18:
```sh
npm install
npm run dev
```

## Environment Setup and Configuration

### Git Configuration

Configure your Git credentials for the project:

```sh
git config user.name "Your Name"
git config user.email your_email@example.com
```

**Important**: Use your academic email address to ensure proper attribution and access to academic resources. This email will be checked on commit and pull requests.

### Required Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

#### API Configuration
- `VITE_API_URL` - Backend API base URL (e.g., `http://localhost:3000`)

#### Firebase Authentication
- `VITE_FIREBASE_API_KEY` - Firebase project API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain (e.g., `project-id.firebaseapp.com`)
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID

#### Testing Configuration
- `CYPRESS_BASE_URL` - Base URL for E2E tests (e.g., `http://localhost:5173/frontend`)
- `CYPRESS_USE_MOCK_API_DATA` - Whether to use mock data in tests (`true`/`false`)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run lint:fix` | Run ESLint and auto-fix some issues |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run Cypress E2E tests |

### Debugging Tips

- **React DevTools**: Install browser extension for component inspection
- **Cypress**: Use `cy.debug()` and `cy.pause()` for test debugging
- **Browser DevTools**: Press `F12` to open DevTools and find following tools:
- **Network Tab**: Monitor API calls and response times
- **Lighthouse**: Audit performance, accessibility, SEO, and PWA features

## Environment Setup and Configuration

We use **kebab-case** for branch names. Prefix branches according to the type of work:

| Type     | Prefix     | Example                     |
|----------|------------|-----------------------------|
| Feature  | `feature/` | `feature/add-login-button`  |
| Bugfix   | `fix/`     | `fix/fix-login-error`       |
| Chore    | `chore/`   | `chore/update-dependencies` |
| Test     | `test/`    | `test/add-login-tests`      |
| Docs     | `docs/`    | `docs/update-readme`        |
| CI       | `ci/`      | `ci/setup-ci-pipeline`      |
| Perf     | `perf/`    | `perf/improve-load-time`    |
| Refactor | `refactor/`| `refactor/cleanup-code`     |
| Build    | `build/`   | `build/update-packages`     |

> No spaces or special characters in branch names.

## Commit Message Guidelines

We follow **Conventional Commits**:

```
<type>(<scope>): <subject> (#<task-id>)
```

- **type**: `feat`, `fix`, `chore`, `test`, `docs`, `ci`, `perf`, `refactor`, `build`
- **scope**: optional, e.g., module or feature
- **subject**: short description, lowercase, no period at the end

**Examples:**

* feat(auth): add login via Google OAuth
* fix(ui): correct button alignment on homepage
* chore(deps): upgrade react to 19.0.1
* test(auth): add unit tests for login
* docs(readme): update setup instructions
* ci(pipeline): add linting step
* perf(api): cache responses to reduce load times
* refactor(ui): simplified conditional rendering
* build(webpack): update configuration for production

Use imperative instead of past tense

If present, add the task id to the end of the commit title
ex: feat(auth): add login via Google OAuth (#123)

## Pull Requests

- Ensure your branch is up-to-date with the `develop` branch before opening a pull request.
- Keep an eye on the CI/CD pipeline for any issues.
- If there is a conflict preventing the merge, please resolve it locally and update your branch.
- Always open pull requests against the `develop` branch.
- Always assign yourself to the PR.
- Assign at least one other team member as a reviewer.
- Include a clear description of your changes, following the provided template.

## Accessibility

Building accessible and testable components is essential for long-term project quality.  
Accessible components ensure that people with disabilities — and keyboard or screen reader users — can use our application.

> *Accessibility: essential for some, useful for all*

Every new or updated UI component must follow these rules:

1. **Semantic HTML**: Use semantic HTML elements (e.g., `<header>`, `<main>`, `<footer>`, `<button>`, etc.) to convey meaning and structure.
   1. As we are using MUI, prefer MUI components over raw HTML elements, as they come with built-in accessibility features.
   2. On these cases, ensure to use the `component` prop to set the correct semantic element when necessary.
2. **ARIA Roles**: Use ARIA roles and attributes to enhance accessibility.
   1. For interactive elements ensure they have the appropriate attributes:
      1. `aria-pressed` for toggle buttons
      2. `aria-label` or `aria-labelledby` for descriptive labels
      3. `role` (e.g., `button`, `link`) when not using semantic HTML elements.
3. **Keyboard Navigation**: Ensure all interactive elements are keyboard-navigable and have visible focus states.
   1. Use `tabIndex` to manage focus order when necessary.
   2. Use `:focus` styles to indicate focus on interactive element if not provided by default.
4. **Decorative Icons**: Use `aria-hidden="true"` on decorative icons to prevent them from being announced by screen readers.
5. **Color Contrast**: Maintain a minimum color contrast ratio of 4.5:1 for text and interactive elements. This should not be an issue when using MUI themes, but always double-check:
   1. Avoid using color as the only means of conveying information.
   2. In addition to `opacity`, add `aria-disabled="true"` on disabled elements.
   3. Using MUI themes usually ensures compliance, but always double-check when custom colors are applied.
6. **Alt Text**: Provide descriptive alt text for all images and non-text content.
   1. If the image is purely decorative, use an empty `alt` attribute (e.g., `alt=""`).
   2. If the image conveys information, ensure the `alt` text accurately describes the content or function of the image.
   3. When adding an image, review it in the UI to confirm the alt text makes sense in context.
7. **Form Labels**: Ensure all form elements have associated labels.

### Testing Accessibility

- Use tools like [Chrome's Lighthouse](https://developers.google.com/web/tools/lighthouse) to test accessibility.
- Perform manual testing with keyboard navigation and/or screen readers to ensure usability.
- Incorporate accessibility testing into your development workflow to catch issues early.
- Use the `eslint-plugin-jsx-a11y` plugin to catch common accessibility issues in JSX.

### More Resources

- [W3C Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/fundamentals)

## Testing (E2E)

Testable components ensure that our automated tests are stable, easy to write, and resilient to UI changes. We use Cypress for E2E testing. To make selectors reliable and resilient to UI changes, all interactive elements must include a data-cy attribute.

Every new or updated UI component must follow these rules:

1. **Data Attributes**: Use `data-cy` attributes on interactive elements to facilitate selection in end-to-end tests.
   1. Use a consistent naming convention for `data-cy` attributes, such as `data-cy="component-name-element-name"`.
   2. Avoid using dynamic values (e.g., IDs or classes that may change) for `data-cy` attributes.

## Secrets and Configuration

- Keep sensitive information, such as API keys and passwords, out of your code.
- Always double-check your changes for any exposed secrets before committing.
- Use environment variables or configuration files to manage secrets.
- Document any required environment variables in the appropriate file.

## Language

All code, comments, commit messages, documentation, and any other texts (non UI) **must be** written in English.
The only exception being PR description and comments, which can be written in Portuguese as that follows the project's language guidelines.

## Architecture and Development Guidelines

### Integration Flow Pattern

Our frontend follows a consistent architectural pattern for data flow and state management:

```
UI Component → "HTML" for user interface only
↓
Page Hook → Local State Management
↓
Global Hook → React Query Caching
↓
Service → API Communication
↓
API -> HTTP Client
```

### Data Flow Example: Students Page

1. **`Students/index.tsx`** - UI component that renders the page
2. **`Students/hook.ts`** - Page-specific logic (navigation, local state, form handling)
3. **`hooks/useStudents.ts`** - Global data fetching and caching with React Query
4. **`services/students.ts`** - API calls and data transformation
5. **`services/api.ts`** - HTTP client configuration and interceptors

### Page Creation Pattern

When creating a new page, follow this structure:

1. **Create page component**: `src/pages/[PageName]/index.tsx`
2. **Create page hook**: `src/pages/[PageName]/hook.ts` (named `use[PageName]Page()`)
3. **Use existing global hooks**: Import from `src/hooks/`
4. **Create new services if needed**: Add to `src/services/` if new data sources are required

### Hook Responsibilities

#### Page Hooks (`pages/*/hook.ts`)
- Page-specific state management (filters, form state, UI state)
- Navigation logic and route handling
- Form submission and validation logic
- UI interaction handlers (button clicks, modals)

#### Global Hooks (`hooks/*.ts`)
- Data fetching with React Query
- Global state management and caching
- Reusable business logic across multiple pages
- API integration and error handling

#### Service Layer (`services/*.ts`)
- HTTP API communication
- Data transformation and mapping
- Mock data for development environment
- Type definitions for API responses

### Naming Conventions

- **Page hooks**: `use[PageName]Page()` (e.g., `useStudentsPage()`, `useClassesPage()`)
- **Global hooks**: `use[Entity]()` (e.g., `useStudents()`, `useActivities()`)
- **Service files**: `[entity].ts` (e.g., `students.ts`, `activities.ts`)
- **Page components**: `[PageName]/index.tsx` with default export

### TypeScript Guidelines

#### Type vs Interface Usage

- **Use `type` for data models and domain entities** (always singular):
  ```typescript
  export type Student = {
    id: string;
    fullName: string;
    // ...
  }
  
  export type Activity = {
    id: string;
    name: string;
    // ...
  }
  ```

- **Use `interface` for component props and parameters**:
  ```typescript
  interface TextCardProps {
    title: string;
    theme: ThemeStyle;
    onClick?: () => void;
  }
  
  interface ActivityCardProps { 
    content: Activity; // References the singular type
  }
  ```

#### Singular vs Plural Convention

- **Types are always singular**: `Student`, `Activity`, `User` (representing the shape of one entity)
- **Variables, functions, and collections are plural**: `students`, `activities`, `users`
- **Hooks and services use plural**: `useStudents()`, `getStudents()`, `students.ts`

### State Management Guidelines

- **Local UI state**: Use `useState` in page hooks
- **Server state**: Use React Query in global hooks
- **Form state**: Handle in page hooks, submit via services
- **Navigation**: Use `useRoutes` hook for consistent routing

### Mock Data Strategy

The application uses a fallback mock data strategy in services:

- **Development**: API calls fall back to mock data when backend is unavailable
- **Production**: Mock data serves as temporary fallback (should be removed in production)
- **Testing**: Controlled via `CYPRESS_USE_MOCK_API_DATA` environment variable

When adding new API endpoints:
1. Add real API call first
2. Add mock data in `catch` block with TODO comment
3. Ensure mock data structure matches API response

### Context Architecture

The application uses React Context for global state:

- **AuthProvider**: Firebase authentication state and user management
- **SidebarProvider**: Sidebar visibility and responsive behavior  
- **ToastProvider**: Global toast notifications across the app

These contexts wrap the entire application in `App.tsx` and are accessed via corresponding hooks (`useAuth`, `useSidebar`, `useToast`).

### Firebase Setup

Firebase is used for user authentication via Google OAuth. The application can run without Firebase configuration in development mode, but authentication features will be disabled.

#### Creating Firebase Project

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/)
2. **Enable Authentication** with Google provider:
   - Go to Authentication > Sign-in method
   - Enable Google provider
   - Configure OAuth consent screen
3. **Get your configuration** from Project Settings > General > Your apps
4. **Copy configuration values** to your `.env` file

#### Required Environment Variables

All Firebase variables must start with `VITE_` to be available in the frontend build:

```bash
# Firebase Configuration (required for authentication)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com  
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

#### Development vs Production

- **Development**: Authentication is optional - the app provides fallback UI and mock data
- **Production**: All Firebase variables must be configured for authentication to work
- **GitHub Actions**: Configure Firebase variables as repository secrets for deployment

#### Authentication Flow

The app uses `AuthContext` and `AuthProvider` for state management:
- Login redirects users to Google OAuth
- User state persists across browser sessions
- Graceful fallback when authentication fails
- Protected routes redirect unauthenticated users

### Development vs Production Differences

- **TechDemo page**: Only available in development (`import.meta.env.DEV`)
- **Mock data**: Fallback behavior in development, should be removed in production
- **Firebase**: Can run without Firebase in development mode
- **Routing**: Uses `/frontend/` base path for GitHub Pages deployment

## Localization and UI Text Management

### Using the Strings Object

**Always use the `strings` object for UI text** - never hardcode text directly in components:

```typescript
// Correct
import { strings } from "../../constants";

<Typography>{strings.home.welcomeBack}</Typography>
<Button>{strings.buttons.save}</Button>

// Incorrect
<Typography>Bem-Vindo</Typography>
<Button>Save</Button>
```

### Adding New Text

1. **Add to Portuguese first** (primary language) in `src/constants/portuguese.ts`
2. **Add corresponding English text** in `src/constants/english.ts` 
3. **Use the same key structure** in both files

```typescript
// portuguese.ts
export const portugueseTextMap = {
  newFeature: {
    title: "Nova Funcionalidade",
    description: "Descrição da funcionalidade",
  },
} as const;

// english.ts  
export const englishTextMap = {
  newFeature: {
    title: "New Feature",
    description: "Feature description",
  },
} as const;
```

### Dynamic Text with Parameters

Use functions for dynamic text that requires parameters:

```typescript
// In constants file
welcome: ({ name }: Params<"name">) => `Bem-vindo, ${name}!`,

// In component
<Typography>{strings.home.welcome({ name: user.name })}</Typography>
```

### Language Switching

The application automatically:
- Detects browser language (Portuguese or English)
- Falls back to Portuguese as default
- Saves user preference in localStorage
- Uses `getUserLocale()` and `setUserLocale()` functions

## Error Handling Patterns

### Service Layer Error Handling

Always implement proper error handling in services with fallback to mock data:

```typescript
export async function getUsers(): Promise<User[]> {
  try {
    const response = await api.get<User[]>(endpoints.users);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    // TODO: Remove mock data in production
    return mockUsers; // Fallback for development
  }
}
```

### Component Error Handling

Handle loading and error states in components:

```typescript
function UsersPage() {
  const { users, isLoadingUsers, usersError } = useUsers();

  if (isLoadingUsers) {
    return <CircularProgress />;
  }

  if (usersError) {
    return <Typography color="error">{strings.users.errorMessage}</Typography>;
  }

  return (
    <div>
      {users?.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}
```

### Toast Notifications for User Feedback

Use the toast system for user feedback on actions:

```typescript
const { showToast } = useToast();

try {
  await saveData();
  showToast(strings.success.dataSaved, "success");
} catch {
  showToast(strings.errors.saveFailed, "error");
}
```

## Accessibility Guidelines

### Required Accessibility Practices

1. **Semantic HTML**: Use proper HTML elements (`<button>`, `<nav>`, `<main>`, etc.)

2. **ARIA Labels**: Provide descriptive labels for screen readers
   ```tsx
   <Button aria-label={strings.navigation.openMenu}>
     <MenuIcon />
   </Button>
   ```

3. **Alt Text**: All images must have descriptive alt text
   ```tsx
   <img src={logo} alt={strings.common.logoAlt} />
   ```

4. **Form Labels**: Every form input must have an associated label
   ```tsx
   <TextField 
     label={strings.forms.email}
     required
     aria-describedby="email-helper"
   />
   ```

5. **Color Contrast**: Ensure sufficient contrast ratios (use MUI theme colors)

6. **Keyboard Navigation**: All interactive elements must be keyboard accessible

### Testing Accessibility

- Use `data-cy` attributes for E2E testing (not accessibility selectors)
- Test with keyboard navigation (Tab, Enter, Space, Arrow keys)
- Use Chrome Lighthouse accessibility audit
- Test with screen readers when possible

### MUI Accessibility Features

Leverage MUI's built-in accessibility features:
- Use `Typography` with proper variant hierarchy
- Use `FormControl` and `FormLabel` for form grouping
- Use `Tooltip` for additional context

## API Integration Guide

### Adding a New API Endpoint

1. **Add endpoint to `services/api.ts`**:
   ```typescript
   const endpoints = {
     // existing endpoints...
     newEntity: "/new-entity",
   }
   ```

2. **Create service function** in appropriate service file:
   ```typescript
   export async function getNewEntity(): Promise<NewEntity[]> {
     try {
       const response = await api.get<NewEntity[]>(endpoints.newEntity);
       return response.data;
     } catch (error) {
       console.error("Failed to fetch new entity:", error);
       // TODO: Remove in production
       return mockNewEntityData;
     }
   }
   ```

3. **Create global hook** in `hooks/`:
   ```typescript
   export function useNewEntity() {
     const { isPending, error, data } = useQuery({
       queryKey: ["newEntity"],
       queryFn: getNewEntity,
     });

     return {
       isLoadingNewEntity: isPending,
       newEntityError: error,
       newEntity: data,
     };
   }
   ```

4. **Use in page hook** for page-specific logic:
   ```typescript
   export function useNewEntityPage() {
     const { newEntity, isLoadingNewEntity, newEntityError } = useNewEntity();
     const { goTo } = useRoutes();

     return {
       newEntity,
       isLoadingNewEntity,
       newEntityError,
       handleCreate: () => goTo('/new-entity/create'),
     };
   }
   ```

### API Error Handling

- Always include proper error logging
- Provide user-friendly error messages using strings
- Implement loading states
- Use React Query for caching and background updates

### Authentication

API calls automatically include Firebase auth tokens via axios interceptors in `services/api.ts`.

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

## Thank You

Thank you for taking the time to contribute to our project! Your efforts are greatly appreciated.
