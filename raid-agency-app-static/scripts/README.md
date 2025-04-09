# Data Fetching Scripts

This directory contains scripts used to fetch RAiD data from APIs and process it for use in the static site.

## Overview

The scripts in this directory are responsible for:
1. Authenticating with the RAiD API
2. Fetching RAiD data and handles
3. Processing and transforming the data
4. Saving it to the appropriate location for the build process

## Scripts

### fetch-raids.sh

**Purpose:** Fetches all public RAiD data from the API.

**Flow:**
1. Loads environment variables from `.env`
2. Validates required environment variables
3. Authenticates with IAM endpoint to obtain a bearer token
4. Fetches all public RAiD data from the API
5. Saves the response to `src/raw-data/raids.json`
6. Extracts unique handles and saves them to `src/raw-data/handles.json`

**Requirements:**
- `jq` command-line tool must be installed
- `.env` file with required environment variables:
  - `IAM_ENDPOINT`
  - `API_ENDPOINT`
  - `IAM_CLIENT_ID`
  - `IAM_CLIENT_SECRET`
  - `RAID_ENV`

**Output Files:**
- `src/raw-data/raids.json`: Contains all RAiD data
- `src/raw-data/handles.json`: Contains unique RAiD handles

**Usage:**
```bash
./scripts/fetch-raids.sh
```

### fetch-handles.sh

**Purpose:** Fetches RAiD handles from multiple environments (prod, stage, demo, test) and combines them into a single file.

**Flow:**
1. Initializes an empty JSON array for the result
2. For each environment:
   - Fetches handles data from the environment's API
   - Processes the JSON response
   - Adds each handle with its source environment to the result array
3. Saves the combined data to `src/raw-data/all-handles.json`

**Output File:**
- `src/raw-data/all-handles.json`: Contains handles from all environments in the format `[[handle, environment], ...]`

**Usage:**
```bash
./scripts/fetch-handles.sh
```

## Execution Order

The scripts are typically executed in this order:
1. `fetch-raids.sh` - To get the main RAiD data and local handles
2. `fetch-handles.sh` - To get handles from all environments

Both scripts are automatically executed:
- Before development server starts (`npm run dev`)
- Before building the site (`npm run build`)

This happens through the `predev` and `prebuild` npm scripts defined in `package.json`.

## Troubleshooting

### Common Issues:

1. **Authentication Failures:**
   - Check that your `.env` file has the correct credentials
   - Verify that the IAM endpoint is accessible

2. **Missing jq Tool:**
   - Install jq: `sudo apt-get install jq` (Ubuntu/Debian)
   - Or for macOS: `brew install jq`

3. **Empty Response:**
   - Check network connectivity
   - Verify API endpoint URL is correct
   - Ensure your authentication credentials have the necessary permissions

4. **Permission Denied:**
   - Make scripts executable: `chmod +x scripts/*.sh`

5. **JSON Parsing Errors:**
   - Check the API response format has not changed
   - Verify that jq is installed and working correctly