import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SegmentedButton } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { Proposal } from 'typings/proposals';

import DecodedCallDataItemViewer from './DecodedCallDataItemViewer';
import RawDecodedCallDataViewer from './RawDecodedCallDataViewer';

import { decodeContractRegistryCallData, flattenDecodedCallDataItem } from 'contracts/helpers/call-data';

const StyledWrapper = styled.div`
  .generic-contract-registry-voting-details__head {
    display: flex;
    justify-content: space-between;
  }

  .generic-contract-registry-voting-details__stub {
    display: grid;
    gap: 4px;
  }
`;

interface Props {
  proposal: Proposal;
}

function GenericContractRegistryVotingDetails ({ proposal }: Props) {
  const { t } = useTranslation();
  const [isRawMode, setIsRawMode] = useState(false);

  const decodedCallData = useMemo(() => {
    try {
      return decodeContractRegistryCallData(proposal.callData || '');
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [proposal.callData]);

  const flattenedDecodedCallData = useMemo(() => {
    return decodedCallData ? flattenDecodedCallDataItem(decodedCallData) : [];
  }, [decodedCallData]);

  return (
    <StyledWrapper className="block">
      <div className="generic-contract-registry-voting-details__head">
        <h2 className="text-h2">{t('REGISTRY_UPDATES')}</h2>
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
              <div className="generic-contract-registry-voting-details__stub">
                <p className="text-md break-word">{proposal.callData || '–'}</p>
                <p className="color-error text-md">{t('CANNOT_PARSE_CALL_DATA')}</p>
              </div>
            </div>
          )
        }
      </div>
    </StyledWrapper>
  );
}

export default GenericContractRegistryVotingDetails;
