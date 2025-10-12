// File: eventhub-ui/src/app/app.config.server.ts

import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering() // This provides the necessary "Platform" for the server.
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);