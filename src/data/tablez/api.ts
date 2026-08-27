export interface ApiRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ApiSection {
  id: string;
  title: string;
  intro: string;
  rows: ApiRow[];
}

/**
 * API reference, mirrored from the library's `src/lib/types.ts`.
 * Keep in step with the package when it changes.
 */
export const API_SECTIONS: ApiSection[] = [
  {
    id: 'table-props',
    title: 'TableProps',
    intro: 'Props accepted by the <Table> component. Only data and columns are required.',
    rows: [
      { name: 'data', type: 'T[]', description: 'Row objects to render.' },
      { name: 'columns', type: 'Column<T>[]', description: 'Column definitions, in display order.' },
      { name: 'settings', type: 'TableSettings', description: 'Table-level behaviour and appearance.' },
      { name: 'rowSettings', type: 'RowSettings<T>', description: 'Row identity, height, and per-row state.' },
      { name: 'onSort', type: '(sortState) => void', description: 'Fired when the sort column or direction changes.' },
      { name: 'onFilter', type: '(filters) => void', description: 'Fired when any column filter changes.' },
      { name: 'onCellEdit', type: '(record, key, value) => void', description: 'Fired when a single cell is committed.' },
      { name: 'onDataChange', type: '(newData: T[]) => void', description: 'Fired whenever the table produces a new dataset — edits, imports, reorders.' },
      { name: 'onRowSelect', type: '(keys, record, selected) => void', description: 'Fired when selection changes.' },
      { name: 'onRowReorder', type: '(newData: T[]) => void', description: 'Fired after a row drag completes.' },
      { name: 'onColumnOrderChange', type: '(columnKeys: string[]) => void', description: 'Fired after columns are reordered.' },
      { name: 'sortState', type: 'TableSortState', description: 'Controlled sort state.' },
      { name: 'filters', type: 'Record<string, string>', description: 'Controlled filter state.' },
      { name: 'selectedRows', type: '(string | number)[]', description: 'Controlled selection, as row keys.' },
      { name: 'comments', type: 'CellComment[]', description: 'Controlled list of cell comments to display.' },
      { name: 'components', type: '{ Row, Cell, Header }', description: 'Swap in your own row, cell, or header component.' },
    ],
  },
  {
    id: 'column',
    title: 'Column<T>',
    intro: 'One entry per column. key must match a field in your row objects, except for formula columns.',
    rows: [
      { name: 'key', type: 'string', description: 'Field name in the row object. Required.' },
      { name: 'title', type: 'ReactNode', description: 'Header content. Required.' },
      { name: 'width', type: 'number', description: 'Pixel width. Must be a number — resize maths depends on it.' },
      { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: 'Horizontal cell alignment.' },
      { name: 'sortable', type: 'boolean', default: 'false', description: 'Make the header clickable to sort.' },
      { name: 'filterable', type: 'boolean', default: 'false', description: 'Add a filter input to the column menu.' },
      { name: 'searchType', type: "'text' | 'number'", default: "'text'", description: 'Comparison used when filtering.' },
      { name: 'editable', type: 'boolean | (record) => boolean', default: 'false', description: 'Allow editing, optionally per row.' },
      { name: 'type', type: 'ColumnType', default: "'string'", description: "Editor and formatter: 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'select' | 'largeText'." },
      { name: 'options', type: 'Array<string | { label, value }>', description: "Choices for type: 'select'." },
      { name: 'format', type: 'ColumnFormat', description: 'decimals, prefix, suffix, dateFormat.' },
      { name: 'formula', type: 'string', description: "Excel-like expression starting with '='. References other columns as {key}." },
      { name: 'render', type: '(value, record, index) => ReactNode', description: 'Custom cell renderer.' },
      { name: 'headerRender', type: '(column) => ReactNode', description: 'Custom header renderer.' },
      { name: 'fixed', type: "'left' | 'right'", description: 'Pin the column during horizontal scroll.' },
      { name: 'aggregate', type: "'sum' | 'avg' | 'count' | 'min' | 'max'", description: 'Value computed on group header rows.' },
      { name: 'sparkline', type: 'SparklineConfig', description: 'Render a mini chart; the cell value must be a number[].' },
      { name: 'tooltip', type: 'string | (value, record) => string', description: 'Tooltip shown on cell hover.' },
      { name: 'highlight', type: 'boolean', default: 'false', description: 'Flash the cell background when its value changes.' },
      { name: 'colSpan / rowSpan', type: 'number | (record, index) => number', description: 'Span a cell across columns or rows.' },
      { name: 'hidden', type: 'boolean', default: 'false', description: 'Hide from the table but keep in the columns panel.' },
      { name: 'readOnly / disabled', type: 'boolean | (record) => boolean', description: 'Block editing, with distinct styling for each.' },
      { name: 'allowTextSelection', type: 'boolean', default: 'false', description: 'Let users select cell text instead of entering edit mode.' },
    ],
  },
  {
    id: 'table-settings',
    title: 'TableSettings',
    intro: 'Everything that applies to the table as a whole.',
    rows: [
      { name: 'mode', type: "'client' | 'server'", default: "'client'", description: 'Whether tablez sorts and filters locally, or you do it server-side.' },
      { name: 'virtualized', type: 'boolean', default: 'false', description: 'Render only the visible row window. Needs containerHeight.' },
      { name: 'containerHeight', type: 'number', description: 'Fixed viewport height in px. Required for virtualization.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show the loading state.' },
      { name: 'resizable', type: 'boolean', default: 'false', description: 'Global drag-to-resize toggle.' },
      { name: 'draggableColumns', type: 'boolean', default: 'false', description: 'Allow columns to be reordered by dragging.' },
      { name: 'draggableRows', type: 'boolean', default: 'false', description: 'Allow rows to be reordered by dragging.' },
      { name: 'showColumnBorders', type: 'boolean', default: 'false', description: 'Draw vertical cell borders.' },
      { name: 'frozenRows', type: 'number', default: '0', description: 'Number of rows pinned to the top.' },
      { name: 'showRowNumbers', type: 'boolean', default: 'false', description: 'Add an auto-incrementing index column.' },
      { name: 'floatingFilters', type: 'boolean', default: 'false', description: 'Always-visible filter row under the headers.' },
      { name: 'groupBy', type: 'string[]', description: 'Group rows by these column keys, first key primary.' },
      { name: 'columnGroups', type: 'ColumnGroup[]', description: 'Parent header row spanning sets of columns.' },
      { name: 'treeSettings', type: 'TreeSettings', description: 'Hierarchical rows. See below.' },
      { name: 'selection', type: 'SelectionSettings', description: 'Row selection mode and checkbox column.' },
      { name: 'pagination', type: 'PaginationSettings', description: 'Client-side paging.' },
      { name: 'toolbar', type: 'ToolbarSettings', description: 'Search, export, import, columns panel, custom buttons.' },
      { name: 'sidePanel', type: 'SidePanelSettings', description: 'Columns tool panel.' },
      { name: 'statusBar', type: 'StatusBarSettings', description: 'Bottom bar with counts and aggregates.' },
      { name: 'masterDetail', type: 'MasterDetailSettings', description: 'Expand a row into a custom detail panel.' },
      { name: 'infiniteScroll', type: 'InfiniteScrollSettings', description: 'Fire onLoadMore near the bottom.' },
      { name: 'enableRangeSelection', type: 'boolean', default: 'false', description: 'Select a rectangle of cells.' },
      { name: 'enableFillHandle', type: 'boolean', default: 'false', description: 'Drag the range corner to fill values.' },
      { name: 'enableComments', type: 'boolean', default: 'false', description: 'Cell-level commenting.' },
      { name: 'animateRows', type: 'boolean', default: 'false', description: 'CSS transitions on row insert and remove.' },
      { name: 'theme', type: 'TableTheme', description: 'Design tokens plus per-slot style overrides.' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible name for the table element.' },
    ],
  },
  {
    id: 'row-settings',
    title: 'RowSettings<T>',
    intro: 'Row identity and per-row behaviour. Setting key is strongly recommended — selection and comments rely on it.',
    rows: [
      { name: 'key', type: 'string | (record) => string', description: 'Field name or function producing a stable row id.' },
      { name: 'height', type: 'number', default: '40', description: 'Row height in px. Must match reality when virtualized.' },
      { name: 'overscan', type: 'number', description: 'Extra rows rendered beyond the viewport while scrolling.' },
      { name: 'className', type: 'string | (record, index) => string', description: 'Per-row class name.' },
      { name: 'onClick', type: '(record) => void', description: 'Row click handler.' },
      { name: 'readOnly / disabled', type: 'boolean | (record) => boolean', description: 'Block editing for whole rows.' },
    ],
  },
  {
    id: 'tree-settings',
    title: 'TreeSettings',
    intro: 'Hierarchical rows, nested to any depth.',
    rows: [
      { name: 'enabled', type: 'boolean', default: 'false', description: 'Turn on tree mode.' },
      { name: 'childrenKey', type: 'string', default: "'children'", description: 'Field holding child rows.' },
      { name: 'expandColumnKey', type: 'string', default: 'first column', description: 'Column that carries the expand toggle.' },
      { name: 'indentSize', type: 'number', default: '20', description: 'Pixels of indent per level.' },
      { name: 'defaultExpanded', type: 'boolean', default: 'false', description: 'Start fully expanded.' },
    ],
  },
];

export interface FormulaFn {
  name: string;
  signature: string;
  description: string;
}

export const FORMULA_FUNCTIONS: FormulaFn[] = [
  { name: 'IF', signature: 'IF(condition, then, else)', description: 'Branch on a condition.' },
  { name: 'AND', signature: 'AND(a, b, …)', description: 'True when every argument is truthy.' },
  { name: 'OR', signature: 'OR(a, b, …)', description: 'True when any argument is truthy.' },
  { name: 'NOT', signature: 'NOT(a)', description: 'Negate a value.' },
  { name: 'SUM', signature: 'SUM(a, b, …)', description: 'Add numbers together.' },
  { name: 'AVG', signature: 'AVG(a, b, …)', description: 'Arithmetic mean.' },
  { name: 'MIN', signature: 'MIN(a, b, …)', description: 'Smallest value.' },
  { name: 'MAX', signature: 'MAX(a, b, …)', description: 'Largest value.' },
  { name: 'ROUND', signature: 'ROUND(value, decimals)', description: 'Round to a number of decimals.' },
  { name: 'ABS', signature: 'ABS(value)', description: 'Absolute value.' },
  { name: 'CONCAT', signature: 'CONCAT(a, b, …)', description: 'Join values into one string.' },
  { name: 'UPPER', signature: 'UPPER(text)', description: 'Uppercase a string.' },
  { name: 'LOWER', signature: 'LOWER(text)', description: 'Lowercase a string.' },
  { name: 'LEN', signature: 'LEN(text)', description: 'Length of a string.' },
  { name: 'IMG', signature: 'IMG(src, alt, width, height)', description: 'Render an image inside the cell.' },
];

export const THEME_TOKENS: ApiRow[] = [
  { name: 'primaryColor', type: 'string', description: 'Accent for inputs, checkboxes, and active states.' },
  { name: 'secondaryColor', type: 'string', description: 'Secondary accent.' },
  { name: 'borderColor', type: 'string', description: 'All borders and separators.' },
  { name: 'backgroundColor', type: 'string', description: 'Table background.' },
  { name: 'headerBackgroundColor', type: 'string', description: 'Sticky header background.' },
  { name: 'rowHoverColor', type: 'string', description: 'Row hover background.' },
  { name: 'textColor', type: 'string', description: 'Body text.' },
  { name: 'headerTextColor', type: 'string', description: 'Header text.' },
  { name: 'fontSize', type: 'string', description: 'Base font size.' },
  { name: 'fontFamily', type: 'string', description: 'Font stack.' },
  { name: 'padding', type: 'string', description: 'Cell padding.' },
  { name: 'borderRadius', type: 'string', description: 'Corner radius for inputs and menus.' },
  { name: 'boxShadow', type: 'string', description: 'Shadow on menus and panels.' },
  { name: 'readOnlyColor', type: 'string', description: 'Muted colour for read-only cells.' },
  { name: 'disabledColor', type: 'string', description: 'Colour hint for disabled cells.' },
];
