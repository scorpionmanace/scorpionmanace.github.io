import React, { useState } from 'react';
import { useJSONParser } from '../hooks/useJSONParser';
import { Button } from '../../../components/ui/Button';
import { ErrorBanner, Field, TextArea } from '../../../components/ui/Field';

const JSONParser: React.FC = () => {
  const { inputJSON, formattedJSON, error, setInputJSON, parseJSON, isValid } = useJSONParser();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!formattedJSON) return;
    try {
      await navigator.clipboard.writeText(formattedJSON);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard access can be denied; the textarea is still selectable. */
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={parseJSON} disabled={!inputJSON.trim()}>
          Validate &amp; format
          <span aria-hidden="true">→</span>
        </Button>
        <Button variant="secondary" onClick={handleCopy} disabled={!formattedJSON}>
          {copied ? 'Copied' : 'Copy result'}
        </Button>
        {inputJSON.trim() !== '' && !error && isValid && formattedJSON && (
          <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
            ✓ Valid JSON
          </span>
        )}
      </div>

      <ErrorBanner message={error} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Field label="Input" htmlFor="json-input" hint="Accepts JSON or a stringified JSON value.">
          <TextArea
            id="json-input"
            value={inputJSON}
            onChange={(event) => setInputJSON(event.target.value)}
            rows={18}
            placeholder='{ "hello": "world" }'
            aria-invalid={!isValid}
          />
        </Field>

        <Field label="Formatted" htmlFor="json-output">
          <TextArea
            id="json-output"
            value={formattedJSON}
            readOnly
            rows={18}
            placeholder="Beautified JSON appears here."
            className="bg-sunken"
          />
        </Field>
      </div>
    </div>
  );
};

export default JSONParser;
