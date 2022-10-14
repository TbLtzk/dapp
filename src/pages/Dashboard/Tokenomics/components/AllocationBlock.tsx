
import { useTranslation } from 'react-i18next';

import { useAnimateNumber } from '@q-dev/react-hooks';
import styled from 'styled-components';

import Button from 'components/Button';

const StyledWrapper = styled.div`
  .allocation-block-btn {
    margin-top: 16px;
  }
`;

interface Props {
  value: string;
  title: string;
  loading: boolean;
  onAllocate: () => void;
}

function AllocationBlock ({ value, title, loading, onAllocate }: Props) {
  const { t } = useTranslation();
  const valueRef = useAnimateNumber(value);

  return (
    <StyledWrapper className="block">
      <p
        ref={valueRef}
        className="text-xl font-semibold"
      >
        0 Q
      </p>
      <p className="text-md color-secondary">{title}</p>

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
