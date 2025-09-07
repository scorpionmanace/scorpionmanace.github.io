import { useMemo } from 'react';

export const useSubHeaderStyles = () => {
  const subHeaderStyles = useMemo(() => ({
    header: 'bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-200 py-3 px-8 justify-center items-center relative z-40 font-system sticky top-21 flex gap-12',
    nav: {
      list: 'flex gap-12 p-0 m-0',
      link: 'text-gray-700 font-medium px-3 py-2 rounded-lg no-underline transition-all duration-200 hover:bg-gray-200 hover:text-gray-900',
    },
  }), []);

  return { subHeaderStyles };
};
