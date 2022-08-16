import { CSSProperties } from 'react';
import { ColumnDescription } from 'react-bootstrap-table-next';

export { default } from './Table';

export interface TableColumn extends ColumnDescription {
  dataField: string
  text: string
  sort?: boolean
  headerStyle?: CSSProperties | (() => CSSProperties),
  sortFunc?: (a: any, b: any, order: 'asc' | 'desc') => number
  filterValue?: (cell: any) => string,
}
