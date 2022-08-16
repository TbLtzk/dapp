import { TABLE_TYPES } from 'constants/tableTypes';

type ValueOf<T> = T[keyof T]
export type TableType = ValueOf<typeof TABLE_TYPES>
