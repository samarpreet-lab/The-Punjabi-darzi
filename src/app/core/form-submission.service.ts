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
  async submitToFormspree(
    endpointUrl: string,
    payload: any,
    mailtoFallback?: MailtoFallback
  ): Promise<void> {
    // Check if the endpoint is valid (not empty, not a placeholder like YOUR_FORM_ID)
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

        // Success! Promise resolves
        return;
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
      // Fallback triggered successfully; promise resolves (user action is the intended outcome)
      return;
    }

    // If no fallback was provided, throw an error
    throw new Error('Form submission failed and no mailto fallback was provided.');
  }
  private openMailtoFallback(mailtoFallback: MailtoFallback): void {
    const { recipient, subject, body, replyTo } = mailtoFallback;

    let mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (replyTo) {
      mailto += `&cc=${encodeURIComponent(replyTo)}`;
    }

    console.warn('Using mailto fallback for form submission');
    window.location.href = mailto;
  }
}
