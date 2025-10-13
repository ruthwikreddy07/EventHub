#!/usr/bin/env bash
set -o errexit

echo "--- STARTING MONOREPO BUILD ---"

# 1️⃣ Navigate to Angular frontend
cd eventhub-ui

# 2️⃣ Force install all dependencies including devDependencies
echo "Installing ALL Angular dependencies (including devDependencies)..."
npm install --include=dev

# 3️⃣ Build Angular app for production
echo "Building Angular app using Angular CLI..."
npx ng build --configuration production

# ... (Lines 1-17, Angular build code is correct) ...

# 4. Navigate back to the root
cd ..

# 5. Navigate to the Node.js Backend folder
cd backend

# 6. Install backend dependencies
# CRITICAL FIX: The backend must have its own package.json, or 
# you must use the root one. If you only have a root one, 
# you need to install ALL dependencies from the root.
echo "Installing Node.js (backend) dependencies..."
# If your backend uses the root package.json for its dependencies, 
# you must run npm install from the root.

# **Assuming your backend's dependencies (like 'helmet') are in the ROOT package.json:**
# Navigate back to the root
cd .. 
# Install all dependencies from the root, which includes backend modules
npm install 

# Your start command will handle running server.js from the backend folder

echo "--- BUILD COMPLETE ---"