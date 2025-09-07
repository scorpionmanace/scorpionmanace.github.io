import { useMemo } from 'react';

export const useColorPickerStyles = () => {
  const colorPickerStyles = useMemo(() => ({
    container: 'max-w-6xl mx-auto px-4 py-8 min-h-screen',
    header: 'text-center mb-10',
    title: 'text-4xl font-bold text-gray-800 mb-4',
    subtitle: 'text-lg text-gray-600 max-w-2xl mx-auto',
    infoMessage: 'max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl border border-gray-200 mb-10',
    infoTitle: 'text-xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-2',
    infoText: 'text-gray-700 text-sm leading-relaxed text-left',
    controls: 'flex flex-wrap gap-4 justify-center mb-10',
    controlButton: (isActive: boolean) => 
      `px-6 py-3 rounded-lg font-bold text-white transition-all duration-300 shadow-lg ${
        isActive 
          ? 'bg-gray-500 hover:bg-gray-600 transform hover:-translate-y-1' 
          : 'bg-red-500 hover:bg-red-600 transform hover:-translate-y-1'
      }`,
    canvasPreview: 'mt-8 mb-12',
    canvasTitle: 'text-3xl font-bold text-gray-800 text-center mb-6',
    patternButtons: 'flex flex-wrap justify-center gap-3 mb-6',
    patternButton: (isActive: boolean) => 
      `px-4 py-2 rounded-lg font-bold transition-all duration-200 ${
        isActive 
          ? 'bg-blue-500 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`,
    colorDetails: 'fixed bottom-5 right-5 bg-white p-6 rounded-xl shadow-2xl min-w-[300px] z-50 border border-gray-200',
    colorDetailsTitle: 'text-xl font-bold text-gray-800 mb-4',
    colorSwatch: 'w-full h-20 rounded-lg mb-4',
    colorInfo: 'text-sm text-gray-700 mb-1',
    colorWheel: 'mt-10 p-8 bg-white rounded-xl shadow-lg',
    wheelTitle: 'text-2xl font-bold text-gray-800 mb-6 text-center',
    wheelColors: 'flex flex-wrap gap-2 justify-center',
    paletteSection: 'mt-12 mb-10',
    paletteTitle: 'text-3xl font-bold text-gray-800 text-center mb-8',
    paletteContainer: 'space-y-12',
    paletteDisplay: 'mb-10 p-6 bg-white rounded-xl shadow-lg',
    paletteHeader: 'flex flex-wrap justify-between items-center mb-6 gap-4',
    paletteName: 'text-2xl font-bold text-gray-800 m-0',
    paletteActions: 'flex flex-wrap gap-3',
    exportButton: (type: string) => 
      `px-4 py-2 rounded-lg font-bold transition-all duration-200 flex items-center gap-2 ${
        type === 'csv' 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`,
    paletteColors: 'flex flex-wrap gap-3 mb-4',
    colorSwatchSmall: (isSelected: boolean) => 
      `w-15 h-15 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'border-gray-800 shadow-lg scale-110' 
          : 'border-gray-300 hover:border-gray-500 hover:shadow-md'
      }`,
    tempTags: 'flex flex-wrap gap-2 mt-4',
    tempTag: 'px-3 py-1 rounded-full text-xs font-medium',
    tempTagWarm: 'bg-red-100 text-red-800',
    tempTagCool: 'bg-blue-100 text-blue-800',
    tempTagNeutral: 'bg-gray-100 text-gray-800',
  }), []);

  return { colorPickerStyles };
};
