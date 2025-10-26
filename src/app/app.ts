import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FeedbackPageComponent } from './feedback/feedback-page.component';
// TestimonialsComponent removed per request
// FabricGuideComponent removed per request
import { ContactComponent } from './contact/contact.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, HomeComponent, ServicesComponent, PortfolioComponent, ContactComponent, FeedbackPageComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Simple reactive state using signals
  protected title = signal('the-punjabi-darzi');
  protected navOpen = signal(false);
  // currentView holds which page to display; default is 'home'
  // Use a plain string here for simplicity — valid values are the same as before.
  protected currentView = signal('home');

  protected setView(view: string) {
    this.currentView.set(view);
    this.closeNav();
  }

  protected toggleNav(): void {
    this.navOpen.update((open) => !open);
  }

  protected closeNav(): void {
    this.navOpen.set(false);
  }

  constructor() {
    // Listen for SPA navigation events from child components
    window.addEventListener('navigate', (e: Event) => {
      // event detail may be a view string or a view with query params, e.g. 'feedback?suit=patiala-01'
      const detail = (e as CustomEvent).detail as string;
      if (!detail) return;

      // If there are query params, split and set the view; also update history so components can read window.location.search
      const [view, qs] = detail.split('?');
      if (view) {
        this.setView(view);
        // push state so feedback page can read query params (non-destructive)
        if (qs) {
          const url = `${location.pathname}?${qs}`;
          try { history.pushState({}, '', url); } catch (err) { /* ignore */ }
        } else {
          // clear any previous query string
          try { history.pushState({}, '', location.pathname); } catch (err) { /* ignore */ }
        }
      }
    });
  }
}
