#!/bin/bash

# Auth configuration
#TOKEN_URL="https://iam.test.raid.org.au/realms/raid/protocol/openid-connect/token"
TOKEN_URL="http://localhost:8001/realms/raid/protocol/openid-connect/token"
CLIENT_ID="raid-upgrader"
CLIENT_SECRET="uQdAmNCYOPeEL58sNBiwBqeyKC4evv71"

# URL for getting the list of resources
GET_URL="http://localhost:8080/upgradable/all"
# URL for posting individual resources
POST_URL="http://localhost:8080/upgrade"

# Get access token
token_response=$(curl -s -X POST "$TOKEN_URL" -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=client_credentials" -d "client_id=$CLIENT_ID" -d "client_secret=$CLIENT_SECRET")

echo $token_response

# Extract the access token
access_token=$(echo "$token_response" | jq -r '.access_token')
echo $access_token

if [ -z "$access_token" ]; then
    echo "Failed to obtain access token"
    exit 1
fi

# Make the GET request with the token and store the response
response=$(curl -s "$GET_URL" -H "Authorization: Bearer $access_token")

# Parse the JSON response and iterate through each resource
echo "$response" | jq -c '.[]' | while read -r resource; do
    # Make POST request with the current resource as the body and the token
    curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer $access_token" -d "$resource" "$POST_URL"

    # Optional: Add a small delay between requests
    sleep 0.5
done