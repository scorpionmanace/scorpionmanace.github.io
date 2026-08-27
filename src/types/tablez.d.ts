/**
 * Ambient types for @scorpionmanace/tablez@1.0.0.
 *
 * STOPGAP. The published package advertises TypeScript support but ships no
 * usable declarations — `dist/main.d.ts` and `dist/native.d.ts` are both
 * literally `export {}`, and `exports["."].types` points at a
 * `dist/index.d.ts` that is not in the tarball. Its `main` and
 * `exports["."].require` also point at a `tablez.umd.js` that does not exist
 * (the built CJS file is `tablez.cjs.js`), so `require()` of this package
 * fails. Only the ESM entry resolves, which is why the Vite build works.
 *
 * These declarations mirror the library's own `src/lib/types.ts` and cover the
 * surface this site uses. Delete this file once the package publishes real
 * declarations.
 */
declare module '@scorpionmanace/tablez' {
  import type { ComponentType, CSSProperties, ReactElement, ReactNode } from 'react';

  export type ColumnType =
    | 'string'
    | 'number'
    | 'boolean'
    | 'date'
    | 'datetime'
    | 'select'
    | 'largeText';

  export interface SparklineConfig {
    type: 'bar' | 'line' | 'area';
    color?: string;
    width?: number;
    height?: number;
  }

  export interface ColumnFormat {
    decimals?: number;
    prefix?: string;
    suffix?: string;
    dateFormat?: string;
  }

  export interface Column<T = any> {
    key: string;
    title: ReactNode;
    render?: (value: any, record: T, index: number) => ReactNode;
    headerRender?: (column: Column<T>) => ReactNode;
    width?: number;
    resizable?: boolean;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
    filterable?: boolean;
    searchType?: 'text' | 'number';
    editable?: boolean | ((record: T) => boolean);
    className?: string;
    headerClassName?: string;
    style?: CSSProperties;
    headerStyle?: CSSProperties;
    fixed?: 'left' | 'right';
    formula?: string;
    freezable?: boolean;
    draggable?: boolean;
    type?: ColumnType;
    format?: ColumnFormat;
    readOnly?: boolean | ((record: T) => boolean);
    disabled?: boolean | ((record: T) => boolean);
    tooltip?: string | ((value: any, record: T) => string);
    allowTextSelection?: boolean;
    options?: Array<{ label: string; value: any } | string>;
    highlight?: boolean;
    colSpan?: number | ((record: T, index: number) => number);
    rowSpan?: number | ((record: T, index: number) => number);
    sparkline?: SparklineConfig;
    aggregate?: 'sum' | 'avg' | 'count' | 'min' | 'max';
    fullWidthRender?: (record: any) => ReactNode;
    hidden?: boolean;
  }

  export interface TableTokens {
    primaryColor?: string;
    secondaryColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    headerBackgroundColor?: string;
    rowHoverColor?: string;
    textColor?: string;
    headerTextColor?: string;
    fontSize?: string;
    padding?: string;
    borderRadius?: string;
    fontFamily?: string;
    boxShadow?: string;
    readOnlyColor?: string;
    disabledColor?: string;
  }

  export interface TableTheme {
    tokens?: TableTokens;
    table?: CSSProperties;
    header?: CSSProperties;
    headerCell?: CSSProperties;
    row?: CSSProperties;
    cell?: CSSProperties;
    pagination?: CSSProperties;
    menu?: CSSProperties;
    menuItem?: CSSProperties;
    searchInput?: CSSProperties;
    editInput?: CSSProperties;
    toolbar?: CSSProperties;
    toolbarButton?: CSSProperties;
  }

  export interface TreeSettings<T = any> {
    enabled?: boolean;
    childrenKey?: keyof T | string;
    indentSize?: number;
    expandColumnKey?: string;
    defaultExpanded?: boolean;
  }

  export interface SelectionSettings {
    mode?: 'single' | 'multi';
    showCheckbox?: boolean;
    checkboxPosition?: 'left' | 'right';
    checkboxWidth?: number;
  }

  export interface PaginationSettings {
    enabled?: boolean;
    pageSize?: number;
    pageSizeOptions?: number[];
    showPageSizeSelector?: boolean;
    position?: 'top' | 'bottom' | 'both';
  }

  export interface SidePanelSettings {
    enabled?: boolean;
    defaultOpen?: boolean;
    width?: number;
  }

  export interface InfiniteScrollSettings {
    onLoadMore: () => void;
    hasMore?: boolean;
    loadingMore?: boolean;
    threshold?: number;
  }

  export interface ColumnGroup {
    title: ReactNode;
    columnKeys: string[];
    headerStyle?: CSSProperties;
    headerClassName?: string;
  }

  export interface MasterDetailSettings {
    detailRenderer: (record: any) => ReactNode;
    detailHeight?: number;
    expandColumnKey?: string;
  }

