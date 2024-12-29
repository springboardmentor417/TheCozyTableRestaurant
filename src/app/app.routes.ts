import { Routes,RouterModule, provideRouter } from '@angular/router';
import { FeedbackFormComponent } from './feedback/components/feedback-form/feedback-form.component';
import { AdminchartComponent } from './feedback/adminComponent/adminchart/adminchart.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'feedback', component:FeedbackFormComponent
      },
      {
        path: 'admin', component:AdminchartComponent
      }
];