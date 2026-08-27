import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ToolLayout from './layout/ToolLayout';
import { Button } from './ui/Button';
import { ErrorBanner } from './ui/Field';
import { useCodePlayground } from '../hooks/useCodePlayground';
import { cn } from './ui/cn';

type PaneKey = 'html' | 'css' | 'js';

const PANES: Array<{ key: PaneKey; label: string }> = [
  { key: 'html', label: 'HTML' },
  { key: 'css', label: 'CSS' },
  { key: 'js', label: 'JavaScript' },
];

const EXAMPLES = [
  { key: 'interactive-button', label: 'Interactive button' },
  { key: 'canvas-drawing', label: 'Canvas drawing' },
  { key: 'local-storage', label: 'Local storage' },
];

const CodePlayground: React.FC = () => {
  const { html, css, js, error, setHtml, setCss, setJs, runCode, resetCode, loadExample, iframeRef } =
    useCodePlayground();

  const [pane, setPane] = useState<PaneKey>('html');

  const value = { html, css, js }[pane];
  const setValue = { html: setHtml, css: setCss, js: setJs }[pane];

  // Render once on mount so the preview is never an empty frame.
  useEffect(() => {
    runCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cmd/Ctrl+Enter runs the code, matching editor conventions.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        runCode();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [runCode]);

  return (
    <ToolLayout
      title="Code Playground"
      description="Write HTML, CSS, and JavaScript side by side and render the result live in a sandboxed frame."
      icon="▶"
      category="Development"
      actions={
        <>
          <Button variant="secondary" onClick={resetCode}>
            Reset
          </Button>
          <Button onClick={runCode}>
            Run
            <kbd className="ml-1 font-mono text-[0.6875rem] opacity-70">⌘↵</kbd>
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-5 p-5 md:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Examples</span>
          {EXAMPLES.map((example) => (
            <button
              key={example.key}
              type="button"
              onClick={() => loadExample(example.key)}
              className="rounded-full border border-line px-3 py-1.5 text-[0.8125rem] text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              {example.label}
            </button>
          ))}
        </div>

        <ErrorBanner message={error} />

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Editor */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-line">
            <div className="flex border-b border-line bg-sunken" role="tablist" aria-label="Editor panes">
              {PANES.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={pane === item.key}
                  onClick={() => setPane(item.key)}
                  className={cn(
                    'relative px-4 py-2.5 font-mono text-xs tracking-wide transition-colors',
                    pane === item.key ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  {item.label}
                  {pane === item.key && (
                    <motion.span
                      layoutId="playground-tab"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>

            <textarea
              value={value}
              onChange={(event) => setValue(event.target.value)}
              spellCheck={false}
              aria-label={`${pane.toUpperCase()} source`}
              className="h-[28rem] w-full resize-none bg-canvas p-4 font-mono text-[0.8125rem] leading-relaxed text-ink focus:outline-none"
            />
          </div>

          {/* Preview */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-line">
            <div className="flex items-center gap-2 border-b border-line bg-sunken px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
              </span>
              <span className="eyebrow ml-1">Preview</span>
            </div>

            <iframe
              ref={iframeRef}
              title="Code preview"
              sandbox="allow-scripts allow-modals"
              className="h-[28rem] w-full border-0 bg-white"
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CodePlayground;
