# Contributing to sanity-color-picker

First of all, thank you for considering contributing to `sanity-color-picker`! We welcome all contributions, from bug reports to new features!

## Getting Started

1. **Fork the repository** to your own GitHub account.
2. **Clone** your fork locally.
3. **Install dependencies** using npm:

```bash
npm install
```

## Development and Building

To build the plugin:

```bash
npm run build
```

To run tests:

```bash
npm run test
```

To format code:

```bash
npm run format
```

### Git Hooks (Lefthook)

We use `lefthook` to ensure code quality. It will automatically run tests and build checks before you push to the repository.

To manually run the pre-push checks:

```bash
npx lefthook run pre-push
```

## Creating a Pull Request

1. Create a descriptive branch describing your proposed changes: `git checkout -b feature/my-new-feature` or `git checkout -b fix/issue-name`.
2. Commit your changes.
3. Push to your branch on GitHub.
4. Open a Pull Request against the `main` branch of this repository.

Ensure that:

- You format the code using `npm run format`.
- Your code passes all tests with `npm run test`.
- Your code successfully builds with `npm run build`.
- You add clear instructions on how to test the changes.

### Continuous Integration (CI)

Every Pull Request is automatically tested via GitHub Actions across multiple Node.js versions. Please ensure the CI status is green before requesting a review.

## Bug Reports

If you encounter an issue, please open an issue and include:

- A clear description of the problem.
- Complete steps to securely reproduce the issue.
- Details regarding the environment, including your Sanity Studio version, React version, etc.

Thank you for contributing!
