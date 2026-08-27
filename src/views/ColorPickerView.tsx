import React from 'react';
import ToolLayout from '../components/layout/ToolLayout';
import ColorPicker from '../components/ColorPicker/ColorPicker';

const ColorPickerView: React.FC = () => (
  <ToolLayout
    title="Color Picker"
    description="Sample colors from an image or build palettes by hand, with HEX, RGB, and HSL readouts plus CSV and Figma export."
    icon="◐"
    category="Design"
  >
    <div className="p-5 md:p-7">
      <ColorPicker />
    </div>
  </ToolLayout>
);

export default ColorPickerView;
