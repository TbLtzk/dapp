import { DecodedData, getDecodedData, getDecodedDataByABI } from '@q-dev/q-js-sdk';
import { DecodedCallDataItem } from 'typings/call-data';

export function decodeCallDataByAbi (callData: string, abi: string | string[]): DecodedCallDataItem {
  const decodedData = getDecodedDataByABI(abi, callData);
  return formattedDecodedCallData(decodedData);
}

export function decodeContractRegistryCallData (callData: string): DecodedCallDataItem {
  const decodedData = getDecodedData('ContractRegistry', callData);
  return formattedDecodedCallData(decodedData);
}

export function formattedDecodedCallData (decodedData: DecodedData) {
  const isMulticall = decodedData.functionName === 'multicall';
  const nonNumericArgumentKeys = Object.keys(decodedData.arguments)
    .filter((key) => Number.isNaN(Number(key)));

  return {
    ...decodedData,
    children: isMulticall
      ? decodedData.arguments[0].map(decodeContractRegistryCallData)
      : [],
    arguments: nonNumericArgumentKeys.map((key) => ({
      key,
      value: decodedData.arguments[key]
    }))
  };
}

export function flattenDecodedCallDataItem (
  decodedData: DecodedCallDataItem,
  items: DecodedCallDataItem[] = []
): DecodedCallDataItem[] {
  return decodedData.children.length
    ? decodedData.children.reduce((acc, item) => flattenDecodedCallDataItem(item, acc), items)
    : [...items, decodedData]
  ;
}
