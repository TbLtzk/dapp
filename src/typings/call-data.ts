export interface DecodedCallDataItem {
  functionName: string;
  children: DecodedCallDataItem[];
  arguments: {
    key: string;
    value: unknown;
  }[];
}
