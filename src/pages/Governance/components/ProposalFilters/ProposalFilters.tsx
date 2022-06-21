import { useHistory } from 'react-router';

import { ProposalFilter, ProposalFilterStatus } from 'typings/proposals';

import Select from 'components/Base/Form/Select';

import { FiltersWrapper } from './styles';

interface Props {
  filters: ProposalFilter
  onChange: (value: ProposalFilter) => void
}

function ProposalFilters ({ filters, onChange }: Props) {
  const history = useHistory();

  const updateStatus = (value: ProposalFilterStatus) => {
    history.replace({
      search: value === 'all' ? '' : `?status=${value}`,
    });
    onChange({ ...filters, status: value });
  };

  return (
    <FiltersWrapper>
      <Select
        value={filters.status}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Ended', value: 'ended' },
        ]}
        onChange={updateStatus}
      />
    </FiltersWrapper>
  );
}

export default ProposalFilters;
