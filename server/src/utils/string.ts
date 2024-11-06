export function maskPII(value: unknown): unknown {
  if (typeof value === 'string') {
    // Mask email addresses
    if (value.includes('@')) {
      const [localPart, domain] = value.split('@');
      return `${localPart[0]}***@${domain}`;
    }
    // Mask phone numbers
    if (/^\d{10}$/.test(value)) {
      return `${value.slice(0, 3)}-***-****`;
    }
  }
  return value;
}
