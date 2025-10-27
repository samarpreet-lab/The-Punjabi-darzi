import { Injectable } from '@angular/core';

/**
 * Fallback configuration for mailto: submission
 */
export interface MailtoFallback {
  recipient: string;
  subject: string;
  body: string;
  replyTo?: string;
}

/**
 * FormSubmissionService handles POST requests to Formspree endpoints
 * with automatic mailto: fallback support. Consolidates duplicated
 * form submission logic across multiple components.
 */
@Injectable({
  providedIn: 'root'
})
export class FormSubmissionService {
  constructor() {}

  /**
   * Submit form data to a Formspree endpoint with automatic mailto: fallback.
   *
   * @param endpointUrl - The Formspree endpoint URL (e.g., https://formspree.io/f/xxxxx)
   * @param payload - The data object to POST
   * @param mailtoFallback - Optional mailto: fallback configuration (used if Formspree fails or is unconfigured)
   * @returns Promise<boolean> - true if submission was successful, false if fallback was used
   * @throws Error - if both Formspree and mailto fallback fail
   */
  async submitToFormspree(
    endpointUrl: string,
    payload: any,
    mailtoFallback?: MailtoFallback
  ): Promise<boolean> {
    // Check if the endpoint is valid (not empty, not a placeholder)
    const isEndpointValid =
      endpointUrl &&
      endpointUrl.trim().length > 0 &&
      !endpointUrl.includes('YOUR_FORM_ID');

    if (isEndpointValid) {
      try {
        const res = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          // Try to read error text for debugging
          let errText = '';
          try {
            errText = await res.text();
          } catch (e) {
            // ignore if unable to read error text
          }
          throw new Error(`Formspree error: ${res.status} ${res.statusText} ${errText}`);
        }

        // Success! No need for fallback
        return true;
      } catch (err: any) {
        console.error('Formspree submission failed:', err);
        // Fall through to mailto fallback
      }
    } else if (endpointUrl && !isEndpointValid) {
      console.warn('Formspree endpoint not configured or is placeholder. Using mailto fallback.');
    }

    // Fallback to mailto if provided
    if (mailtoFallback) {
      this.openMailtoFallback(mailtoFallback);
      return false; // Indicate fallback was used
    }

    // If no fallback was provided, throw an error
    throw new Error('Form submission failed and no mailto fallback was provided.');
  }

  /**
   * Opens the user's mail client with pre-filled mailto: link.
   * Supports optional replyTo field which becomes cc= in the mailto: URL.
   *
   * @param mailtoFallback - Configuration object with recipient, subject, body, and optional replyTo
   */
  private openMailtoFallback(mailtoFallback: MailtoFallback): void {
    const { recipient, subject, body, replyTo } = mailtoFallback;

    let mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (replyTo) {
      mailto += `&cc=${encodeURIComponent(replyTo)}`;
    }

    console.warn('Using mailto fallback for form submission');
    window.location.href = mailto;
  }
}
