import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackPageComponent } from './feedback/feedback-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'portfolio', component: PortfolioComponent },
  // testimonials route removed
  // fabric-guide route removed
  { path: 'contact', component: ContactComponent },
  { path: 'feedback', component: FeedbackPageComponent },
  { path: '**', redirectTo: '/home' }
];
