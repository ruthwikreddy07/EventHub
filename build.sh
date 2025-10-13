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

# 4️⃣ Return to root and move to backend
cd ../backend

# 5️⃣ Install backend dependencies
echo "Installing backend dependencies..."
npm install

echo "--- BUILD COMPLETE ✅ ---"
