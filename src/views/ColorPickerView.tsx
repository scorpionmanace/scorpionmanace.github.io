import React from 'react';
import ColorPicker from '../components/ColorPicker/ColorPicker';

const ColorPickerView: React.FC = () => {
  return (
    <main className="bg-gray-100 min-h-screen">
      <ColorPicker />
    </main>
  );
};

export default ColorPickerView;
