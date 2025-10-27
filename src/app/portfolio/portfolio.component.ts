import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { environment } from '../../environments/environment';
import { TailoringDataService } from '../services/tailoring-data.service';
import { FormSubmissionService } from '../core/form-submission.service';
import { generateWhatsAppLink, openWhatsAppLink } from '../core/whatsapp.utils';
import type { PortfolioItem } from '../shared/services.shared';

type FilterCategory = 'all' | 'simple-suits' | 'patiala-suits' | 'plazo-suits' | 'frock-suits' | 
  'anarkali-suits' | 'sharara-suits' | 'umbrella-suits' | 'special-suits' | 'lehenga' | 
  'blouses' | 'school-uniforms' | 'baby-clothes' | 'detail-work';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxIntlTelInputModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  private whatsappNumber = environment.contact.whatsappNumber;
  // Fallback email address to receive enquiries when WhatsApp isn't available
  private enquiryEmail = environment.contact.enquiryEmail;
  
  portfolioItems: PortfolioItem[] = [];
  filteredItems: PortfolioItem[] = [];
  selectedFilter = signal<FilterCategory>('all');
  selectedItem = signal<PortfolioItem | null>(null);
  isModalOpen = signal<boolean>(false);

  filters: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'simple-suits', label: 'Simple Suits' },
    { id: 'patiala-suits', label: 'Patiala Suits' },
    { id: 'plazo-suits', label: 'Plazo Suits' },
    { id: 'frock-suits', label: 'Frock Suits' },
    { id: 'anarkali-suits', label: 'Anarkali Suits' },
    { id: 'sharara-suits', label: 'Sharara Suits' },
    { id: 'umbrella-suits', label: 'Umbrella Suits' },
    { id: 'special-suits', label: 'Special Suits' },
    { id: 'lehenga', label: 'Lehenga' },
    { id: 'blouses', label: 'Blouses' },
    { id: 'school-uniforms', label: 'School Uniforms' },
    { id: 'baby-clothes', label: 'Baby Clothes' },
    { id: 'detail-work', label: 'Detail Work' },
  ];

  // Mobile filters modal state: show only a subset on small screens and open a modal for the rest
  isFiltersModalOpen = signal<boolean>(false);

  // Enquiry modal state and model
  isEnquiryOpen = signal<boolean>(false);
  enquiry: {
    quantity: number;
    name: string;
    phone: string;
    email: string;
    location: string;
    visitOption: 'self' | 'someone' | 'send-fabric';
    address?: string;
    representativeName?: string;
    representativePhone?: string;
    notes: string;
  } = {
    quantity: 1,
    name: '',
    phone: '',
    email: '',
    location: '',
    visitOption: 'self',
    address: '',
    representativeName: '',
    representativePhone: '',
    notes: ''
  };

  // user consent for storing/using PII in the enquiry
  enquiryConsent = false;

  // Return first N filters for compact mobile header. We keep this as a simple getter to use from template.
  visibleFilters(count = 4) {
    return this.filters.slice(0, count);
  }

  moreFilters(count = 4) {
    return this.filters.slice(count);
  }

  constructor(
    private dataService: TailoringDataService,
    private router: Router,
    private formSubmissionService: FormSubmissionService
  ) {
    this.portfolioItems = this.dataService.getPortfolioItems();
    this.filteredItems = this.portfolioItems;
  }

  setFilter(category: FilterCategory): void {
    this.selectedFilter.set(category);
    this.filteredItems = this.dataService.getPortfolioItemsByCategory(category);
  }

  openFiltersModal(): void {
    this.isFiltersModalOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeFiltersModal(): void {
    this.isFiltersModalOpen.set(false);
    document.body.style.overflow = 'auto';
  }

  openModal(item: PortfolioItem): void {
    this.selectedItem.set(item);
    this.isModalOpen.set(true);
    document.body.style.overflow = 'hidden'; // Prevent body scroll
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedItem.set(null);
    document.body.style.overflow = 'auto'; // Restore body scroll
  }

  sendWhatsAppInquiry(item: PortfolioItem): void {
    // open the enquiry modal (modal-on-modal)
    this.enquiry = { quantity: 1, name: '', phone: '', email: '', location: '', visitOption: 'self', address: '', representativeName: '', representativePhone: '', notes: '' };
    this.isEnquiryOpen.set(true);
  }

  closeEnquiry(): void {
    this.isEnquiryOpen.set(false);
  }

  sendEnquiryViaWhatsApp(): void {
    const item = this.selectedItem();
    if (!item) return;
    // validate required fields: name, phone, email, location, notes
    if (!this.enquiry.name || !this.enquiry.phone || !this.enquiry.email || !this.enquiry.location) {
      return;
    }
    if (!this.enquiry.notes || this.enquiry.notes.trim().length < 3) {
      return;
    }

    const visitText = this.enquiry.visitOption === 'self'
      ? 'I will come to the boutique myself'
      : (this.enquiry.visitOption === 'someone' ? 'Someone will visit on my behalf' : 'I will send the fabric by post/courier');

    let extraInfo = '';
    if (this.enquiry.visitOption === 'send-fabric') {
      extraInfo = this.enquiry.address ? `Address: ${this.enquiry.address}` : '';
    } else if (this.enquiry.visitOption === 'someone') {
      const rep = this.enquiry.representativeName ? `Representative: ${this.enquiry.representativeName}` : '';
      const repPhone = this.enquiry.representativePhone ? ` (${this.enquiry.representativePhone})` : '';
      extraInfo = rep ? `${rep}${repPhone}` : '';
    }

    // Build a newline-separated message so WhatsApp shows a structured message preview
    const message = [
      `Sat Sri Akal! I'm interested in the '${item.title}' (Qty: ${this.enquiry.quantity}).`,
      `Name: ${this.enquiry.name}`,
      `Phone: ${this.enquiry.phone}`,
      `Email: ${this.enquiry.email}`,
      `Location: ${this.enquiry.location}`,
      visitText,
      extraInfo,
      `Notes: ${this.enquiry.notes}`
    ].filter(Boolean).join('\n');

    const url = generateWhatsAppLink(this.whatsappNumber, message);
    openWhatsAppLink(url);
    this.isEnquiryOpen.set(false);
    this.closeModal();
  }

  // Compose and open a mailto: link with the same message content as WhatsApp
  // Formspree integration: send enquiry directly via Formspree (no mail client)
  // Requires you to set `formspreeEndpoint` to your Formspree form URL (e.g. https://formspree.io/f/{your-id})
  private formspreeEndpoint = environment.contact.formspreeEndpoint;

  // UI state for email sending
  emailSending = false;
  emailSent = false;
  emailError: string | null = null;
  sentMessagePreview = '';
  showEmailSuccessModal = false;

  async sendEnquiryViaEmail(): Promise<void> {
    const item = this.selectedItem();
    if (!item) return;

    // run the same validations as the WhatsApp flow
    if (!this.enquiry.name || !this.enquiry.phone || !this.enquiry.email || !this.enquiry.location) {
      return;
    }
    if (!this.enquiry.notes || this.enquiry.notes.trim().length < 3) {
      return;
    }

    const visitText = this.enquiry.visitOption === 'self'
      ? 'I will come to the boutique myself'
      : (this.enquiry.visitOption === 'someone' ? 'Someone will visit on my behalf' : 'I will send the fabric by post/courier');

    let extraInfo = '';
    if (this.enquiry.visitOption === 'send-fabric') {
      extraInfo = this.enquiry.address ? `Address: ${this.enquiry.address}` : '';
    } else if (this.enquiry.visitOption === 'someone') {
      const rep = this.enquiry.representativeName ? `Representative: ${this.enquiry.representativeName}` : '';
      const repPhone = this.enquiry.representativePhone ? ` (${this.enquiry.representativePhone})` : '';
      extraInfo = rep ? `${rep}${repPhone}` : '';
    }

    const subject = `Enquiry: ${item.title} (Qty ${this.enquiry.quantity})`;
    const body = [
      `Sat Sri Akal! I'm interested in the '${item.title}' (Qty: ${this.enquiry.quantity}).`,
      `Name: ${this.enquiry.name}`,
      `Phone: ${this.enquiry.phone}`,
      `Email: ${this.enquiry.email}`,
      `Location: ${this.enquiry.location}`,
      visitText,
      extraInfo,
      `Notes: ${this.enquiry.notes}`
    ].filter(Boolean).join('\n');

    // Save preview for success modal
    this.sentMessagePreview = `Subject: ${subject}\n\n${body}`;

    // Send via Formspree
    this.emailSending = true;
    this.emailError = null;

    try {
      const payload = {
        subject,
        message: body,
        name: this.enquiry.name,
        email: this.enquiry.email,
        phone: this.enquiry.phone,
        location: this.enquiry.location,
        formType: 'Portfolio Item Enquiry',
        itemTitle: item.title,
        itemId: item.id,
        quantity: this.enquiry.quantity
      };

      const success = await this.formSubmissionService.submitToFormspree(
        this.formspreeEndpoint,
        payload,
        {
          recipient: this.enquiryEmail,
          subject: subject,
          body: body
        }
      );

      this.emailSent = true;
      this.showEmailSuccessModal = true;
      // Close only the enquiry form modal, keep the parent item modal open so success modal displays
      this.isEnquiryOpen.set(false);
    } catch (err: any) {
      console.error('Form submission error', err);
      this.emailError = err?.message || 'Unknown error while sending message.';
    } finally {
      this.emailSending = false;
    }
  }

  // Called from the success modal 'Send another' button. Opens the item modal again
  // only when a selectedItem exists; otherwise just hides the success modal.
  onSendAnother(): void {
    const item = this.selectedItem();
    if (item) {
      this.openModal(item);
    }
    this.showEmailSuccessModal = false;
  }

  // Navigate to feedback page with selected item as a query param
  openFeedbackForItem(item: PortfolioItem): void {
    if (!item) return;
    this.router.navigate(['/feedback'], { queryParams: { suit: item.id } });
  }
}