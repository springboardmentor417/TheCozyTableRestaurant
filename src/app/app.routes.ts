import { Routes, RouterModule, provideRouter } from '@angular/router';
import { FeedbackFormComponent } from './feedback/components/feedback-form/feedback-form.component';
import { AdminchartComponent } from './feedback/adminComponent/adminchart/adminchart.component';
import { AppComponent } from './app.component';
import { AckPageComponent } from './feedback/components/feedback-form/ack-page/ack-page.component';
import { PageFeedbackComponent } from './feedback/components/feedback-form/page-feedback/page-feedback.component';

export const routes: Routes = [
  {
    path: 'feedback',
    component: FeedbackFormComponent,
  },
  {
    path: 'admin',
    component: AdminchartComponent,
  },
  {
    path: 'ackpage',
    component: AckPageComponent,
  },
  {
    path: 'reply',
    component: PageFeedbackComponent,
  },
  {
    path: '',
    redirectTo: 'feedback',
    pathMatch: 'full', // Default route
  },
];
