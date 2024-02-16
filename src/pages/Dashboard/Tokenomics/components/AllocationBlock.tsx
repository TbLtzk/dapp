
import { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';

import Button from 'components/Button';
import InfoTooltip from 'components/Tooltips/InfoTooltip/InfoTooltip';

import useNetworkConfig from 'hooks/useNetworkConfig';

const StyledWrapper = styled.div`
  .allocation-block-btn {
    margin-top: 16px;
  }
`;

interface Props {
  value: string;
  title: string;
  tooltipTopic: ComponentProps<typeof InfoTooltip>['topic'];
  loading: boolean;
  onAllocate: () => void;
}

function AllocationBlock ({ value, title, tooltipTopic, loading, onAllocate }: Props) {
  const { t } = useTranslation();
  const { qTicker } = useNetworkConfig();
  const valueRef = useAnimateNumber(value, ` ${qTicker}`);

  return (
    <StyledWrapper className="block">
      <p
        ref={valueRef}
        className="text-xl font-semibold"
      />

      <p className="text-md color-secondary">
        <span>{title}</span>
        <InfoTooltip topic={tooltipTopic} />
      </p>

      <Button
        className="allocation-block-btn"
        loading={loading}
        onClick={onAllocate}
      >
        {!loading && <i className="mdi mdi-cube-outline" />}
        <span>{t('ALLOCATE')}</span>
      </Button>
    </StyledWrapper>
  );
}

export default AllocationBlock;
