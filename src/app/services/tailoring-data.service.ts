import { Injectable } from '@angular/core';
import { PRICING_ROWS, SERVICE_CATEGORIES, PORTFOLIO_ITEMS, TailoringService } from '../shared/services.shared';
import type { PortfolioItem } from '../shared/services.shared';

@Injectable({ providedIn: 'root' })
export class TailoringDataService {
  constructor() {}

  /** Pricing rows used on the services page */
  getPricingRows() {
    return PRICING_ROWS;
  }

  /** Service categories (used in Services page and for home cards) */
  getServiceCategories() {
    return SERVICE_CATEGORIES;
  }

  /** Portfolio items for gallery display */
  getPortfolioItems(): PortfolioItem[] {
    return PORTFOLIO_ITEMS;
  }

  /** Get single portfolio item by ID */
  getPortfolioItemById(id: string): PortfolioItem | undefined {
    return PORTFOLIO_ITEMS.find((item: PortfolioItem) => item.id === id);
  }

  /** Get portfolio items filtered by category */
  getPortfolioItemsByCategory(category: string | 'all'): PortfolioItem[] {
    if (category === 'all') {
      return PORTFOLIO_ITEMS;
    }
    return PORTFOLIO_ITEMS.filter((item: PortfolioItem) => item.category === category);
  }
}
