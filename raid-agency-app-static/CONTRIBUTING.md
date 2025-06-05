# Contributing to RAiD Agency Static App

Thank you for your interest in contributing to the RAiD Agency Static App! This document provides guidelines and information for developers who want to contribute to the project.

## Getting Started

1. Clone the repository
2. Create a `.env` file with the required environment variables (see README.md)
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

## Development Environment

### Prerequisites

- Node.js (14.x or later)
- npm or yarn
- Git

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
IAM_ENDPOINT=<auth endpoint URL>
API_ENDPOINT=<API endpoint URL>
IAM_CLIENT_ID=<client ID>
IAM_CLIENT_SECRET=<client secret>
RAID_ENV=<environment name>
```

## Development Workflow

### Directory Structure

The project follows the Astro framework structure with some additional directories:

- `src/components/raid-components/`: Components specific to RAiD data display
- `src/generated/raid/`: TypeScript interfaces for RAiD data models
- `src/mapping/data/`: Mapping files for codes and identifiers
- `src/utils/`: Utility functions

### Component Development

When developing or modifying components:

1. Follow the existing component structure and naming conventions
2. Ensure components are typed correctly with TypeScript
3. Keep components focused on a single responsibility
4. Use Tailwind CSS for styling
5. Test components with various data scenarios

### Adding New Features

When adding new features:

1. Create components in the appropriate directory
2. Update TypeScript interfaces if needed
3. Add routes in the appropriate location
4. Update documentation if necessary

## Code Style and Standards

### TypeScript

- Use TypeScript for all new code
- Properly type all variables, function parameters, and return values
- Use interfaces to define data structures

### Component Style

- Follow the existing component structure
- Use Astro `.astro` files for components
- Use Tailwind CSS for styling
- Keep components small and focused

### Naming Conventions

- Use kebab-case for file names (e.g., `my-component.astro`)
- Use camelCase for variables and functions
- Use PascalCase for TypeScript interfaces and types

## Testing

Test your changes thoroughly:

1. Run the development server with `npm run dev`
2. Check that your changes work correctly
3. Test with different data scenarios
4. Verify that your changes don't break existing functionality

## Pull Request Process

1. Create a feature branch with a descriptive name
2. Make your changes
3. Test thoroughly
4. Commit your changes with a clear commit message
5. Push your changes to your fork
6. Create a pull request to the main repository
7. Provide a clear description of your changes in the pull request

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RAiD Documentation](https://www.raid.org.au/)
