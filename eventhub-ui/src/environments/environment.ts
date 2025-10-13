// File: eventhub-ui/src/environments/environment.prod.ts

export const environment = {
  production: true,
  // CRITICAL FIX: Use the live Render URL for the backend API
  apiUrl: 'http://localhost:5000/api' 
};