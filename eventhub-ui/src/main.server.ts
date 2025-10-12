// File: eventhub-ui/src/main.server.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { config } from './app/app.config.server'; // <-- Must import from app.config.server.ts

// The bootstrap function uses the 'config' which includes the server rendering providers.
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;