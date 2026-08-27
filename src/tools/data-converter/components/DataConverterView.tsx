import React, { useRef } from 'react';
import ToolLayout from '../../../components/layout/ToolLayout';
import { Button } from '../../../components/ui/Button';
import { ErrorBanner, Field, Select, TextArea } from '../../../components/ui/Field';
import { useDataConverter } from '../hooks';

const CONVERSIONS = [
  { value: 'json-to-csv', label: 'JSON → CSV' },
  { value: 'csv-to-json', label: 'CSV → JSON' },
  { value: 'json-to-xml', label: 'JSON → XML' },
];

const DataConverterView: React.FC = () => {
  const {
    input,
    output,
    conversionType,
    error,
    isLoading,
    setInput,
    setConversionType,
    handleFileUpload,
    handleConvert,
    handleDownload,
  } = useDataConverter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <ToolLayout
      title="Data Converter"
      description="Convert between JSON, CSV, and XML. Upload a file or paste directly — everything is processed in your browser."
      icon="⇋"
      category="Data"
      actions={
        <>
          <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
            <span aria-hidden="true">↑</span>
            Upload file
          </Button>
          {output && (
            <Button variant="secondary" onClick={handleDownload}>
              <span aria-hidden="true">↓</span>
              Download
            </Button>
          )}
        </>
      }
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.csv,.xml,.txt"
        onChange={handleFileUpload}
        className="sr-only"
        aria-label="Upload a data file"
      />

      <div className="flex flex-col gap-6 p-5 md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Field label="Conversion" htmlFor="conversion-type" className="sm:max-w-56 sm:flex-1">
            <Select
              id="conversion-type"
              value={conversionType}
              onChange={(event) => setConversionType(event.target.value as never)}
            >
              {CONVERSIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </Field>

          <Button onClick={handleConvert} disabled={isLoading || !input.trim()}>
            {isLoading ? 'Converting…' : 'Convert'}
            <span aria-hidden="true">→</span>
          </Button>
        </div>

        <ErrorBanner message={error} />

        <div className="grid gap-5 lg:grid-cols-2">
          <Field
            label="Input"
            htmlFor="converter-input"
            hint="Paste your data, or use the upload button above."
          >
            <TextArea
              id="converter-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={18}
              placeholder='{ "example": "paste your data here" }'
            />
          </Field>

          <Field label="Output" htmlFor="converter-output">
            <TextArea
              id="converter-output"
              value={output}
              readOnly
              rows={18}
              placeholder="Converted output appears here."
              className="bg-sunken"
            />
          </Field>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DataConverterView;
