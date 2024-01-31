import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SegmentedButton } from '@q-dev/q-ui-kit';
import styled from 'styled-components';

import DecodedCallDataItemViewer from './DecodedCallDataItemViewer';
import RawDecodedCallDataViewer from './RawDecodedCallDataViewer';

import { decodeCallDataByAbi, decodeContractRegistryCallData, flattenDecodedCallDataItem } from 'contracts/helpers/call-data';

const StyledWrapper = styled.div`
  .proposal-call-data-viewer__head {
    display: flex;
    justify-content: space-between;
  }

  .proposal-call-data-viewer__stub {
    display: grid;
    gap: 4px;
  }
`;

interface Props {
  header: string;
  callData: string;
  abi?: string | string[] | null;
  isContractRegistry?: boolean;
}

function ProposalCallDataViewer ({ callData, abi, isContractRegistry, header }: Props) {
  const { t } = useTranslation();
  const [isRawMode, setIsRawMode] = useState(false);

  const decodedCallData = useMemo(() => {
    try {
      if (isContractRegistry) return decodeContractRegistryCallData(callData);
      return abi
        ? decodeCallDataByAbi(callData, abi)
        : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [callData, isContractRegistry, abi]);

  const flattenedDecodedCallData = useMemo(() => {
    return decodedCallData ? flattenDecodedCallDataItem(decodedCallData) : [];
  }, [decodedCallData]);

  return (
    <StyledWrapper className="block">
      <div className="proposal-call-data-viewer__head">
        <h2 className="text-h2">{header}</h2>
        <SegmentedButton
          value={isRawMode}
          options={[
            { label: t('FORMATTED'), value: false },
            { label: t('RAW'), value: true },
          ]}
          onChange={setIsRawMode}
        />
      </div>

      <div className="block__content">
        {decodedCallData
          ? isRawMode
            ? <RawDecodedCallDataViewer decodedData={decodedCallData} />
            : (
              <div className="details-list">
                {flattenedDecodedCallData.map((item, index) => (
                  <DecodedCallDataItemViewer
                    key={index}
                    item={item}
                    index={index}
                  />
                ))}
              </div>
            )
          : (
            <div className="details-item">
              <p className="text-md color-secondary">{t('CALL_DATA')}</p>
              <div className="proposal-call-data-viewer__stub">
                <p className="text-md break-word">{callData || '–'}</p>
                <p className="color-error text-md">{t('CANNOT_PARSE_CALL_DATA')}</p>
              </div>
            </div>
          )
        }
      </div>
    </StyledWrapper>
  );
}

export default ProposalCallDataViewer;
