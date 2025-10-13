#!/usr/bin/env bash
# exit on error
set -o errexit

# -- Build the Frontend --
cd eventhub-ui
npm install
npm run build -- --configuration production

# -- Install Backend Dependencies --
cd ../backend
npm install