import React, { useEffect, useMemo, useState } from 'react';
import { Table, defaultTheme, darkTheme } from '@scorpionmanace/tablez';
import type { TablezExample } from '../../data/tablez/examples';
import { useTheme } from '../../contexts/ThemeContext';
import { ErrorBoundary } from '../ui/ErrorBoundary';
import { CodeBlock } from '../ui/CodeBlock';
import { cn } from '../ui/cn';

type EditorTab = 'columns' | 'settings' | 'data' | 'code';
type ThemeChoice = 'auto' | 'light' | 'dark';

const TABS: Array<{ key: EditorTab; label: string }> = [
  { key: 'columns', label: 'Columns' },
  { key: 'settings', label: 'Settings' },
  { key: 'data', label: 'Data' },
  { key: 'code', label: 'Code' },
];

const pretty = (value: unknown) => JSON.stringify(value ?? {}, null, 2);

/** Render a JS value as source text, so the code panel reads like real code. */
const literal = (value: unknown, indent = 0): string => {
  const pad = '  '.repeat(indent);
  const padInner = '  '.repeat(indent + 1);

  if (value === null) return 'null';
  if (Array.isArray(value)) {
    if (value.length === 0) return '[]';
    return `[\n${value.map((v) => `${padInner}${literal(v, indent + 1)}`).join(',\n')}\n${pad}]`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return '{}';
    return `{\n${entries
      .map(([k, v]) => `${padInner}${/^[A-Za-z_$][\w$]*$/.test(k) ? k : `'${k}'`}: ${literal(v, indent + 1)}`)
      .join(',\n')}\n${pad}}`;
  }
  if (typeof value === 'string') return `'${value.replace(/'/g, "\\'")}'`;
  return String(value);
};

interface PlaygroundProps {
  example: TablezExample;
}

