<h1 style="text-align: center;">Contributing to WimBelemDon+ Frontend</h1>

Thank you for your contribution! This document outlines our guidelines for branch names, commit messages, pull requests and others.

<h2>Table of Contents</h2>

- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Requests](#pull-requests)
- [Accessibility](#accessibility)
  - [Testing Accessibility](#testing-accessibility)
  - [More Resources](#more-resources)
- [Testing (E2E)](#testing-e2e)
- [Secrets and Configuration](#secrets-and-configuration)
- [Language](#language)
- [Thank You](#thank-you)

## Branch Naming Conventions

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

## Thank You

Thank you for taking the time to contribute to our project! Your efforts are greatly appreciated.
