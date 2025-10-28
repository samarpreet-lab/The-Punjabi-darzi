import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TailoringDataService } from '../services/tailoring-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private el: ElementRef, private data: TailoringDataService, private router: Router) {
    // populate the home service cards from shared service categories
    // (shows Punjabi Suits, Simple Lining Suits, Baby Girl Frocks as requested)
    this.services = this.data.getServiceCategories().slice(0, 3);
  }

  // Tracks whether the custom dropdown is open
  dropdownOpen = false;
  // Studio + map info
  studio = {
    hours: 'Mon - Sun: 9am - 7pm',
    note: 'Typical walk-within 5 min in Village',
    mapShortLink: 'https://maps.app.goo.gl/JTudS2QQDreb1bRw9',
    mapEmbedQuery: 'Sulehrian Khurd Mukerian'
  };

  // Services shown on the home page (fetched from TailoringDataService)
  // These are category-style items: { group, title, description, price, icon? }
  services: Array<{ group: string; title: string; description: string; price: string; icon?: string }> = [];

  get contactServices() {
    return this.services.map(s => s.title);
  }

  // Contact form model (simple template-driven approach)
  contact = {
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  };

  // The studio's WhatsApp number in international format without + or leading zeros (example)
  // Replace this with the real number: country code + number (e.g., '91999xxxxxxx')
  whatsappNumber = environment.contact.whatsappNumber;

  /**
   * Navigate to contact page with optional service prefill.
   * If `pre` is provided (number index or string title), pass it as a query param.
   */
  sendEnquiry(pre?: number | string) {
    let queryParams: any = { sendMethod: 'whatsapp' };
    
    if (typeof pre === 'number') {
      const svc = this.services[pre];
      if (svc) queryParams.service = svc.title;
    } else if (typeof pre === 'string' && pre) {
      queryParams.service = pre;
    }

    this.router.navigate(['/contact'], { queryParams });
  }

  // Toggle the custom dropdown
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Select a service from the custom dropdown
  selectService(s: string) {
    this.contact.service = s;
    this.dropdownOpen = false;
  }

  // Close dropdown when clicking outside the component
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.dropdownOpen = false;
    }
  }

  // Minimal validation: require name OR phone
  get isContactValid() {
    const n = (this.contact.name || '').trim();
    const p = (this.contact.phone || '').trim();
    return !!(n || p);
  }

  /**
   * Open an external URL in a new tab/window.
   */
  openMap(url: string) {
    try {
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      location.href = url;
    }
  }

  // Navigate to Services page
  goToServices() {
    this.router.navigate(['/services']);
  }

  goToPortfolio() {
    this.router.navigate(['/portfolio']);
  }
}