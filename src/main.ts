import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Extend appConfig with additional providers
bootstrapApplication(AppComponent, {
  ...appConfig, // Spread existing appConfig
  providers: [
    ...(appConfig.providers || []), // Include existing providers from appConfig
    provideHttpClient(),
    provideAnimationsAsync(), // Add HttpClient provider
  ],
}).catch((err) => console.error(err));
