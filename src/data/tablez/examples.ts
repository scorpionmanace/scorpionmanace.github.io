import { employees, products, orgTree, makeLargeDataset } from './datasets';

/**
 * Playground examples — the living documentation for @scorpionmanace/tablez.
 *
 * Each example renders the real library against real config. `editable` marks
 * the ones whose config is pure JSON and can therefore be round-tripped
 * through the editor; examples that need a function (a custom renderer, a
 * detail panel) are shown read-only, because JSON cannot express a function.
 */
export interface TablezExample {
  id: string;
  title: string;
  /** One line shown under the tab strip. */
  summary: string;
  /** Longer prose explaining what to look at and how it works. */
  notes: string[];
  group: 'Basics' | 'Data' | 'Editing' | 'Display' | 'Scale';
  data: unknown[];
  columns: unknown[];
  settings?: Record<string, unknown>;
  rowSettings?: Record<string, unknown>;
  /** False when the config contains functions and cannot survive JSON. */
  editable: boolean;
  /** Things to try, shown as a hint list. */
  tryIt?: string[];
}

export const EXAMPLES: TablezExample[] = [
  {
    id: 'basic',
    title: 'Basic table',
    summary: 'Columns, sorting, filtering, and column resizing.',
    group: 'Basics',
    notes: [
      'A table needs only two props: `data` and `columns`. Everything else is opt-in.',
      'Set `sortable` on a column to make its header clickable, and `filterable` to add a search box to its header menu.',
      '`width` is a number of pixels — tablez uses it for resize maths, so a string will not work.',
    ],
    tryIt: [
      'Click a column header to cycle ascending → descending → unsorted.',
      'Drag the divider between two headers to resize.',
      'Open a column menu (the ⋮ on hover) to filter or freeze it.',
    ],
    data: employees,
    columns: [
      { key: 'id', title: 'ID', width: 70, sortable: true, align: 'right' },
      { key: 'name', title: 'Name', width: 200, sortable: true, filterable: true },
      { key: 'department', title: 'Department', width: 150, sortable: true, filterable: true },
      { key: 'role', title: 'Role', width: 130 },
      {
        key: 'salary',
        title: 'Salary',
        width: 130,
        sortable: true,
        align: 'right',
        type: 'number',
        format: { prefix: '$', decimals: 0 },
      },
    ],
    settings: { mode: 'client', resizable: true, showColumnBorders: true },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'editors',
    title: 'Cell editors',
    summary: 'Double-click a cell to edit. The editor follows the column type.',
    group: 'Editing',
    notes: [
      '`column.type` selects the editor: `string`, `number`, `date`, `datetime`, `boolean`, `select`, or `largeText`.',
      'A column must also be marked `editable` before any editor opens.',
      '`boolean` renders an inline checkbox and needs no double-click. `select` uses `column.options`.',
      'Edits are reported through `onCellEdit(record, key, value)` and `onDataChange(newData)`.',
    ],
    tryIt: [
      'Double-click a Name or Salary cell and press Enter to commit, Escape to cancel.',
      'Toggle an Active checkbox — it commits on the first click.',
      'Open the Role dropdown, which is driven by `options`.',
    ],
    data: employees,
    columns: [
      { key: 'name', title: 'Name', width: 190, editable: true, type: 'string' },
      {
        key: 'role',
        title: 'Role',
        width: 140,
        editable: true,
        type: 'select',
        options: ['Senior', 'Staff', 'Lead', 'Principal'],
      },
      {
        key: 'salary',
        title: 'Salary',
        width: 130,
        editable: true,
        type: 'number',
        align: 'right',
        format: { prefix: '$', decimals: 0 },
      },
      { key: 'startDate', title: 'Start date', width: 150, editable: true, type: 'date' },
      { key: 'active', title: 'Active', width: 90, editable: true, type: 'boolean', align: 'center' },
    ],
    settings: { mode: 'client', showColumnBorders: true },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'formulas',
    title: 'Formula engine',
    summary: 'Excel-like expressions computed per row.',
    group: 'Data',
    notes: [
      'Set `column.formula` to an expression beginning with `=`. Reference other columns with `{key}`.',
      'Built-ins: `IF`, `AND`, `OR`, `NOT`, `SUM`, `AVG`, `MIN`, `MAX`, `ROUND`, `ABS`, `CONCAT`, `UPPER`, `LOWER`, `LEN`, `IMG`.',
      'Formula columns are computed, not stored — they sort and filter like any other column but are never written back to your data.',
    ],
    tryIt: [
      'Edit the Price or Qty of a row and watch Total and Status recompute.',
      'Change the threshold in the Status formula in the config editor.',
    ],
    data: products,
    columns: [
      { key: 'sku', title: 'SKU', width: 100 },
      { key: 'product', title: 'Product', width: 190 },
      {
        key: 'price',
        title: 'Price',
        width: 100,
        editable: true,
        type: 'number',
        align: 'right',
        format: { prefix: '$', decimals: 2 },
      },
      { key: 'qty', title: 'Qty', width: 80, editable: true, type: 'number', align: 'right' },
      {
        key: 'total',
        title: 'Total value',
        width: 130,
        align: 'right',
        formula: '={price} * {qty}',
        sortable: true,
      },
      {
        key: 'stockStatus',
        title: 'Stock',
        width: 130,
        formula: "=IF({qty} < 20, 'Low', 'Healthy')",
      },
    ],
    settings: { mode: 'client', showColumnBorders: true },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'sparklines',
    title: 'Sparklines',
    summary: 'Inline SVG mini-charts rendered from a number array.',
    group: 'Display',
    notes: [
      'Set `column.sparkline` and point the column at a field holding a `number[]`.',
      'Three shapes are available: `bar`, `line`, and `area`.',
      '`height` defaults to 30px; `width` defaults to the column width minus padding.',
    ],
    tryIt: ['Change `type` between `bar`, `line`, and `area` in the config editor.'],
    data: products,
    columns: [
      { key: 'product', title: 'Product', width: 190 },
      { key: 'qty', title: 'Qty', width: 80, align: 'right' },
      {
        key: 'history',
        title: 'Trend (bar)',
        width: 150,
        sparkline: { type: 'bar', color: '#c2410c', height: 28 },
      },
      {
        key: 'history',
        title: 'Trend (area)',
        width: 150,
        sparkline: { type: 'area', color: '#0f766e', height: 28 },
      },
    ],
    settings: { mode: 'client', showColumnBorders: true },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'grouping',
    title: 'Grouping & aggregation',
    summary: 'Collapse flat rows under a shared column value.',
    group: 'Data',
    notes: [
      '`settings.groupBy` takes an array of column keys. The first key is the primary grouping.',
      'Add `aggregate` to a column to compute a value on each group header row.',
      'Supported functions: `sum`, `avg`, `count`, `min`, `max`.',
    ],
    tryIt: [
      'Click a group header to collapse or expand it.',
      'Add `"role"` to `groupBy` for a second level of nesting.',
    ],
    data: employees,
    columns: [
      { key: 'department', title: 'Department', width: 170 },
      { key: 'name', title: 'Name', width: 190 },
      { key: 'role', title: 'Role', width: 130 },
      {
        key: 'salary',
        title: 'Salary',
        width: 140,
        align: 'right',
        aggregate: 'sum',
        type: 'number',
        format: { prefix: '$', decimals: 0 },
      },
      { key: 'rating', title: 'Rating', width: 110, align: 'right', aggregate: 'avg' },
    ],
    settings: { mode: 'client', groupBy: ['department'], showColumnBorders: true },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'tree',
    title: 'Tree rows',
    summary: 'Hierarchical data with expandable parents.',
    group: 'Data',
    notes: [
      'Enable `settings.treeSettings.enabled` and point `childrenKey` at the nested array — `children` by default.',
      '`expandColumnKey` decides which column carries the expand toggle; it defaults to the first column.',
      'When a search matches a deep child, tablez keeps its parents visible so the match stays in context.',
      'Siblings sort independently at each level, so sorting never flattens the hierarchy.',
    ],
    tryIt: [
      'Expand Engineering → Front-end to see three levels.',
      'Set `defaultExpanded` to `true` in the config editor.',
    ],
    data: orgTree,
    columns: [
      { key: 'name', title: 'Team', width: 260, sortable: true },
      { key: 'headcount', title: 'Headcount', width: 130, align: 'right', sortable: true },
      {
        key: 'budget',
        title: 'Budget',
        width: 160,
        align: 'right',
        type: 'number',
        format: { prefix: '$', decimals: 0 },
      },
    ],
    settings: {
      mode: 'client',
      showColumnBorders: true,
      treeSettings: {
        enabled: true,
        childrenKey: 'children',
        expandColumnKey: 'name',
        indentSize: 20,
        defaultExpanded: true,
      },
    },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'selection',
    title: 'Row selection',
    summary: 'Checkbox column with shift-click range selection.',
    group: 'Basics',
    notes: [
      '`settings.selection.mode` is `multi` (default) or `single`.',
      'The checkbox column appears automatically for `multi`; control it with `showCheckbox`, `checkboxPosition`, and `checkboxWidth`.',
      'Selection is reported via `onRowSelect(selectedKeys, record, selected)`, and can be controlled with the `selectedRows` prop.',
      'Row keys come from `rowSettings.key` — set it, or selection cannot track rows reliably.',
    ],
    tryIt: [
      'Click one row, then shift-click another to select the range between them.',
      'Use the header checkbox to select everything.',
    ],
    data: employees,
    columns: [
      { key: 'name', title: 'Name', width: 200 },
      { key: 'department', title: 'Department', width: 160 },
      { key: 'role', title: 'Role', width: 140 },
    ],
    settings: {
      mode: 'client',
      showColumnBorders: true,
      selection: { mode: 'multi', showCheckbox: true, checkboxPosition: 'left', checkboxWidth: 44 },
    },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'pagination',
    title: 'Pagination & row numbers',
    summary: 'Client-side paging with a page-size selector.',
    group: 'Basics',
    notes: [
      'Set `settings.pagination.enabled`. Page size defaults to 25.',
      '`position` places the control at the `top`, `bottom`, or `both`.',
      '`showRowNumbers` adds an auto-incrementing column on the far left, sized by `rowNumberWidth`.',
    ],
    tryIt: ['Change `pageSize` to 2 and page through the data.'],
    data: employees,
    columns: [
      { key: 'name', title: 'Name', width: 200 },
      { key: 'department', title: 'Department', width: 160 },
      {
        key: 'salary',
        title: 'Salary',
        width: 140,
        align: 'right',
        type: 'number',
        format: { prefix: '$', decimals: 0 },
      },
    ],
    settings: {
      mode: 'client',
      showColumnBorders: true,
      showRowNumbers: true,
      rowNumberWidth: 50,
      pagination: {
        enabled: true,
        pageSize: 4,
        pageSizeOptions: [2, 4, 8],
        showPageSizeSelector: true,
        position: 'bottom',
      },
    },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'column-groups',
    title: 'Column groups & frozen columns',
    summary: 'A parent header row, plus columns pinned while you scroll.',
    group: 'Display',
    notes: [
      '`settings.columnGroups` renders a parent header row above the normal headers. Each group lists the `columnKeys` it spans.',
      "Set `fixed: 'left'` or `fixed: 'right'` on a column to pin it during horizontal scroll.",
      'Group headers only span columns that are adjacent — order your `columns` array to match the grouping.',
    ],
    tryIt: ['Scroll the table sideways and watch the Name column stay pinned.'],
    data: employees,
    columns: [
      { key: 'name', title: 'Name', width: 190, fixed: 'left' },
      { key: 'department', title: 'Department', width: 160 },
      { key: 'role', title: 'Role', width: 140 },
      {
        key: 'salary',
        title: 'Salary',
        width: 140,
        align: 'right',
        type: 'number',
        format: { prefix: '$', decimals: 0 },
      },
      { key: 'rating', title: 'Rating', width: 110, align: 'right' },
      { key: 'startDate', title: 'Start date', width: 150 },
      { key: 'active', title: 'Active', width: 100, align: 'center', type: 'boolean' },
    ],
    settings: {
      mode: 'client',
      showColumnBorders: true,
      columnGroups: [
        { title: 'Person', columnKeys: ['name', 'department', 'role'] },
        { title: 'Compensation', columnKeys: ['salary', 'rating'] },
        { title: 'Employment', columnKeys: ['startDate', 'active'] },
      ],
    },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'toolbar',
    title: 'Toolbar & columns panel',
    summary: 'Search, export, and an interactive columns sidebar.',
    group: 'Display',
    notes: [
      '`settings.toolbar.items` accepts the built-ins `search`, `columns`, `import`, `download`, `comment`, and `separator`, plus your own button objects.',
      '`downloadOptions` controls the export formats offered: `csv`, `xlsx`, `pdf`, `tsv`.',
      'The `columns` item toggles the side panel, which is configured separately under `settings.sidePanel`.',
    ],
    tryIt: [
      'Type in the search box to filter across every column at once.',
      'Open the columns panel and hide a column, or drag to reorder.',
      'Export the table as CSV.',
    ],
    data: employees,
    columns: [
      { key: 'name', title: 'Name', width: 190 },
      { key: 'department', title: 'Department', width: 160 },
      { key: 'role', title: 'Role', width: 140 },
      {
        key: 'salary',
        title: 'Salary',
        width: 140,
        align: 'right',
        type: 'number',
        format: { prefix: '$', decimals: 0 },
      },
    ],
    settings: {
      mode: 'client',
      showColumnBorders: true,
      toolbar: {
        enabled: true,
        position: 'top',
        items: ['search', 'separator', 'columns', 'download'],
        downloadOptions: ['csv', 'tsv'],
      },
      sidePanel: { enabled: true, defaultOpen: false, width: 240 },
    },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'status-bar',
    title: 'Status bar & floating filters',
    summary: 'Aggregate totals below the table, filter inputs above it.',
    group: 'Display',
    notes: [
      '`settings.statusBar` shows row counts and per-column aggregates without needing a grouped view.',
      'Each entry in `aggregates` names a `columnKey` and the `fns` to compute: `sum`, `avg`, `min`, `max`, `count`.',
      '`settings.floatingFilters` adds an always-visible filter row directly under the headers.',
    ],
    tryIt: [
      'Type in a floating filter and watch the status bar totals follow the filtered set.',
    ],
    data: employees,
    columns: [
      { key: 'name', title: 'Name', width: 190, filterable: true },
      { key: 'department', title: 'Department', width: 160, filterable: true },
      {
        key: 'salary',
        title: 'Salary',
        width: 140,
        align: 'right',
        type: 'number',
        filterable: true,
        searchType: 'number',
        format: { prefix: '$', decimals: 0 },
      },
      { key: 'rating', title: 'Rating', width: 110, align: 'right' },
    ],
    settings: {
      mode: 'client',
      showColumnBorders: true,
      floatingFilters: true,
      statusBar: {
        showRowCount: true,
        showSelectedCount: true,
        aggregates: [
          { columnKey: 'salary', label: 'Salary', fns: ['sum', 'avg'] },
          { columnKey: 'rating', label: 'Rating', fns: ['avg', 'max'] },
        ],
      },
    },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'theming',
    title: 'Theming',
    summary: 'Token-based theming, with per-component overrides available.',
    group: 'Display',
    notes: [
      'Pass `settings.theme.tokens` to restyle the whole table from a dozen values.',
      'For finer control, override component slots directly: `table`, `header`, `headerCell`, `row`, `cell`, `menu`, `toolbar`, and more.',
      'The library also exports `defaultTheme` and `darkTheme` you can spread and adjust.',
    ],
    tryIt: [
      'Change `primaryColor` and `headerBackgroundColor` in the config editor.',
      'Add a `headerCell` override, e.g. `{ "textTransform": "uppercase" }`.',
    ],
    data: employees,
    columns: [
      { key: 'name', title: 'Name', width: 200, sortable: true },
      { key: 'department', title: 'Department', width: 170 },
      {
        key: 'salary',
        title: 'Salary',
        width: 150,
        align: 'right',
        type: 'number',
        format: { prefix: '$', decimals: 0 },
      },
    ],
    settings: {
      mode: 'client',
      showColumnBorders: true,
      theme: {
        tokens: {
          primaryColor: '#c2410c',
          borderColor: '#e6e2da',
          backgroundColor: '#ffffff',
          headerBackgroundColor: '#faf9f7',
          rowHoverColor: '#fdf0e7',
          textColor: '#14130f',
          headerTextColor: '#6f6b62',
          fontSize: '13px',
          padding: '10px 14px',
          borderRadius: '10px',
          fontFamily: 'Inter, system-ui, sans-serif',
        },
        headerCell: { textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '11px' },
        cell: { fontVariantNumeric: 'tabular-nums' },
      },
    },
    rowSettings: { key: 'id' },
    editable: true,
  },

  {
    id: 'virtualized',
    title: 'Virtual scrolling',
    summary: '10,000 rows, only the visible window in the DOM.',
    group: 'Scale',
    notes: [
      'Set `settings.virtualized` and give the table a fixed `containerHeight`.',
      '`rowSettings.height` must match your actual row height — virtualization maths depends on it.',
      '`rowSettings.overscan` renders a few extra rows above and below the viewport to keep fast scrolling smooth.',
      'Sorting, filtering, and selection all continue to operate on the full dataset, not just the rendered window.',
    ],
    tryIt: [
      'Scroll hard and watch it stay responsive.',
      'Open devtools and count the rendered `<tr>` elements — there are far fewer than 10,000.',
    ],
    data: makeLargeDataset(10000),
    columns: [
      { key: 'id', title: 'ID', width: 90, align: 'right', sortable: true },
      { key: 'name', title: 'Name', width: 200, sortable: true, filterable: true },
      { key: 'department', title: 'Department', width: 170, sortable: true, filterable: true },
      {
        key: 'salary',
        title: 'Salary',
        width: 150,
        align: 'right',
        sortable: true,
        type: 'number',
        format: { prefix: '$', decimals: 0 },
      },
      { key: 'rating', title: 'Rating', width: 110, align: 'right', sortable: true },
    ],
    settings: {
      mode: 'client',
      virtualized: true,
      containerHeight: 420,
      showColumnBorders: true,
    },
    rowSettings: { key: 'id', height: 40, overscan: 8 },
    editable: true,
  },
];

export const EXAMPLE_GROUPS = ['Basics', 'Data', 'Editing', 'Display', 'Scale'] as const;

export const getExample = (id: string): TablezExample | undefined =>
  EXAMPLES.find((example) => example.id === id);
