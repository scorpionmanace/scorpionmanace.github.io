import React, { Suspense } from 'react';
import ToolLayout from '../../../components/layout/ToolLayout';

const JSONParser = React.lazy(() => import('./JSONParser'));

const JSONParserView: React.FC = () => (
  <ToolLayout
    title="JSON Parser"
    description="Parse, validate, and beautify JSON with inline error reporting and a collapsible tree view."
    icon="{ }"
    category="Data"
  >
    <div className="p-5 md:p-7">
      <Suspense fallback={<p className="eyebrow">Loading parser…</p>}>
        <JSONParser />
      </Suspense>
    </div>
  </ToolLayout>
);

export default JSONParserView;
