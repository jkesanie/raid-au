#!/bin/bash

# RAID Data Collection Script
#
# This script fetches raid data from the designated API and maintains a 7-day rolling history.
# It performs the following operations:
# 1. Loads environment variables from a .env file
# 2. Validates required environment variables are present
# 3. Archives the current raids.json file with yesterday's date
# 4. Authenticates with the IAM endpoint to obtain a bearer token
# 5. Fetches all public raid data from the API
# 6. Saves the response to raids.json
# 7. Maintains a 7-day rolling window by automatically removing files older than 7 days
#
# The script creates:
# - Current data: ./src/raw-data/raids.json
# - Historical data: ./src/raw-data/raids_YYYY-MM-DD.json
#

if [ -f ".env" ]; then
  echo "Loading environment variables from ../.env file"
  export $(grep -v '^#' .env | xargs)
else
  echo "No .env file found"
fi

# Required environment variables
required_vars=("IAM_ENDPOINT" "API_ENDPOINT" "IAM_CLIENT_ID" "IAM_CLIENT_SECRET" "RAID_ENV")

# Check if all required environment variables are set
missing_vars=()
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    missing_vars+=("$var")
  fi
done

# If any variables are missing, show error and exit
if [ ${#missing_vars[@]} -ne 0 ]; then
  echo "Error: The following required environment variables are not set:"
  for var in "${missing_vars[@]}"; do
    echo "  - $var"
  done
  echo "Please set these variables before running the script."
  exit 1
fi

DATA_DIR="./src/raw-data"

CURRENT_DATE=$(date +"%Y-%m-%d")
YESTERDAY_DATE=$(date -v-1d +"%Y-%m-%d")

YESTERDAY_FILE="$DATA_DIR/raids_$YESTERDAY_DATE.json"

# Main output file (always named raids.json)
OUTPUT_FILE="$DATA_DIR/raids.json"
OUTPUT_FILE_ALT="$DATA_DIR/raids-alt.json"

# If raids.json exists, archive it with yesterday's date before getting new data
if [ -f "$OUTPUT_FILE" ]; then
  cp "$OUTPUT_FILE" "$YESTERDAY_FILE"
fi

# Step 1: Get bearer token
echo "Getting bearer token..."
TOKEN_RESPONSE=$(curl -s -X POST $IAM_ENDPOINT/realms/raid/protocol/openid-connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=$IAM_CLIENT_ID&client_secret=$IAM_CLIENT_SECRET")

# Extract token from response
BEARER_TOKEN=$(echo $TOKEN_RESPONSE | jq -r '.access_token')

if [ -z "$BEARER_TOKEN" ] || [ "$BEARER_TOKEN" == "null" ]; then
  echo "Failed to get bearer token. Response: $TOKEN_RESPONSE"
  exit 1
fi

echo "Token acquired successfully."

# The following should only run in the "prod" environment

if [ "$RAID_ENV" = "prod" ]; then
  # Code to execute if RAID_ENV is set to "prod"
  echo "Running in production environment"

  # Get service points
  SERVICEPOINTS_RESPONSE=$(curl -s -X GET $API_ENDPOINT/service-point/ \
    -H "Authorization: Bearer $BEARER_TOKEN" \
    -H "Content-Type: application/json")

  # Parse the JSON response into an array that can be iterated over
  echo "Processing service points..."

  # Save the service points to a temporary file
  echo "$SERVICEPOINTS_RESPONSE" >temp_servicepoints.json

  # Initialize empty combined file - start with empty array
  echo "[]" >combined_raids.json

  # Iterate through each service point in the response
  jq -c '.[]' temp_servicepoints.json | while read -r servicepoint; do
    # Extract values from each service point
    id=$(echo $servicepoint | jq -r '.id')
    name=$(echo $servicepoint | jq -r '.name')
    echo "Processing service point: $name (ID: $id)"

    # Get raid data for this service point
    SP_RESPONSE=$(curl -s -X GET $API_ENDPOINT/raid/?servicePointId=$id \
      -H "Authorization: Bearer $BEARER_TOKEN" \
      -H "Content-Type: application/json")

    # Validate and clean the JSON before saving
    echo "$SP_RESPONSE" | jq '.' >"temp_response_$id.json" 2>/dev/null || {
      echo "Warning: Invalid JSON received for $name (ID: $id), skipping..."
      echo "[]" >"temp_response_$id.json"
    }
  done

  # Now build the combined response after the loop
  for temp_file in temp_response_*.json; do
    # Check if the temporary file has valid content
    if [ -s "$temp_file" ]; then
      # Try to sanitize the JSON before combining
      jq '.' "$temp_file" >"clean_$temp_file" 2>/dev/null || {
        echo "Warning: Could not parse $temp_file, skipping..."
        continue
      }

      # Use jq slurp mode to combine arrays correctly
      jq -s '.[0] + .[1]' combined_raids.json "clean_$temp_file" >temp_combined.json 2>/dev/null || {
        echo "Warning: Could not combine $temp_file, skipping..."
        continue
      }

      mv temp_combined.json combined_raids.json
      rm "clean_$temp_file"
    fi

    # Remove the temporary file
    rm "$temp_file"
  done

  # Clean up the service points temporary file
  rm temp_servicepoints.json

  # Move the final combined array to the output file
  mv combined_raids.json "$OUTPUT_FILE"
else
  # Code to execute if RAID_ENV is not "prod"
  echo "Running in non-production environment"
  echo "Fetching data from API..."
  API_RESPONSE=$(curl -s -X GET $API_ENDPOINT/raid/all-public \
    -H "Authorization: Bearer $BEARER_TOKEN" \
    -H "Content-Type: application/json")

  # Step 3: Save response to JSON file
  echo $API_RESPONSE >$OUTPUT_FILE

  if [ $? -eq 0 ]; then
    echo "Data successfully saved to $OUTPUT_FILE"
  else
    echo "Error saving data to file."
    exit 1
  fi

  # Delete files older than 7 days
  find "$DATA_DIR" -name "raids_*.json" -type f -mtime +7d -delete

fi
