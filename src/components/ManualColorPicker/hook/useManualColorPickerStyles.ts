import { useMemo } from 'react';

export const useManualColorPickerStyles = () => {
  const manualColorPickerStyles = useMemo(() => ({
    container: 'mt-6 md:mt-10 p-4 md:p-6 bg-white rounded-2xl shadow-lg',
    title: 'text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center',
    colorTools: 'flex flex-col gap-4 md:gap-6 mb-8',
    colorInputSection: 'flex flex-wrap gap-4 md:gap-6 items-center justify-center',
    hexSection: 'flex flex-col items-center',
    label: 'text-sm text-gray-600 mb-2 flex items-center gap-2',
    colorInput: 'w-28 sm:w-32 h-8 md:h-10 border-2 border-gray-300 rounded-lg cursor-pointer',
    hexTextInput: (isValid: boolean) =>
      `mt-3 p-3 border-2 rounded-lg text-sm w-28 sm:w-32 text-center font-bold ${
        isValid
          ? 'border-gray-300 bg-white text-gray-800'
          : 'border-red-300 bg-red-50 text-red-800'
      }`,
    rgbSection: 'flex gap-2 md:gap-3 items-center',
    rgbSliderContainer: 'flex flex-col items-center',
    rgbLabel: 'text-xs text-gray-600 mb-1',
    rgbSlider: 'w-20 md:w-24 h-2 rounded-lg',
    rgbValue: 'text-xs font-bold text-gray-800 mt-1',
    addButton: (isEnabled: boolean) =>
      `px-3 md:px-5 py-2 md:py-3 rounded-lg font-bold transition-all duration-200 text-sm md:text-base ${
        isEnabled
          ? 'bg-blue-500 hover:bg-blue-600 text-white transform hover:-translate-y-0.5'
          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
      }`,
    paletteSection: 'mb-6',
    paletteHeader: 'flex flex-wrap justify-between items-center mb-4 gap-4',
    paletteTitle: 'text-lg md:text-xl font-semibold text-gray-800 m-0',
    paletteActions: 'flex gap-3 items-center',
    paletteInput: 'p-2 border border-gray-300 rounded-lg text-sm w-32 md:w-40',
    saveButton: 'px-3 md:px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors duration-200 text-sm md:text-base',
    paletteColors: 'flex flex-wrap gap-2 md:gap-3 justify-center',
    colorItem: 'relative flex flex-col items-center',
    colorSwatch: 'w-12 md:w-15 h-12 md:h-15 rounded-lg border-2 border-gray-300 cursor-pointer transition-transform duration-200 hover:scale-110',
    removeButton: 'absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold flex items-center justify-center cursor-pointer hover:bg-red-600',
    colorHex: 'text-xs text-gray-600 mt-1 truncate w-12 md:w-15 text-center',
  }), []);

  return { manualColorPickerStyles };
};
