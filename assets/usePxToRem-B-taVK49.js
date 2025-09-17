const usePxToRem = () => {
  const pxToRem = (px, base = 16) => {
    let pixelValue;
    if (typeof px === "string") {
      pixelValue = parseFloat(px.replace(/px$/, ""));
      if (isNaN(pixelValue)) {
        throw new Error(`Invalid px value: ${px}`);
      }
    } else {
      pixelValue = px;
    }
    const remValue = pixelValue / base;
    const rounded = Math.round(remValue * 1e4) / 1e4;
    return `${rounded}rem`;
  };
  const pxToRemBatch = (pixels, base = 16) => {
    if (!Array.isArray(pixels)) {
      return pxToRem(pixels, base);
    }
    return pixels.map((pixel) => pxToRem(pixel, base));
  };
  const remToPx = (rem, base = 16) => {
    let remValue;
    if (typeof rem === "string") {
      remValue = parseFloat(rem.replace(/rem$/, ""));
      if (isNaN(remValue)) {
        throw new Error(`Invalid rem value: ${rem}`);
      }
    } else {
      remValue = rem;
    }
    return remValue * base;
  };
  const getRootFontSize = () => {
    if (typeof window !== "undefined") {
      const computedStyle = getComputedStyle(document.documentElement);
      return parseFloat(computedStyle.fontSize);
    }
    return 16;
  };
  return {
    pxToRem,
    pxToRemBatch,
    remToPx,
    getRootFontSize
  };
};
export {
  usePxToRem as u
};
