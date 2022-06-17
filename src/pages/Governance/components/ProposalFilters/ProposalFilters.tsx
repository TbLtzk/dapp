import Select from 'components/Base/Form/Select';
import { ProposalFilter } from 'pages/Governance/types';

import { FiltersWrapper } from './styles';

interface Props {
  filters: ProposalFilter
  onChange: (value: ProposalFilter) => void
}

function ProposalFilters ({ filters, onChange }: Props) {
  return (
    <FiltersWrapper>
      <Select
        value={filters.status}
        options={[
          { label: 'All', value: 'all' },
          { label: 'Active', value: 'active' },
          { label: 'Ended', value: 'ended' },
        ]}
        onChange={(value) => onChange({ ...filters, status: value })}
      />
    </FiltersWrapper>
  );
}

export default ProposalFilters;
