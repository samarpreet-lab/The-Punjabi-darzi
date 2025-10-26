import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomSelectComponent } from '../shared/custom-select/custom-select.component';
import { PRICING_ROWS, SERVICE_CATEGORIES } from '../shared/services.shared';

export interface Feedback {
  id?: string;
  name?: string;
  serviceId: string;
  serviceTitle?: string;
  suitId?: string;
  suitTitle?: string;
  rating: 1|2|3|4|5;
  comment?: string;
  email?: string;
  consent?: boolean;
  published?: boolean;
  createdAt?: string;
}

// Helper to create safe ids from service titles
function slugify(text: string) {
  return text.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const PORTFOLIO = [
  { id: 'patiala-01', title: 'Classic Patiala Suit' },
  { id: 'lining-01', title: 'Lining Suit — Embroidered' },
  { id: 'frock-01', title: 'Pink Baby Frock' }
];

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomSelectComponent],
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent {
  // Services should be high-level (suit making, alterations, etc.) - use SERVICE_CATEGORIES
  services = SERVICE_CATEGORIES.map((c, i) => ({ id: slugify(c.title + '-' + i), title: c.title }));

  // Suit/style options should include the detailed pricing rows (core services)
  suitOptions = PRICING_ROWS.map((r, i) => ({ id: slugify(r.service + '-' + i), title: r.service }));

  portfolio = PORTFOLIO;

  // Replace with your Formspree endpoint (eg. https://formspree.io/f/XXXXX)
  formspreeEndpoint = 'https://formspree.io/f/meorwror';

  // Replace with boutique WhatsApp number (country code, no +). Eg: 919812345678
  businessWhatsApp = '917589114421';

  model: Partial<Feedback> = {
    rating: 5,
    serviceId: this.services.length ? this.services[0].id : ''
  };

  submitting = signal(false);
  recent = signal<Feedback[]>([]);
  successMessage = signal('');

  formatPreview(): string {
    const svc = this.services.find(s => s.id === this.model.serviceId)?.title || '';
    const suitFromPortfolio = this.portfolio.find(p => p.id === this.model.suitId)?.title;
    const suitFromPricing = (this as any).suitOptions?.find((s: any) => s.id === this.model.suitId)?.title;
    const suit = suitFromPortfolio || suitFromPricing || '';
    const name = this.model.name ? `Name: ${this.model.name}\n` : '';
    return `${name}Feedback for: ${svc}${suit ? ' / ' + suit : ''}\nRating: ${this.model.rating} ★\n\n${this.model.comment || ''}`;
  }

  async sendViaFormspree() {
    if (!this.model.serviceId || !this.model.rating || !this.model.consent) return;
    this.submitting.set(true);
      const payload: any = {
      name: this.model.name,
      serviceId: this.model.serviceId,
      serviceTitle: this.services.find(s=>s.id===this.model.serviceId)?.title,
      suitId: this.model.suitId,
      suitTitle: this.portfolio.find(p=>p.id===this.model.suitId)?.title || (this as any).suitOptions?.find((s: any) => s.id === this.model.suitId)?.title,
      rating: this.model.rating,
      comment: this.model.comment,
      email: this.model.email,
      consent: this.model.consent,
      createdAt: new Date().toISOString()
    };

    try {
      if (this.formspreeEndpoint && this.formspreeEndpoint.trim().length > 0) {
        const res = await fetch(this.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Formspree error');
      } else {
        // fallback: open mail client with prefilled subject/body
        const subject = `Feedback: ${payload.serviceTitle}${payload.suitTitle ? ' / ' + payload.suitTitle : ''}`;
        const body = encodeURIComponent(this.formatPreview());
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`;
      }

      // store locally for preview
      const fb: Feedback = { ...(payload as Feedback), id: Date.now().toString() };
  this.recent.update(a => [fb, ...a]);
      this.successMessage.set('Thanks — your feedback was sent.');
  this.model = { rating: 5, serviceId: this.services[0]?.id || '', name: '' };
    } catch (err) {
      this.successMessage.set('Failed to send feedback. Try WhatsApp or check Formspree endpoint.');
      console.error(err);
    } finally {
      this.submitting.set(false);
      setTimeout(()=> this.successMessage.set(''), 5000);
    }
  }

  // On init, check query params for a preselected suit or service and prefill the model
  ngOnInit(): void {
    try {
      const qs = new URLSearchParams(window.location.search);
      const suit = qs.get('suit');
      const service = qs.get('service');
      if (suit) this.model.suitId = suit;
      if (service) this.model.serviceId = service;
    } catch (e) {
      // ignore
    }
  }

  sendViaWhatsApp() {
    if (!this.model.serviceId || !this.model.rating) return;
    const svc = this.services.find(s => s.id === this.model.serviceId)?.title || '';
    const suit = this.portfolio.find(p => p.id === this.model.suitId)?.title || '';
    const pieces = [];
    pieces.push('Sat Sri Akal!');
    pieces.push(`I'm leaving feedback for: ${svc}${suit ? ' / ' + suit : ''}`);
    pieces.push(`Rating: ${this.model.rating} ★`);
    if (this.model.comment) pieces.push(`Comments: ${this.model.comment}`);
    const message = pieces.join('\n');
    const url = `https://wa.me/${this.businessWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  reset() {
    this.model = { rating: 5, serviceId: this.services[0].id };
    this.successMessage.set('');
  }
}
