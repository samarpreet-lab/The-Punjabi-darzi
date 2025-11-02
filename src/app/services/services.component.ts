import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TailoringDataService } from './tailoring-data.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  constructor(private data: TailoringDataService, private router: Router) {
    // fetch categories and pricing from the data service to keep a single source
    this.serviceCategories = this.data.getServiceCategories();
    this.pricingRows = this.data.getPricingRows();
  }

  serviceMetrics = [
    {
      label: 'Turnaround',
      value: '7–10 days',
      helper: 'Alterations 1–3 days'
    },
    {
      label: 'Fittings',
      value: '1–2 sessions',
      helper: 'As needed for customs'
    }
  ];

  serviceActions = [
    { text: 'View Pricing', icon: 'fa-regular fa-clipboard', variant: 'primary', key: 'pricing' },
    { text: 'Fabric Recommendations', icon: 'fa-solid fa-leaf', variant: 'secondary', key: 'fabrics' }
  ];

  processSteps = [
    'Consultation & Measurement',
    'Stitching',
    'First Fitting',
    'Final Delivery'
  ];

  serviceCategories: any[] = [];

  pricingRows: any[] = [];

  expressNote = 'Express surcharge 25–40% based on urgency';

  fabrics = [
    {
      name: 'Cotton',
      description: 'Best for everyday suits and summers. Breathable and easy care.',
      care: 'Gentle machine wash'
    },
    {
      name: 'Silk',
      description: 'Ideal for bridal and festive. Rich drape, pairs well with zari.',
      care: 'Dry clean only'
    },
    {
      name: 'Georgette',
      description: 'Flowy silhouette for Anarkali and layered looks.',
      care: 'Hand wash cold'
    },
    {
      name: 'Blends',
      description: 'Cotton-silk or viscose blends for balanced comfort and sheen.',
      care: 'Follow blend label'
    }
  ];

  fabricAdvice = [
    'Patiala suits: Cotton or blends for volume and comfort.',
    'Anarkali: Silk or georgette for flare and movement.',
    'School uniforms: Durable cotton blends for daily wear.'
  ];

  faqs = [
    {
      question: 'How do I provide my measurements?',
      answer: 'Visit our studio to get measured by me or send your measurements if you know how to measure.'
    },
    {
      question: 'Do I need to bring my own fabric?',
      answer: 'Yes, You need to bring your own fabric. For Lining and other materials, we can source them for you, but it will cost more ( See my pricing section in Services Page).'
    },
    {
      question: 'How long will my order take?',
      answer: 'Customs take ~7–10 days after measurements; alterations usually 1–3 days.'
    },
    {
      question: 'What are the payment terms?',
      answer: 'Can be given after delivery or before delivery as per customer convenience.'
    }
  ];

  ctaBlocks = [
    {
      eyebrow: 'Still have questions?',
      headline: 'Reach out and we’ll respond within 1 hour during business hours.',
      button: 'Contact Us',
      icon: 'fa-regular fa-comment-dots'
    }
  ];

  // (Modal preview removed) action preview modal state and helpers were removed as they are unused.

  // WhatsApp number for enquiries (same format as home component)
  whatsappNumber = environment.contact.whatsappNumber;


  // Scroll helper used by modal 'View section' button
  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Navigate to the contact page
  goToContact() {
    this.router.navigate(['/contact']);
  }

  // Navigate to the Feedback page
  openFeedbackForService(): void {
    this.router.navigate(['/feedback']);
  }

  // Format price string into small HTML with spans for styling ranges and prefixes.
  formatPrice(raw: string) {
    if (!raw) return '';
    // common prefixes like 'Starts at' or 'Starting' - separate them
    const prefixMatch = raw.match(/^(Starts at|Starting at|Starts|Starting)\s*/i);
    let prefix = '';
    let rest = raw;
    if (prefixMatch) {
      prefix = prefixMatch[0].trim();
      rest = raw.slice(prefixMatch[0].length).trim();
    }

    // handle ranges with dash or hyphen
    const rangeSep = rest.includes('-') ? '-' : rest.includes('–') ? '–' : null;
    if (rangeSep) {
      const parts = rest.split(/[-–]/).map(p => p.trim());
      return `${prefix ? `<span class="price-prefix">${prefix}</span> ` : ''}<span class="price-amount"><span class="price-val">${parts[0]}</span><span class="price-range-sep"> - </span><span class="price-val">${parts[1]}</span></span>`;
    }

    return `${prefix ? `<span class="price-prefix">${prefix}</span> ` : ''}<span class="price-amount">${rest}</span>`;
  }

}