import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormSubmissionService } from '../core/form-submission.service';
import { generateWhatsAppLink, openWhatsAppLink } from '../core/whatsapp.utils';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  whatsappNumber = environment.contact.whatsappNumber;
  studioEmail = environment.contact.studioEmail;
  emailRecipient = this.studioEmail;
  /**
   * Configured Formspree endpoint — POSTs will be sent here when Email is chosen.
   */
  formspreeEndpoint = environment.contact.formspreeEndpoint;

  isSubmitting = false;

  formData: {
    name: string;
    phone: string;
    service: string;
    otherService?: string;
    message: string;
    sendMethod?: 'email' | 'whatsapp';
    senderEmail?: string;
  } = {
    name: '',
    phone: '',
    service: '',
    otherService: '',
    message: '',
    sendMethod: 'email'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formSubmissionService: FormSubmissionService
  ) {}

  sendWhatsApp(): void {
    // Instead of opening WhatsApp immediately, scroll to the contact form and
    // pre-select WhatsApp as the send method so users can fill details and send.
    this.formData.sendMethod = 'whatsapp';
    // Smooth scroll to the form container
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // focus the first input inside the form for convenience
      const firstInput = el.querySelector('input[name="name"]') as HTMLElement | null;
      if (firstInput) {
        // small timeout to allow scrolling animation to begin
        setTimeout(() => firstInput.focus(), 300);
      }
    } else {
      // fallback: open WhatsApp if form not found
      const message = 'Hi, I would like to inquire about your tailoring services.';
      const url = generateWhatsAppLink(this.whatsappNumber, message);
      openWhatsAppLink(url);
    }
  }

  ngOnInit(): void {
    // Read query params from the activated route and prefill the form
    this.route.queryParams.subscribe(params => {
      if (params['sendMethod'] === 'whatsapp') {
        this.formData.sendMethod = 'whatsapp';
      }
      if (params['service']) {
        this.formData.service = params['service'];
      }

      if (params['sendMethod'] || params['service']) {
        // scroll to contact form for convenience
        setTimeout(() => {
          const el = document.getElementById('contact-form');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 120);
      }
    });
  }

  // Navigate to Feedback page
  openFeedback(): void {
    this.router.navigate(['/feedback']);
  }

  async submitForm(): Promise<void> {
    // Basic validation
    if (!this.formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    const subject = `Enquiry from ${this.formData.name}`;
    const selectedService = this.formData.service === 'other' ? (this.formData.otherService || 'Other') : (this.formData.service || 'N/A');
    const bodyLines = [
      `Name: ${this.formData.name}`,
      `Phone: ${this.formData.phone || 'N/A'}`,
      `Service: ${selectedService}`,
      '',
      this.formData.message || ''
    ];
    const body = bodyLines.join('\n');

    if (this.formData.sendMethod === 'whatsapp') {
      const waMessage = `${subject}\n\n${body}`;
      const url = generateWhatsAppLink(this.whatsappNumber, waMessage);
      openWhatsAppLink(url);
    } else {
      // require sender email
      if (!this.formData.senderEmail || !this.formData.senderEmail.includes('@')) {
        alert('Please enter a valid email address to send via Email');
        return;
      }

      this.isSubmitting = true;

      try {
        const payload = {
          _subject: subject,
          name: this.formData.name,
          _replyto: this.formData.senderEmail,
          phone: this.formData.phone,
          service: selectedService,
          message: this.formData.message,
          formType: 'General Contact Enquiry'
        };

        await this.formSubmissionService.submitToFormspree(
          this.formspreeEndpoint,
          payload,
          {
            recipient: this.emailRecipient,
            subject: subject,
            body: body,
            replyTo: this.formData.senderEmail
          }
        );

        // SUCCESS: Show success alert
        alert('Thank you — your message was sent successfully. We will be in touch soon.');
      } catch (error) {
        // FAILURE: Show error alert (only if fetch failed AND no fallback occurred)
        console.error('Form submission failed:', error);
        alert('There was an error sending your message. Please try again or contact us via WhatsApp.');
      } finally {
        this.isSubmitting = false;
      }
    }

    // Reset the form (only clear fields; keep sendMethod default)
    this.formData = {
      name: '',
      phone: '',
      service: '',
      message: '',
      sendMethod: 'email'
    };
  }
}