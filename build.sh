#!/usr/bin/env bash
# exit on error
set -o errexit

# -- Build the Frontend --
# Navigate to the frontend folder
cd eventhub-ui
# Install frontend dependencies
npm install
# Build the frontend for production
npm run build -- --configuration production

# -- Install Backend Dependencies --
# Navigate back to the root and then to the backend folder
cd ../backend
npm install