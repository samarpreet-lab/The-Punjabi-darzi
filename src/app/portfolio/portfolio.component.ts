import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TailoringDataService } from '../services/tailoring-data.service';
import type { PortfolioItem } from '../shared/services.shared';

type FilterCategory = 'all' | 'simple-suits' | 'patiala-suits' | 'plazo-suits' | 'frock-suits' | 
  'anarkali-suits' | 'sharara-suits' | 'umbrella-suits' | 'special-suits' | 'lehenga' | 
  'blouses' | 'school-uniforms' | 'baby-clothes' | 'detail-work';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    countryCode?: string;
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
    notes: '',
    countryCode: '+91'
  };

  // List of country dialing codes and names for the searchable dropdown
  countries = [
    { code: '+1', name: 'United States / Canada' },
    { code: '+7', name: 'Russia' },
    { code: '+20', name: 'Egypt' },
    { code: '+27', name: 'South Africa' },
    { code: '+30', name: 'Greece' },
    { code: '+31', name: 'Netherlands' },
    { code: '+32', name: 'Belgium' },
    { code: '+33', name: 'France' },
    { code: '+34', name: 'Spain' },
    { code: '+36', name: 'Hungary' },
    { code: '+39', name: 'Italy' },
    { code: '+40', name: 'Romania' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+45', name: 'Denmark' },
    { code: '+46', name: 'Sweden' },
    { code: '+47', name: 'Norway' },
    { code: '+48', name: 'Poland' },
    { code: '+49', name: 'Germany' },
    { code: '+52', name: 'Mexico' },
    { code: '+53', name: 'Cuba' },
    { code: '+54', name: 'Argentina' },
    { code: '+55', name: 'Brazil' },
    { code: '+61', name: 'Australia' },
    { code: '+62', name: 'Indonesia' },
    { code: '+63', name: 'Philippines' },
    { code: '+64', name: 'New Zealand' },
    { code: '+65', name: 'Singapore' },
    { code: '+66', name: 'Thailand' },
    { code: '+81', name: 'Japan' },
    { code: '+82', name: 'South Korea' },
    { code: '+84', name: 'Vietnam' },
    { code: '+86', name: 'China' },
    { code: '+90', name: 'Turkey' },
    { code: '+91', name: 'India' },
    { code: '+92', name: 'Pakistan' },
    { code: '+93', name: 'Afghanistan' },
    { code: '+94', name: 'Sri Lanka' },
    { code: '+95', name: 'Myanmar' },
    { code: '+98', name: 'Iran' },
    { code: '+212', name: 'Morocco' },
    { code: '+213', name: 'Algeria' },
    { code: '+218', name: 'Libya' },
    { code: '+240', name: 'Equatorial Guinea' },
    { code: '+351', name: 'Portugal' },
    { code: '+352', name: 'Luxembourg' },
    { code: '+353', name: 'Ireland' },
    { code: '+354', name: 'Iceland' },
    { code: '+355', name: 'Albania' },
    { code: '+358', name: 'Finland' },
    { code: '+370', name: 'Lithuania' },
    { code: '+371', name: 'Latvia' },
    { code: '+372', name: 'Estonia' },
    { code: '+376', name: 'Andorra' },
    { code: '+380', name: 'Ukraine' },
    { code: '+381', name: 'Serbia' },
    { code: '+385', name: 'Croatia' },
    { code: '+386', name: 'Slovenia' },
    { code: '+387', name: 'Bosnia & Herzegovina' },
    { code: '+420', name: 'Czech Republic' },
    { code: '+421', name: 'Slovakia' },
    { code: '+852', name: 'Hong Kong' },
    { code: '+853', name: 'Macao' },
    { code: '+855', name: 'Cambodia' },
    { code: '+856', name: 'Laos' },
    { code: '+880', name: 'Bangladesh' },
    { code: '+886', name: 'Taiwan' },
    { code: '+962', name: 'Jordan' },
    { code: '+963', name: 'Syria' },
    { code: '+964', name: 'Iraq' },
    { code: '+965', name: 'Kuwait' },
    { code: '+966', name: 'Saudi Arabia' },
    { code: '+971', name: 'United Arab Emirates' },
    { code: '+972', name: 'Israel' },
    { code: '+973', name: 'Bahrain' },
    { code: '+974', name: 'Qatar' },
    { code: '+975', name: 'Bhutan' },
    { code: '+976', name: 'Mongolia' },
    { code: '+977', name: 'Nepal' },
    { code: '+998', name: 'Uzbekistan' }
  ];

  // When the user types/selects a country string in the country input, parse the leading code
  setCountryFromInput(value: string): void {
    if (!value) return;
    const m = value.match(/(\+\d{1,4})/);
    if (m) this.enquiry.countryCode = m[1];
  }
  // user consent for storing/using PII in the enquiry
  enquiryConsent = false;

  // Simple validation helper used by the template to enable/disable Send button
  isEnquiryValid(): boolean {
    const e = this.enquiry;
    // basic checks: required fields present
    if (!e.name || !e.phone || !e.email || !e.location) return false;
    if (!e.notes || e.notes.trim().length < 3) return false;
    if (!this.enquiryConsent) return false;

  // If the user chose 'send-fabric', address becomes required (we need a courier return/delivery address)
  if (e.visitOption === 'send-fabric' && !(e.address && e.address.trim().length > 5)) return false;

  // If the user chose 'someone', require the representative's name so we know who will visit
  if (e.visitOption === 'someone' && !(e.representativeName && e.representativeName.trim().length > 2)) return false;

    // phone pattern: optional leading +, then 7-15 digits
    const combined = `${e.countryCode || ''}${e.phone || ''}`;
    const phoneClean = (combined || '').replace(/[ \-()]/g, '');
    const phoneOk = /^\+?\d{7,15}$/.test(phoneClean);
    if (!phoneOk) return false;

    // very small email sanity check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)) return false;

    return true;
  }

  isPhoneFormatValid(): boolean {
    const e = this.enquiry;
    const combined = `${e.countryCode || ''}${e.phone || ''}`;
    const phoneClean = (combined || '').replace(/[ \-()]/g, '');
    return /^\+?\d{7,15}$/.test(phoneClean);
  }

  // Return first N filters for compact mobile header. We keep this as a simple getter to use from template.
  visibleFilters(count = 4) {
    return this.filters.slice(0, count);
  }

  moreFilters(count = 4) {
    return this.filters.slice(count);
  }

  constructor(private dataService: TailoringDataService, private router: Router) {
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
    this.enquiry = { quantity: 1, name: '', phone: '', email: '', location: '', visitOption: 'self', address: '', representativeName: '', representativePhone: '', notes: '', countryCode: '+91' };
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
    `Phone: ${this.enquiry.countryCode || ''} ${this.enquiry.phone}`,
    `Email: ${this.enquiry.email}`,
    `Location: ${this.enquiry.location}`,
    visitText,
    extraInfo,
    `Notes: ${this.enquiry.notes}`
  ].filter(Boolean).join('\n');

  const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
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
      `Phone: ${this.enquiry.countryCode || ''} ${this.enquiry.phone}`,
      `Email: ${this.enquiry.email}`,
      `Location: ${this.enquiry.location}`,
      visitText,
      extraInfo,
      `Notes: ${this.enquiry.notes}`
    ].filter(Boolean).join('\n');

    // Save preview for success modal
    this.sentMessagePreview = `Subject: ${subject}\n\n${body}`;

    // If the user hasn't configured formspreeEndpoint, fallback to mailto (previous behavior)
    if (!this.formspreeEndpoint || this.formspreeEndpoint.includes('YOUR_FORM_ID')) {
      const mailto = `mailto:${this.enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailto, '_blank');
      this.isEnquiryOpen.set(false);
      this.closeModal();
      return;
    }

    // Send via Formspree
    this.emailSending = true;
    this.emailError = null;

    try {
      const payload = {
        subject,
        message: body,
        name: this.enquiry.name,
        email: this.enquiry.email,
        phone: `${this.enquiry.countryCode || ''} ${this.enquiry.phone}`,
        location: this.enquiry.location,
        formType: 'Portfolio Item Enquiry',
        itemTitle: item.title,
        itemId: item.id,
        quantity: this.enquiry.quantity
      };

      const res = await fetch(this.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to send (status ${res.status}): ${errText}`);
      }

      this.emailSent = true;
      this.showEmailSuccessModal = true;
      // Close only the enquiry form modal, keep the parent item modal open so success modal displays
      this.isEnquiryOpen.set(false);
    } catch (err: any) {
      console.error('Formspree send error', err);
      this.emailError = err?.message || 'Unknown error while sending message.';
      // fallback to mailto if desired could be done here
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