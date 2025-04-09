# RAiD Agency Application

The RAiD Agency Application is a React-based web application for managing Research Activity Identifiers (RAiDs). This application allows users to create, view, edit, and manage RAiDs through an intuitive user interface.

## Overview

The RAiD Agency Application provides a comprehensive interface for researchers and administrators to:

- Create and mint new RAiDs
- Edit existing RAiD metadata
- View RAiD history and changes
- Manage service points
- Collaborate with other contributors
- Handle organization lookups and integrations

## Prerequisites

- Node.js (version 16 or higher)
- npm (version 8 or higher)
- Access to a Keycloak authentication server

## Getting Started

### First steps

1. Clone the repository
2. Create `.env` file from `.env.template`
3. Adapt values in `.env` to match your infrastructure:
   - `VITE_RAID_API_URL`: The URL for your RAiD API
   - `VITE_KEYCLOAK_URL`: Your Keycloak server URL
   - `VITE_KEYCLOAK_REALM`: Your Keycloak realm
   - `VITE_KEYCLOAK_CLIENT_ID`: Your Keycloak client ID

### Install dependencies

```bash
npm install
```

### Development Server

Start the development server with:

```bash
npm run dev
```

This will start the application in development mode and open it in your default browser at `http://localhost:3000`.

### Build for Production

Build the application for production:

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## Testing

Run tests with:

```bash
npm run test
```

End-to-end tests can be run with:

```bash
npm run test:e2e
```

## Project Structure

- `src/`: Source code
  - `components/`: Reusable UI components
  - `contexts/`: React contexts for state management
  - `entities/`: Entity-specific components and logic
  - `generated/`: Generated TypeScript interfaces
  - `keycloak/`: Authentication logic
  - `pages/`: Page components
  - `references/`: Reference data
  - `services/`: API services
  - `utils/`: Utility functions

## Authentication

The application uses Keycloak for authentication and authorization. Users can log in with:

- Username/password
- ORCID OAuth

## Key Features

- **Service Point Management**: Create and manage service points
- **RAID Creation**: Mint new RAIDs with comprehensive metadata
- **RAID Management**: View, edit, and track RAIDs
- **Collaboration**: Invite others to contribute to RAIDs
- **Organization Integration**: Look up organizations using ROR identifiers

## API Documentation

API documentation is available in the [postman/api-documentation.md](postman/api-documentation.md) file.

## License

This project is licensed under the [Apache 2.0 License](https://github.com/au-research/raid-au?tab=Apache-2.0-1-ov-file#readme).