  export interface ToolbarSettings<T = any> {
    enabled?: boolean;
    position?: 'top' | 'bottom';
    items?: Array<
      | 'download'
      | 'search'
      | 'columns'
      | 'import'
      | 'comment'
      | 'separator'
      | {
          key: string;
          label?: ReactNode;
          icon?: ReactNode;
          onClick?: (data: T[], columns: Column<T>[]) => void;
          disabled?: boolean | ((data: T[], columns: Column<T>[]) => boolean);
        }
    >;
    downloadOptions?: Array<'csv' | 'xlsx' | 'pdf' | 'tsv'>;
    className?: string;
    style?: CSSProperties;
  }

  export interface StatusBarSettings {
    showRowCount?: boolean;
    showSelectedCount?: boolean;
    aggregates?: Array<{
      columnKey: string;
      label?: string;
      fns: Array<'sum' | 'avg' | 'min' | 'max' | 'count'>;
    }>;
  }

  export interface TableSettings {
    virtualized?: boolean;
    containerHeight?: number;
    mode?: 'client' | 'server';
    loading?: boolean;
    draggableColumns?: boolean;
    frozenRows?: number;
    showColumnBorders?: boolean;
    resizable?: boolean;
    className?: string;
    style?: CSSProperties;
    containerStyle?: CSSProperties;
    theme?: TableTheme;
    columnGroups?: ColumnGroup[];
    draggableRows?: boolean;
    floatingFilters?: boolean;
    groupBy?: string[];
    enableRangeSelection?: boolean;
    enableFillHandle?: boolean;
    masterDetail?: MasterDetailSettings;
    statusBar?: StatusBarSettings;
    showRowNumbers?: boolean;
    rowNumberWidth?: number;
    selection?: SelectionSettings;
    pagination?: PaginationSettings;
    contextMenu?: Record<string, any>;
    toolbar?: ToolbarSettings;
    treeSettings?: TreeSettings;
    sidePanel?: SidePanelSettings;
    infiniteScroll?: InfiniteScrollSettings;
    animateRows?: boolean;
    ariaLabel?: string;
    enableComments?: boolean;
  }

  export interface RowSettings<T = any> {
    key?: string | ((record: T) => string);
    className?: string | ((record: T, index: number) => string);
    onClick?: (record: T) => void;
    readOnly?: boolean | ((record: T) => boolean);
    disabled?: boolean | ((record: T) => boolean);
    height?: number;
    overscan?: number;
  }

  export type TableSortDirection = 'asc' | 'desc' | null;

  export interface TableSortState {
    columnKey: string;
    direction: TableSortDirection;
  }

  export type TableFilters = Record<string, string>;

  export interface CellComment {
    id: string;
    rowKey: string | number;
    columnKey: string;
    text: string;
    author?: string;
    timestamp?: string | number;
    resolved?: boolean;
  }

  export interface TableProps<T extends Record<string, any> = Record<string, any>> {
    data: T[];
    columns: Column<T>[];
    settings?: TableSettings;
    rowSettings?: RowSettings<T>;
    onSort?: (sortState: TableSortState) => void;
    onFilter?: (filters: TableFilters) => void;
    onColumnUpdate?: (columns: Column<T>[]) => void;
    onColumnOrderChange?: (columnKeys: string[]) => void;
    onCellEdit?: (record: T, key: string, value: any) => void;
    onDataChange?: (newData: T[]) => void;
    onRowSelect?: (selectedKeys: Array<string | number>, record: T, selected: boolean) => void;
    onRowReorder?: (newData: T[]) => void;
    sortState?: TableSortState;
    filters?: TableFilters;
    selectedRows?: Array<string | number>;
    comments?: CellComment[];
    onCommentAdd?: (comment: CellComment) => void;
    onCommentDelete?: (commentId: string) => void;
    onCommentResolve?: (commentId: string) => void;
    components?: {
      Row?: ComponentType<any>;
      Cell?: ComponentType<any>;
      Header?: ComponentType<any>;
    };
  }

  export function Table<T extends Record<string, any>>(props: TableProps<T>): ReactElement;

  export const defaultTheme: TableTheme;
  export const darkTheme: TableTheme;

  export const Header: ComponentType<any>;
  export class TablezEngine<T extends object = Record<string, unknown>> {
    constructor(options: any);
    getState(): any;
    setData(data: T[]): void;
  }
  export function processData<T extends Record<string, any> = Record<string, any>>(
    ...args: any[]
  ): T[];
  export function flattenTree<T extends Record<string, any> = Record<string, any>>(
    ...args: any[]
  ): T[];
  export function groupData(...args: any[]): any[];
  export function calculateVirtualization(params: any): any;
  export function calculateColumnOffsets(columns: any[]): any;
}
