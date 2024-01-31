
import { startCase } from 'lodash';
import styled from 'styled-components';
import { DecodedCallDataItem } from 'typings/call-data';

import ExplorerAddress from 'components/Custom/ExplorerAddress/ExplorerAddress';

import { isAddress } from 'utils/web3';

export const StyledWrapper = styled.div`
  display: grid;
  align-content: start;
  gap: 16px;
  padding: 24px;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: 8px;
`;

interface Props {
  item: DecodedCallDataItem;
  index: number;
}

function DecodedCallDataItemViewer ({ item, index }: Props) {
  function renderValue (value: unknown) {
    if (Array.isArray(value)) {
      return value.map((v, index) => (
        <div key={index}>{renderValue(v)}</div>
      ));
    }

    const strValue = String(value);
    return isAddress(strValue)
      ? <ExplorerAddress address={strValue} className="text-lg break-word" />
      : <p className="text-lg break-word" title={strValue}>{strValue}</p>;
  }

  return (
    <StyledWrapper>
      <p className="text-lg font-semibold">
        #{index + 1} {startCase(item.functionName)}
      </p>

      {item.arguments.map((arg, index) => (
        <div key={index}>
          <p
            className="text-md color-secondary"
            title={startCase(arg.key)}
          >
            {startCase(arg.key)}
          </p>

          {renderValue(arg.value)}
        </div>
      ))
      }
    </StyledWrapper>
  );
}

export default DecodedCallDataItemViewer;
