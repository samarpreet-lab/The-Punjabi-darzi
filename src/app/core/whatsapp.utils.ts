
export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Opens a WhatsApp link in a new browser tab/window.
 * Uses window.open with fallback to location.href for browsers that block pop-ups.
 */
export function openWhatsAppLink(url: string): void {
  try {
    window.open(url, '_blank', 'noopener');
  } catch (e) {
    // Fallback if window.open is blocked
    location.href = url;
  }
}
