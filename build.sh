#!/usr/bin/env bash
set -o errexit
cd eventhub-ui
npm install
npm run build -- --configuration production