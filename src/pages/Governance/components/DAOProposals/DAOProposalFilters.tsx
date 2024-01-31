import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { Select } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { ProposalFilterStatus } from 'typings/proposals';

export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: -8px 0 16px;
  height: 40px;
`;

interface Props {
  status: ProposalFilterStatus;
  onChange: (value: ProposalFilterStatus) => void;
}

function DAOProposalFilters ({ status, onChange }: Props) {
  const { t } = useTranslation();
  const history = useHistory();

  const updateStatus = (value: ProposalFilterStatus) => {
    history.replace({
      search: value === '' ? '' : `?status=${value}`,
    });
    onChange(value);
  };

  return (
    <FiltersWrapper>
      <Select
        chips
        value={status}
        placeholder={t('STATUS')}
        options={[
          { label: t('PROPOSAL_STATUS_ALL'), value: '' },
          { label: t('PROPOSAL_STATUS_ACTIVE'), value: 'active' },
          { label: t('PROPOSAL_STATUS_ENDED'), value: 'ended' },
        ]}
        onChange={updateStatus}
      />
    </FiltersWrapper>
  );
}

export default DAOProposalFilters;
