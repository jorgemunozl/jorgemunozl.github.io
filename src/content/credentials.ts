/**
 * Awards and certifications shown on /about/awards and /about/certifications.
 * Add PDFs under public/pdfs/ and reference them with paths like `/pdfs/your-file.pdf`.
 */
export type CredentialPdf = {
  id: string;
  title: string;
  /** Optional organization that issued the credential */
  issuer?: string;
  /** Optional date (any display string, e.g. "2025" or "March 2024") */
  date?: string;
  /** URL path to the PDF (served from public/) */
  pdfUrl: string;
};

/** Replace with your award PDFs when ready. */
export const awards: CredentialPdf[] = [];

/** Replace with your certification PDFs when ready. */
export const certifications: CredentialPdf[] = [];
