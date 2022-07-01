import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { ProposalFilter, ProposalFilterStatus, ProposalType } from 'typings/proposals';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Select from 'ui/Select';
import Tooltip from 'ui/Tooltip';

import PurgeSlashingForm from '../PurgeSlashingForm';

import { FiltersWrapper } from './styles';

import { isUserRootNode } from 'store/root-node/selectors';

interface Props {
  type: ProposalType
  filters: ProposalFilter
  onChange: (value: ProposalFilter) => void
}

function ProposalFilters ({ type, filters, onChange }: Props) {
  const history = useHistory();
  const isRootNode = useSelector(isUserRootNode);

  const [purgeModalOpen, setPurgeModalOpen] = useState(false);

  const updateStatus = (value: ProposalFilterStatus) => {
    history.replace({
      search: value === '' ? '' : `?status=${value}`,
    });
    onChange({ ...filters, status: value });
  };

  return (
    <FiltersWrapper>
      <Select
        chips
        value={filters.status}
        placeholder="Status"
        options={[
          { label: 'All', value: '' },
          { label: 'Active', value: 'active' },
          { label: 'Ended', value: 'ended' },
        ]}
        onChange={updateStatus}
      />

      {type === 'slashing' && (
        <Tooltip
          disabled={isRootNode}
          trigger={
            <Button
              look="secondary"
              disabled={!isRootNode}
              onClick={() => setPurgeModalOpen(true)}
            >
              Purge Slashing
            </Button>
          }
        >
          <span>Available only for root nodes</span>
        </Tooltip>
      )}

      <Modal
        open={purgeModalOpen}
        title="Purge Slashing"
        tip="In order to slash the same validator again, root node needs to purge all his slashing transactions"
        width={440}
        onClose={() => setPurgeModalOpen(false)}
      >
        <PurgeSlashingForm onClose={() => setPurgeModalOpen(false)} />
      </Modal>
    </FiltersWrapper>
  );
}

export default ProposalFilters;
