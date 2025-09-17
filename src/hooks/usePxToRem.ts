/**
 * Hook for converting pixel values to rem units
 * Rem is relative to the root font-size (typically 16px)
 * This helps create scalable, responsive designs
 */

export const usePxToRem = () => {
  /**
   * Converts pixel value to rem
   * @param px - Pixel value to convert (can be string with 'px' suffix or number)
   * @param base - Base font size in px (default: 16px which is browser default)
   * @returns String with rem value (e.g., "1rem")
   */
  const pxToRem = (px: number | string, base: number = 16): string => {
    // Handle string inputs with px suffix
    let pixelValue: number;

    if (typeof px === 'string') {
      // Remove 'px' suffix and parse as number
      pixelValue = parseFloat(px.replace(/px$/, ''));
      if (isNaN(pixelValue)) {
        throw new Error(`Invalid px value: ${px}`);
      }
    } else {
      pixelValue = px;
    }

    // Convert to rem
    const remValue = pixelValue / base;

    // Return as string with rem suffix
    // Use appropriate precision (up to 4 decimal places for common fractions)
    const rounded = Math.round(remValue * 10000) / 10000;
    return `${rounded}rem`;
  };

  /**
   * Batch converts multiple pixel values
   * @param pixels - Array of pixel values or single value
   * @param base - Base font size in px (default: 16px)
   * @returns Array of rem strings or single rem string
   */
  const pxToRemBatch = (
    pixels: (number | string)[] | number | string,
    base: number = 16
  ): string[] | string => {
    if (!Array.isArray(pixels)) {
      return pxToRem(pixels, base);
    }
    return pixels.map(pixel => pxToRem(pixel, base));
  };

  /**
   * Converts rem back to px (useful for calculations)
   * @param rem - Rem value to convert (can be string with 'rem' suffix or number)
   * @param base - Base font size in px (default: 16px)
   * @returns Number with px value
   */
  const remToPx = (rem: number | string, base: number = 16): number => {
    let remValue: number;

    if (typeof rem === 'string') {
      remValue = parseFloat(rem.replace(/rem$/, ''));
      if (isNaN(remValue)) {
        throw new Error(`Invalid rem value: ${rem}`);
      }
    } else {
      remValue = rem;
    }

    return remValue * base;
  };

  /**
   * Get the current root font size
   * @returns Computed font-size in px of the root element
   */
  const getRootFontSize = (): number => {
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      return parseFloat(computedStyle.fontSize);
    }
    return 16; // Default browser font size
  };

  return {
    pxToRem,
    pxToRemBatch,
    remToPx,
    getRootFontSize
  };
};

export default usePxToRem;