export const TablezPlayground: React.FC<PlaygroundProps> = ({ example }) => {
  const { currentTheme } = useTheme();

  const [tab, setTab] = useState<EditorTab>('columns');
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>('auto');
  const [columnsText, setColumnsText] = useState(() => pretty(example.columns));
  const [settingsText, setSettingsText] = useState(() => pretty(example.settings));
  const [dataText, setDataText] = useState(() => pretty(example.data));

  // Swapping examples resets every editor back to that example's config.
  useEffect(() => {
    setColumnsText(pretty(example.columns));
    setSettingsText(pretty(example.settings));
    setDataText(pretty(example.data));
    setTab('columns');
  }, [example]);

  const parsed = useMemo(() => {
    try {
      return {
        columns: JSON.parse(columnsText),
        settings: JSON.parse(settingsText),
        data: JSON.parse(dataText),
        error: null as string | null,
      };
    } catch (error) {
      return { columns: null, settings: null, data: null, error: (error as Error).message };
    }
  }, [columnsText, settingsText, dataText]);

  // Live edits (cell editors, reordering) need somewhere to land.
  const [liveData, setLiveData] = useState<unknown[]>(example.data);
  useEffect(() => {
    if (parsed.data) setLiveData(parsed.data);
  }, [parsed.data]);

  const resolvedDark = themeChoice === 'auto' ? currentTheme === 'dark' : themeChoice === 'dark';

  /**
   * The example's own theme wins when it defines one — the theming example is
   * about its theme, so overriding it would make the docs lie.
   */
  const settingsForRender = useMemo(() => {
    const base = (parsed.settings ?? {}) as Record<string, unknown>;
    if (base.theme) return base;
    return { ...base, theme: resolvedDark ? darkTheme : defaultTheme };
  }, [parsed.settings, resolvedDark]);

  const exampleDefinesTheme = Boolean((parsed.settings as Record<string, unknown> | null)?.theme);

  const generatedCode = useMemo(() => {
    if (parsed.error) return '// Fix the JSON error to regenerate this snippet.';

    const themeImport = exampleDefinesTheme
      ? "import { Table } from '@scorpionmanace/tablez';"
      : `import { Table, ${resolvedDark ? 'darkTheme' : 'defaultTheme'} } from '@scorpionmanace/tablez';`;

    const settingsLiteral = exampleDefinesTheme
      ? literal(parsed.settings, 1)
      : literal({ ...(parsed.settings as object), theme: '__THEME__' }, 1).replace(
          "'__THEME__'",
          resolvedDark ? 'darkTheme' : 'defaultTheme',
        );

    return `${themeImport}

const columns = ${literal(parsed.columns)};

const settings = ${settingsLiteral};

export function Example({ data }) {
  return (
    <Table
      data={data}
      columns={columns}
      settings={settings}
      rowSettings={${literal(example.rowSettings ?? {})}}
      onDataChange={(rows) => console.log(rows)}
    />
  );
}`;
  }, [parsed, exampleDefinesTheme, resolvedDark, example.rowSettings]);

  const reset = () => {
    setColumnsText(pretty(example.columns));
    setSettingsText(pretty(example.settings));
    setDataText(pretty(example.data));
  };

  const editorValue = { columns: columnsText, settings: settingsText, data: dataText }[
    tab as 'columns' | 'settings' | 'data'
  ];

  const setEditorValue = (value: string) => {
    if (tab === 'columns') setColumnsText(value);
    else if (tab === 'settings') setSettingsText(value);
    else if (tab === 'data') setDataText(value);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Preview */}
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-2.5">
          <span className="eyebrow">Live preview</span>

          <div className="flex items-center gap-1" role="group" aria-label="Preview theme">
            {(['auto', 'light', 'dark'] as ThemeChoice[]).map((choice) => (
              <button
                key={choice}
                type="button"
                onClick={() => setThemeChoice(choice)}
                aria-pressed={themeChoice === choice}
                disabled={exampleDefinesTheme}
                className={cn(
                  'rounded-md px-2.5 py-1 font-mono text-[0.6875rem] capitalize transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                  themeChoice === choice
                    ? 'bg-ink text-canvas'
                    : 'text-muted hover:bg-sunken hover:text-ink',
                )}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          {parsed.error ? (
            <div
              role="alert"
              className="rounded-xl border border-red-500/30 bg-red-500/8 p-4 text-sm text-red-600 dark:text-red-400"
            >
              <p className="font-medium">Invalid JSON</p>
              <p className="mt-1 font-mono text-xs opacity-80">{parsed.error}</p>
            </div>
          ) : (
            <ErrorBoundary
              resetKey={`${columnsText}|${settingsText}|${dataText}`}
              label="The table could not render with this configuration"
            >
              <Table
                data={liveData as Record<string, unknown>[]}
                columns={parsed.columns}
                settings={settingsForRender}
                rowSettings={example.rowSettings}
                onDataChange={(rows: unknown[]) => setLiveData(rows)}
              />
            </ErrorBoundary>
          )}
        </div>

        {exampleDefinesTheme && (
          <p className="border-t border-line px-4 py-2.5 text-xs text-faint">
            This example sets its own <code className="font-mono">theme</code>, so the theme
            switcher is disabled here.
          </p>
        )}
      </div>

      {/* Editor */}
      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-2 py-1.5">
          <div className="flex" role="tablist" aria-label="Configuration">
            {TABS.map((item) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={tab === item.key}
                onClick={() => setTab(item.key)}
                className={cn(
                  'rounded-lg px-3.5 py-2 text-[0.8125rem] transition-colors',
                  tab === item.key ? 'bg-sunken font-medium text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={reset}
            className="mr-2 rounded-md px-2.5 py-1 font-mono text-[0.6875rem] text-muted transition-colors hover:bg-sunken hover:text-ink"
          >
            Reset
          </button>
        </div>

        {tab === 'code' ? (
          <div className="p-4">
            <CodeBlock code={generatedCode} language="tsx" maxHeight="28rem" />
            <p className="mt-3 text-xs text-faint">
              Generated from the configuration on the left. Row data is passed in as a prop rather
              than inlined.
            </p>
          </div>
        ) : (
          <div className="p-4">
            <label htmlFor={`editor-${tab}`} className="eyebrow mb-2 block">
              {tab} — JSON
            </label>
            <textarea
              id={`editor-${tab}`}
              value={editorValue}
              onChange={(event) => setEditorValue(event.target.value)}
              spellCheck={false}
              rows={16}
              className="w-full resize-y rounded-xl border border-line bg-canvas p-3.5 font-mono text-[0.8125rem] leading-relaxed text-ink transition-colors focus:border-accent focus:outline-none"
            />
            <p className="mt-2 text-xs text-faint">
              Edits apply as you type. JSON cannot express functions, so callback props like{' '}
              <code className="font-mono">render</code> are shown in the docs rather than here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablezPlayground;
