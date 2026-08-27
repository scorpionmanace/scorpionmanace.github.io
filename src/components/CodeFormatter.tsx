import React, { useState } from 'react';
import ToolLayout from './layout/ToolLayout';
import { Button } from './ui/Button';
import { ErrorBanner, Field, Select, TextArea } from './ui/Field';
import { useCodeFormatter } from '../hooks/useCodeFormatter';
import { cn } from './ui/cn';

const CodeFormatter: React.FC = () => {
  const {
    languages,
    selectedLanguage,
    codeInput,
    formattedCode,
    isFormatting,
    error,
    setCodeInput,
    formatCode,
    loadSample,
    copyToClipboard,
    getLanguage,
    quickSamples,
    canFormat,
    canCopy,
  } = useCodeFormatter();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard();
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Code Formatter"
      description="Format and indent source across a range of languages. Pick a language, paste your code, and clean it up."
      icon="⌘"
      category="Development"
      actions={
        <Button variant="secondary" onClick={handleCopy} disabled={!canCopy}>
          {copied ? 'Copied' : 'Copy output'}
        </Button>
      }
    >
      <div className="flex flex-col gap-6 p-5 md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Field label="Language" htmlFor="formatter-language" className="sm:max-w-64 sm:flex-1">
            <Select
              id="formatter-language"
              value={selectedLanguage?.key ?? ''}
              onChange={(event) => {
                const language = getLanguage(event.target.value);
                if (language) loadSample(language);
              }}
            >
              {languages.map((language) => (
                <option key={language.key} value={language.key}>
                  {language.name}
                </option>
              ))}
            </Select>
          </Field>

          <Button onClick={formatCode} disabled={!canFormat || isFormatting}>
            {isFormatting ? 'Formatting…' : 'Format code'}
            <span aria-hidden="true">→</span>
          </Button>
        </div>

        {/* Quick samples */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Samples</span>
          {quickSamples.map((language) => (
            <button
              key={language.key}
              type="button"
              onClick={() => loadSample(language)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-[0.8125rem] transition-colors',
                selectedLanguage?.key === language.key
                  ? 'border-accent bg-accent-soft text-accent'
                  : 'border-line text-muted hover:border-line-strong hover:text-ink',
              )}
            >
              {language.name}
            </button>
          ))}
        </div>

        <ErrorBanner message={error} />

        <div className="grid gap-5 lg:grid-cols-2">
          <Field label="Source" htmlFor="formatter-input">
            <TextArea
              id="formatter-input"
              value={codeInput}
              onChange={(event) => setCodeInput(event.target.value)}
              rows={20}
              placeholder="Paste your code here…"
            />
          </Field>

          <Field label="Formatted" htmlFor="formatter-output">
            <TextArea
              id="formatter-output"
              value={formattedCode}
              readOnly
              rows={20}
              placeholder="Formatted output appears here."
              className="bg-sunken"
            />
          </Field>
        </div>
      </div>
    </ToolLayout>
  );
};

export default CodeFormatter;
