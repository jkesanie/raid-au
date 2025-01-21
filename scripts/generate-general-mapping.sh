#!/bin/bash

# Check if we're running the script from the correct directory
if [[ $(basename $(pwd)) != "scripts" ]]; then
    echo "Error: Please run this script from the 'scripts' directory"
    exit 1
fi

# Define constants
TEMP_FILE="/tmp/general-mapping.json"
FINAL_PATH_APP="../raid-agency-app/src/mapping/data/general-mapping.json"
FINAL_PATH_STATIC="../raid-agency-app-static/src/mapping/data/general-mapping.json"
URL="https://vocabs.ardc.edu.au/registry/api/resource/versions/1484/versionArtefacts/conceptTree"

# Download and process in one step
curl -sf "${URL}" | jq '
def make_entry(field_name; key_source; value_source):
 {
 field: field_name,
 key: key_source,
 value: value_source,
 definition: (.definition // "")
 };
[
 (.forest[] | select(.label == "access.type.id") | .children[] |
 make_entry("access.type.id"; .label; .altLabels[0])),
 (.forest[] | select(.label == "contributor.position.schema") | .children[] |
 make_entry("contributor.position.id"; .iri; .label)),
 (.forest[] | select(.label == "description.type.schema") | .children[] |
 make_entry("description.type.id"; .iri; .label)),
 (.forest[] | select(.label == "organisation.role.schema") | .children[] |
 make_entry("organisation.role.id"; .iri; .label)),
 (.forest[] | select(.label == "relatedObject.category.schema") | .children[] |
 make_entry("relatedObject.category.id"; .iri; .label)),
 (.forest[] | select(.label == "relatedObject.type.schema") | .children[] |
 make_entry("relatedObject.type.id"; .iri; .label)),
 (.forest[] | select(.label == "relatedRaid.type.schema") | .children[] |
 make_entry("relatedRaid.type.schema"; .iri; .label)),
 (.forest[] | select(.label == "title.type.schema") | .children[] |
 make_entry("title.type.schema"; .iri; .label))
] | sort_by(.field, .value)' > "${TEMP_FILE}"

# Check if the processing was successful
if [ $? -eq 0 ] && [ -s "${TEMP_FILE}" ]; then
    # Ensure target directories exist
    mkdir -p "$(dirname "${FINAL_PATH_APP}")"
    mkdir -p "$(dirname "${FINAL_PATH_STATIC}")"
    
    # Copy to both final destinations
    cp "${TEMP_FILE}" "${FINAL_PATH_APP}"
    cp "${TEMP_FILE}" "${FINAL_PATH_STATIC}"
    
    # Clean up temp file
    rm -f "${TEMP_FILE}"
    echo "Processing completed successfully"
else
    echo "Error processing data" >&2
    rm -f "${TEMP_FILE}"
    exit 1
fi