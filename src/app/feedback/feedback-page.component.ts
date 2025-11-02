import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormSubmissionService } from '../core/form-submission.service';
import { generateWhatsAppLink, openWhatsAppLink } from '../core/whatsapp.utils';
import { PRICING_ROWS } from '../shared/services.shared';

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

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.css']
})
export class FeedbackPageComponent {
  // Services should map to portfolio categories for consistency
  services = [
    { id: 'all', title: 'All' },
    { id: 'simple-suits', title: 'Simple Suits' },
    { id: 'patiala-suits', title: 'Patiala Suits' },
    { id: 'plazo-suits', title: 'Plazo Suits' },
    { id: 'frock-suits', title: 'Frock Suits' },
    { id: 'anarkali-suits', title: 'Anarkali Suits' },
    { id: 'sharara-suits', title: 'Sharara Suits' },
    { id: 'umbrella-suits', title: 'Umbrella Suits' },
    { id: 'special-suits', title: 'Special Suits' },
    { id: 'lehenga', title: 'Lehenga' },
    { id: 'blouses', title: 'Blouses' },
    { id: 'school-uniforms', title: 'School Uniforms' },
    { id: 'baby-clothes', title: 'Baby Clothes' },
    { id: 'detail-work', title: 'Detail Work' },
  ];

  // Suit/style options should include the detailed pricing rows (core services)
  suitOptions = PRICING_ROWS.map(r => ({ id: slugify(r.service), title: r.service }));

  // Replace with your Formspree endpoint (eg. https://formspree.io/f/XXXXX)
  formspreeEndpoint = environment.contact.formspreeEndpoint;

  // Replace with boutique WhatsApp number (country code, no +). Eg: 919812345678
  businessWhatsApp = environment.contact.whatsappNumber;

  model: Partial<Feedback> = {
    rating: 5,
    serviceId: this.services.length ? this.services[0].id : '',
    suitId: ''
  };

  submitting = signal(false);
  recent = signal<Feedback[]>([]);
  successMessage = signal('');
  showSuccessModal = signal(false);

  constructor(
    private route: ActivatedRoute,
    private formSubmissionService: FormSubmissionService
  ) {}

  formatPreview(): string {
    const svc = this.services.find(s => s.id === this.model.serviceId)?.title || '';
    const suit = this.suitOptions.find((s: any) => s.id === this.model.suitId)?.title || '';
    const name = this.model.name ? `Name: ${this.model.name}\n` : '';
    return `${name}Feedback for: ${svc}${suit ? ' / ' + suit : ''}\nRating: ${this.model.rating} ★\n\n${this.model.comment || ''}`;
  }

  async sendViaFormspree() {
    if (!this.model.serviceId || !this.model.rating || !this.model.consent) return;
    this.submitting.set(true);
    this.successMessage.set('');

    const payload: any = {
      name: this.model.name,
      serviceId: this.model.serviceId,
      serviceTitle: this.services.find(s => s.id === this.model.serviceId)?.title,
      suitId: this.model.suitId,
      suitTitle: this.suitOptions.find((s: any) => s.id === this.model.suitId)?.title,
      rating: this.model.rating,
      comment: this.model.comment,
      email: this.model.email,
      consent: this.model.consent,
      createdAt: new Date().toISOString(),
      formType: 'Customer Feedback'
    };

    try {
      const subject = `Feedback: ${payload.serviceTitle}${payload.suitTitle ? ' / ' + payload.suitTitle : ''}`;
      const body = this.formatPreview();

      await this.formSubmissionService.submitToFormspree(
        this.formspreeEndpoint,
        payload,
        {
          recipient: environment.contact.studioEmail,
          subject: subject,
          body: body,
          replyTo: this.model.email
        }
      );

      // store locally for preview
      const fb: Feedback = { ...(payload as Feedback), id: Date.now().toString() };
      this.recent.update(a => [fb, ...a]);
      this.successMessage.set('Thanks — your feedback was sent.');
      this.showSuccessModal.set(true);
      this.model = { rating: 5, serviceId: this.services[0]?.id || '', suitId: '', name: '' };
    } catch (error) {
      this.successMessage.set('Failed to send feedback. Try WhatsApp or check your mail client.');
      console.error('Feedback submission error:', error);
    } finally {
      this.submitting.set(false);
      setTimeout(() => this.successMessage.set(''), 5000);
    }
  }

  // On init, read query params from the activated route and prefill the model
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['suit']) {
        this.model.suitId = params['suit'];
      }
      if (params['service']) {
        this.model.serviceId = params['service'];
      }
    });
  }

  sendViaWhatsApp() {
    if (!this.model.serviceId || !this.model.rating) return;
    const svc = this.services.find(s => s.id === this.model.serviceId)?.title || '';
    const suit = this.suitOptions.find((s: any) => s.id === this.model.suitId)?.title || '';
    const pieces = [];
    pieces.push('Sat Sri Akal!');
    pieces.push(`I'm leaving feedback for: ${svc}${suit ? ' / ' + suit : ''}`);
    pieces.push(`Rating: ${this.model.rating} ★`);
    if (this.model.comment) pieces.push(`Comments: ${this.model.comment}`);
    const message = pieces.join('\n');
    const url = generateWhatsAppLink(this.businessWhatsApp, message);
    openWhatsAppLink(url);
  }

  reset() {
    this.model = { rating: 5, serviceId: this.services[0].id, suitId: '' };
    this.successMessage.set('');
  }

  closeSuccessModal(): void {
    this.showSuccessModal.set(false);
  }
}
