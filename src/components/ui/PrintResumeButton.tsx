import React from 'react';
import { Button } from './Button';

/**
 * Hands the résumé to the browser's own print pipeline.
 *
 * This replaced an html2canvas + jsPDF rasteriser: that approach produced a
 * blurry image-only PDF, broke on modern CSS color syntax, and pulled ~500KB
 * into the bundle. Printing keeps the text selectable and searchable, and the
 * `@media print` rules in index.css drop the site chrome.
 */
export const PrintResumeButton: React.FC = () => (
  <Button
    variant="secondary"
    onClick={() => window.print()}
    className="no-print"
    aria-label="Print or save this résumé as a PDF"
  >
    <span aria-hidden="true">↓</span>
    Save as PDF
  </Button>
);

export default PrintResumeButton;
