import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { Modal } from '@q-dev/q-ui-kit';
import { ProposalFilter, ProposalFilterStatus, ProposalType } from 'typings/proposals';

import Button from 'components/Button';
import Select from 'ui/Select';
import Tooltip from 'ui/Tooltip';

import PurgeSlashingForm from '../PurgeSlashingForm';

import { FiltersWrapper } from './styles';

import { useRootNodes } from 'store/root-nodes/hooks';

interface Props {
  type: ProposalType;
  filters: ProposalFilter;
  onChange: (value: ProposalFilter) => void;
}

function ProposalFilters ({ type, filters, onChange }: Props) {
  const { t } = useTranslation();
  const history = useHistory();
  const { isRootNode } = useRootNodes();

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
        placeholder={t('STATUS')}
        options={[
          { label: t('PROPOSAL_STATUS_ALL'), value: '' },
          { label: t('PROPOSAL_STATUS_ACTIVE'), value: 'active' },
          { label: t('PROPOSAL_STATUS_ENDED'), value: 'ended' },
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
              {t('PURGE_SLASHING')}
            </Button>
          }
        >
          <span>{t('ROOT_NODES_TIP')}</span>
        </Tooltip>
      )}

      <Modal
        open={purgeModalOpen}
        title={t('PURGE_SLASHING')}
        tip={t('PURGE_SLASHING_TIP')}
        width={440}
        onClose={() => setPurgeModalOpen(false)}
      >
        <PurgeSlashingForm onClose={() => setPurgeModalOpen(false)} />
      </Modal>
    </FiltersWrapper>
  );
}

export default ProposalFilters;
