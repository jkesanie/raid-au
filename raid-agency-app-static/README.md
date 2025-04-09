# RAiD Agency Static App

A static website for displaying RAiD (Research Activity Identifier) records using Astro, TypeScript, and Tailwind CSS.

## 🚀 Overview

The RAiD Agency Static App is a web application that fetches, processes, and displays Research Activity Identifier (RAiD) data. It provides a user-friendly interface for exploring RAiD records, their metadata, and relationships between research activities.

## 📋 Project Structure

```text
/
├── public/                 # Static assets
├── scripts/                # Data fetching scripts
│   ├── fetch-raids.sh      # Fetches RAiD data from API
│   └── fetch-handles.sh    # Fetches handles from various environments
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── raid-components/ # Components for RAiD data display
│   │   │   ├── access.astro
│   │   │   ├── contributors.astro
│   │   │   ├── descriptions.astro
│   │   │   └── ...
│   │   └── ...
│   ├── generated/          # TypeScript interfaces (OpenAPI generated)
│   │   └── raid/           # RAiD data models
│   ├── layouts/            # Page layouts
│   ├── mapping/            # Data mapping configurations
│   ├── pages/              # Page routes
│   │   ├── api/            # API endpoints
│   │   ├── prefixes/       # Prefix listing pages
│   │   ├── raids/          # RAiD listing and detail pages
│   │   │   └── [prefix]/   # Dynamic routes for RAiD prefixes
│   │   │       └── [suffix].astro # Individual RAiD page
│   │   └── index.astro     # Home page
│   ├── raw-data/           # Raw JSON data from API
│   ├── services/           # Data services
│   └── utils/              # Utility functions
└── package.json
```

## 🛣️ Routes

| Route                     | Description                                       |
| :------------------------ | :------------------------------------------------ |
| `/`                       | Home page with overview statistics                |
| `/raids`                  | Lists all available RAiDs                         |
| `/raids/[prefix]`         | Lists RAiDs for a specific prefix                 |
| `/raids/[prefix]/[suffix]` | Detail page for a specific RAiD                  |
| `/prefixes`               | Lists all available prefixes                      |
| `/api/raids.json`         | JSON API endpoint for RAiD data                   |
| `/api/handles.json`       | JSON API endpoint for handle data                 |
| `/api/all-handles.json`   | Combined handles from multiple environments       |
| `/api/diff.json`          | Differences between current and previous data     |
| `/api/raid-files-list.json` | List of available RAiD files                    |

## 📦 Data Flow

1. **Data Acquisition**:
   - `scripts/fetch-raids.sh` authenticates with the IAM endpoint and fetches RAiD data from the API
   - `scripts/fetch-handles.sh` fetches handles from various environments (prod, stage, demo, test)
   - Data is stored in `src/raw-data/`

2. **Build Process**:
   - The `predev` and `prebuild` scripts run the data fetching scripts
   - Astro processes the data to generate static pages during build

3. **Component Rendering**:
   - Each RAiD is displayed using specialized components in `src/components/raid-components/`
   - The components render different aspects of a RAiD (titles, contributors, etc.)

## 🛠️ Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run scripts`         | Fetches latest RAiD data                         |
| `npm run dev`             | Starts local dev server at `localhost:4321` (runs scripts first) |
| `npm run build`           | Build production site to `./dist/` (runs scripts first) |
| `npm run preview`         | Preview your build locally                       |

## 🔐 Environment Setup

The application requires the following environment variables:

```
IAM_ENDPOINT=<auth endpoint URL>
API_ENDPOINT=<API endpoint URL>
IAM_CLIENT_ID=<client ID>
IAM_CLIENT_SECRET=<client secret>
RAID_ENV=<environment name>
```

Create a `.env` file in the project root with these variables.

## 💻 Development Workflow

1. Clone the repository
2. Set up environment variables in a `.env` file
3. Install dependencies with `npm install`
4. Run the development server with `npm run dev`
5. Make changes to components, pages, or styles
6. Build for production with `npm run build`

## 🌐 API Endpoints

The application provides several API endpoints under `/api/`:

- `/api/raids.json`: Returns all RAiD data
- `/api/handles.json`: Returns all RAiD handles from current environment
- `/api/all-handles.json`: Returns handles from all environments
- `/api/diff.json`: Returns differences between current and previous data
- `/api/raid-files-list.json`: Returns a list of available RAiD files

## 🧩 Component Structure

The `raid-components` directory contains specialized components that each render a specific aspect of a RAiD record:

- `access.astro`: Renders access information (type, statements, etc.)
- `alternate-identifiers.astro`: Displays alternative identifiers for the RAiD
- `contributors.astro`: Shows people who contributed to the research activity
- `contributor-roles.astro`: Displays the roles of contributors
- `dates.astro`: Shows important dates related to the research activity
- `descriptions.astro`: Renders descriptions of the research activity
- `organisations.astro`: Shows organizations associated with the research activity
- `related-objects.astro`: Displays objects related to the research activity
- `related-raids.astro`: Shows relationships between RAiDs
- `titles.astro`: Renders titles of the research activity

Each component follows a consistent pattern to extract and display its specific data from the RAiD object.

## 📊 Data Models and API Integration

TypeScript interfaces in `src/generated/raid/` are generated from OpenAPI specifications and define the structure of RAiD data. Key models include:

- `RaidDto.ts`: The main RAiD data object
- `Access.ts`: Access information 
- `Contributor.ts`: Contributor information
- `Organisation.ts`: Organization information
- `RelatedObject.ts`: Related object data
- `RelatedRaid.ts`: Related RAiD data

### Authentication Flow

The application uses OAuth client credentials flow to access the RAiD API:

1. `fetch-raids.sh` authenticates with the IAM endpoint to obtain a bearer token
2. This token is used in subsequent API requests to authorize access
3. The API version is specified via the `X-Raid-Api-Version` header

To update the generated TypeScript interfaces:

1. Update the OpenAPI schema if needed
2. Run the OpenAPI generator to regenerate interfaces
3. Update components if the data structure changes

## 🗺️ Data Mapping

The application uses mapping files in the `src/mapping/data/` directory to translate codes and identifiers into human-readable values:

- `general-mapping.json`: Maps general codes to display values
- `language.json`: Maps language codes to language names
- `subject-mapping.json`: Maps subject codes to subject names

Understanding these mappings is crucial for maintaining and extending the display components.

## 🚢 Deployment

### Production Build

To build for production:

1. Ensure environment variables are correctly set in `.env`
2. Run `npm run build` to generate static files
3. Deploy the contents of the `dist/` directory to your web server

### Continuous Integration

For CI/CD setup:

1. Include the required environment variables in your CI environment
2. Configure your CI pipeline to run `npm run build` 
3. Deploy the `dist/` directory to your hosting environment

## 🧪 Testing

While no formal testing framework is implemented, you can validate data processing by:

1. Checking the console output during build
2. Reviewing the generated static files
3. Comparing API responses with rendered components

## 🤝 Contribution Guidelines

### Code Style

- Follow the existing code style throughout the project
- Use TypeScript types for all variables and function parameters
- Keep components focused on a single responsibility

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Test locally by running `npm run dev`
4. Create a pull request with a clear description of your changes

## 📚 Resources

- [Astro Documentation](https://docs.astro.build)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [RAiD Documentation](https://www.raid.org.au/)

## 📖 Additional Documentation

For more detailed technical documentation and contribution guidelines, see:

- [DOCUMENTATION.md](./DOCUMENTATION.md) - Detailed technical documentation
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guidelines for contributing to the project
- [scripts/README.md](./scripts/README.md) - Documentation for data fetching scripts
