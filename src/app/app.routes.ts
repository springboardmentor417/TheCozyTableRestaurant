import { Routes,RouterModule, provideRouter } from '@angular/router';
import { FeedbackFormComponent } from './feedback/components/feedback-form/feedback-form.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'feedback', component:FeedbackFormComponent
      }
];