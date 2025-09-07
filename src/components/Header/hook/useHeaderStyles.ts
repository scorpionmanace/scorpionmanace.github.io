import { useMemo } from 'react';

export const useHeaderStyles = () => {
  const headerStyles = useMemo(() => ({
    header: 'bg-gradient-to-br from-blue-900 to-blue-800 shadow-lg p-4 flex justify-center items-center font-system sticky top-0 z-50',
    logoContainer: 'flex items-center',
    logo: 'w-10 h-10 mr-3',
    logoText: 'text-xl font-bold text-white no-underline',
  }), []);

  return { headerStyles };
};
