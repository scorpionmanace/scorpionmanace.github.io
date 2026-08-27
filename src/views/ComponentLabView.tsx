import React from 'react';
import ToolLayout from '../components/layout/ToolLayout';
import ComponentLab from '../components/ComponentLab';

const ComponentLabView: React.FC = () => (
  <ToolLayout
    title="Component Lab"
    description="A living reference of the tokens, type scale, and component primitives every tool on this site is built from."
    icon="◫"
    category="Design"
  >
    <div className="p-5 md:p-7">
      <ComponentLab />
    </div>
  </ToolLayout>
);

export default ComponentLabView;
