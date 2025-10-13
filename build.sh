#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -o errexit

echo "--- STARTING MONOREPO BUILD ---"

# 1. Navigate to the Angular Frontend folder
cd eventhub-ui

# 2. Install frontend dependencies
echo "Installing Angular dependencies..."
npm install

# 3. Build the Angular app for production. 
# CRITICAL FIX: Running the 'ng' executable directly from the local .bin path.
echo "Building Angular app using node_modules/.bin/ng..."
./node_modules/.bin/ng build --configuration production

# 4. Navigate back to the root
cd ..

# 5. Navigate to the Node.js Backend folder
cd backend

# 6. Install backend dependencies
echo "Installing Node.js (backend) dependencies..."
npm install

echo "--- BUILD COMPLETE ---"