import { useMemo } from 'react';

export const useColorCanvasStyles = () => {
  const colorCanvasStyles = useMemo(() => ({
    container: 'mt-4 md:mt-6 flex flex-col items-center gap-3 md:gap-4',
    title: 'text-lg md:text-2xl font-bold text-gray-800 m-0 text-center',
    canvasContainer: 'border-2 md:border-4 border-gray-700 rounded-xl overflow-hidden shadow-lg md:shadow-2xl bg-gray-100',
    colorSwatches: 'flex flex-wrap gap-2 md:gap-4 justify-center mt-3',
    colorSwatch: 'w-8 md:w-10 h-8 md:h-10 rounded-lg border-2 border-gray-300 cursor-pointer relative',
    infoText: 'text-xs md:text-sm text-gray-600 text-center mt-3',
  }), []);

  return { colorCanvasStyles };
};
