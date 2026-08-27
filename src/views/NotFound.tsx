import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { ease } from '../design/motion';

const NotFound: React.FC = () => (
  <div className="relative flex flex-1 items-center overflow-hidden bg-canvas">
    <div className="grid-bg fade-edges pointer-events-none absolute inset-0" aria-hidden="true" />

    <div className="relative mx-auto w-full max-w-content px-5 py-28 text-center sm:px-8 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-[-0.02em] text-ink md:text-7xl">
          This page went missing.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
          The link may be out of date, or the page moved during the redesign. The tools are all
          still here.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/" size="lg">
            Back home
          </Button>
          <Button to="/tools" variant="secondary" size="lg">
            Browse tools
          </Button>
        </div>
      </motion.div>
    </div>
  </div>
);

export default NotFound;
