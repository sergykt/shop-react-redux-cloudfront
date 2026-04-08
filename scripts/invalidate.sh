#!/bin/sh
set -e

cd "$(dirname "$0")/.."

STACK_NAME="DeployWebAppStack"
BUCKET_NAME_KEY="BucketName"
DISTRIBUTION_ID_KEY="CloudFrontDistributionId"
OUTPUTS_FILE="./infra/outputs.json"
BUILD_PATH="./infra/resources/build"

# 1. Extracting necessary information from outputs.json
BUCKET_NAME=$(jq -r ".${STACK_NAME}.${BUCKET_NAME_KEY}" $OUTPUTS_FILE)
DISTRIBUTION_ID=$(jq -r ".${STACK_NAME}.${DISTRIBUTION_ID_KEY}" $OUTPUTS_FILE)

# 2. Check if the necessary information was extracted successfully
if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
  echo "Error: Failed to extract necessary information from $OUTPUTS_FILE"
  echo "Bucket Name: $BUCKET_NAME"
  echo "Distribution ID: $DISTRIBUTION_ID"
  exit 1
fi

# 3. Check build path
if [ ! -d "$BUILD_PATH" ]; then
  echo "Error: Build path does not exist: $BUILD_PATH"
  exit 1
fi

# 4. Syncing build files to S3
echo "Syncing build files to S3: $BUCKET_NAME"
aws s3 sync $BUILD_PATH s3://$BUCKET_NAME --delete

# 5. Invalidating CloudFront

echo "Invalidating CloudFront: $DISTRIBUTION_ID"
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "Done!"
