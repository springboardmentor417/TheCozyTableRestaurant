import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';

// Extend appConfig with additional providers
bootstrapApplication(AppComponent, {
  ...appConfig, // Spread existing appConfig
  providers: [
    ...(appConfig.providers || []), // Include existing providers from appConfig
    provideHttpClient()             // Add HttpClient provider
  ]
}).catch((err) => console.error(err));
