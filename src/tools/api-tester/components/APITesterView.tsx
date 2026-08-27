import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ToolLayout from '../../../components/layout/ToolLayout';
import { Button } from '../../../components/ui/Button';
import { ErrorBanner, Field, Input, Select, TextArea } from '../../../components/ui/Field';
import { ease } from '../../../design/motion';
import { cn } from '../../../components/ui/cn';
import { useApiTester } from '../hooks';

const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'];

const statusTone = (status: number) => {
  if (status >= 200 && status < 300) return 'text-emerald-600 dark:text-emerald-400';
  if (status >= 300 && status < 400) return 'text-sky-600 dark:text-sky-400';
  if (status >= 400 && status < 500) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
};

/** Pretty-print JSON bodies; leave anything else untouched. */
const formatBody = (body: string) => {
  try {
    return JSON.stringify(JSON.parse(body), null, 2);
  } catch {
    return body;
  }
};

const APITesterView: React.FC = () => {
  const { request, response, isLoading, error, updateRequest, addHeader, removeHeader, sendRequest } =
    useApiTester();

  const [headerKey, setHeaderKey] = useState('');
  const [headerValue, setHeaderValue] = useState('');
  const [tab, setTab] = useState<'body' | 'headers'>('body');

  const headerEntries = Object.entries(request.headers);
  const bodyAllowed = request.method !== 'GET' && request.method !== 'HEAD';

  const commitHeader = () => {
    const key = headerKey.trim();
    if (!key) return;
    addHeader(key, headerValue.trim());
    setHeaderKey('');
    setHeaderValue('');
  };

  return (
    <ToolLayout
      title="API Tester"
      description="Send REST requests with custom methods, headers, and bodies, then inspect the status, headers, and payload that come back."
      icon="⇄"
      category="Web"
    >
      <div className="flex flex-col gap-6 p-5 md:p-7">
        {/* Request line */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            sendRequest();
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Select
            value={request.method}
            onChange={(event) => updateRequest('method', event.target.value)}
            aria-label="HTTP method"
            className="sm:w-36"
          >
            {METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </Select>

          <Input
            type="url"
            value={request.url}
            onChange={(event) => updateRequest('url', event.target.value)}
            placeholder="https://api.example.com/v1/resource"
            aria-label="Request URL"
            className="flex-1 font-mono text-[0.8125rem]"
          />

          <Button type="submit" disabled={isLoading || !request.url}>
            {isLoading ? 'Sending…' : 'Send'}
            <span aria-hidden="true">→</span>
          </Button>
        </form>

        <ErrorBanner message={error} />

        {/* Request tabs */}
        <div>
          <div className="flex gap-1 border-b border-line" role="tablist" aria-label="Request details">
            {(['body', 'headers'] as const).map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={tab === item}
                onClick={() => setTab(item)}
                className={cn(
                  'relative px-4 py-2.5 text-sm capitalize transition-colors',
                  tab === item ? 'text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {item}
                {item === 'headers' && headerEntries.length > 0 && (
                  <span className="ml-1.5 font-mono text-xs text-faint">{headerEntries.length}</span>
                )}
                {tab === item && (
                  <motion.span
                    layoutId="api-tab-underline"
                    className="absolute inset-x-0 -bottom-px h-0.5 bg-accent"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="pt-5">
            {tab === 'body' ? (
              <Field
                label="Request body"
                htmlFor="request-body"
                hint={bodyAllowed ? 'JSON, form data, or plain text.' : `${request.method} requests do not send a body.`}
              >
                <TextArea
                  id="request-body"
                  value={request.body}
                  onChange={(event) => updateRequest('body', event.target.value)}
                  rows={8}
                  disabled={!bodyAllowed}
                  placeholder={bodyAllowed ? '{\n  "key": "value"\n}' : ''}
                />
              </Field>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={headerKey}
                    onChange={(event) => setHeaderKey(event.target.value)}
                    placeholder="Header name"
                    aria-label="Header name"
                    className="sm:flex-1"
                  />
                  <Input
                    value={headerValue}
                    onChange={(event) => setHeaderValue(event.target.value)}
                    placeholder="Value"
                    aria-label="Header value"
                    className="sm:flex-1"
                  />
                  <Button variant="secondary" onClick={commitHeader} disabled={!headerKey.trim()}>
                    Add
                  </Button>
                </div>

                {headerEntries.length > 0 ? (
                  <ul className="flex flex-col gap-2">
                    {headerEntries.map(([key, value]) => (
                      <li
                        key={key}
                        className="flex items-center justify-between gap-4 rounded-xl border border-line bg-canvas px-4 py-2.5"
                      >
                        <span className="min-w-0 truncate font-mono text-[0.8125rem]">
                          <span className="text-ink">{key}</span>
                          <span className="text-faint">: </span>
                          <span className="text-muted">{value}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeHeader(key)}
                          aria-label={`Remove header ${key}`}
                          className="shrink-0 text-muted transition-colors hover:text-red-500"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-faint">No headers set.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Response */}
        <AnimatePresence>
          {response && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="rounded-2xl border border-line bg-canvas"
              aria-live="polite"
            >
              <header className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-5 py-3.5">
                <span className="eyebrow">Response</span>
                <span className={cn('font-mono text-sm font-medium', statusTone(response.status))}>
                  {response.status} {response.statusText}
                </span>
                <span className="font-mono text-xs text-faint">
                  {new Blob([response.body]).size} bytes
                </span>
              </header>

              <div className="p-5">
                <pre className="max-h-96 overflow-auto rounded-xl bg-sunken p-4 font-mono text-[0.8125rem] leading-relaxed text-ink-soft">
                  {formatBody(response.body)}
                </pre>

                {Object.keys(response.headers).length > 0 && (
                  <details className="mt-4">
                    <summary className="eyebrow cursor-pointer select-none transition-colors hover:text-accent">
                      Response headers ({Object.keys(response.headers).length})
                    </summary>
                    <ul className="mt-3 flex flex-col gap-1.5">
                      {Object.entries(response.headers).map(([key, value]) => (
                        <li key={key} className="font-mono text-xs">
                          <span className="text-ink-soft">{key}</span>
                          <span className="text-faint">: </span>
                          <span className="text-muted">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <p className="text-xs leading-relaxed text-faint">
          Requests are sent straight from your browser, so cross-origin endpoints must return
          permissive CORS headers to be readable here.
        </p>
      </div>
    </ToolLayout>
  );
};

export default APITesterView;
