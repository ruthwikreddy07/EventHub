#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -o errexit

echo "--- STARTING ANGULAR FRONTEND BUILD ---"

# 1. Navigate to the Angular Frontend folder
cd eventhub-ui

# 2. Install ALL frontend dependencies
echo "Installing Angular dependencies..."
npm install 

# 3. Build the Angular app for production. 
echo "Building Angular app..."
npx ng build --configuration production

echo "--- BUILD COMPLETE ---"