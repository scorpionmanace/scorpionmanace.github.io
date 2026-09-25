import React from 'react';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { InkLoop } from '../components/notebook/Ink';

/** A page that was torn out. */
const NotFound: React.FC = () => (
  <div className="grid-bg paper relative flex flex-1 items-center bg-canvas px-5 py-24 sm:px-8 md:py-36">
    <div className="mx-auto w-full max-w-content">
      <div className="max-w-3xl">
        <p className="font-display text-[0.9rem] font-[720] uppercase tracking-[0.12em] text-muted">
          Page 404
        </p>
        <h1 className="mt-5 font-display text-[3.6rem] font-[820] uppercase leading-[0.9] text-ink md:text-[6rem]">
          This page was{' '}
          <span className="relative inline-block">
            torn out
            <InkLoop className="absolute -inset-x-4 -inset-y-3 h-[calc(100%+1.5rem)] w-[calc(100%+2rem)]" tone="witness" delay={0.3} />
          </span>
          .
        </h1>
        <p className="mt-8 max-w-lg text-[1.1875rem] leading-relaxed text-ink-soft">
          The link may be out of date, or the page moved when the notebook was rebound. Everything
          else is still here.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/" size="lg">
            Back to the first page
          </Button>
          <Button to="/tools" variant="secondary" size="lg">
            The tool drawer
            <Icon name="arrowRight" />
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
