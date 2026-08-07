import { useTranslation } from 'react-i18next';

import { Button } from '@q-dev/q-ui-kit';
import { saveAs } from 'file-saver';

import { HALF_YEAR_BLOCKS, useRootNodesMonitoringContext } from '../../RootNodesMonitoringContext';
import { buildMonitoringTableMembers } from '../helpers/monitoring-table-members';
import { getCosignatureStats, getL0ApprovalStatus, getL0MembershipStatus, getOnchainMembershipStatus, getTableCosignatureStatus, getVotingParticipationStats } from '../helpers/table-collect-data';

import { useRootNodes } from 'store/root-nodes/hooks';

import { formatDateDMY } from 'utils/date';

function RootNodeMetricsExport () {
  const { t } = useTranslation();
  const { rootMembers } = useRootNodes();
  const {
    rootNodesOnchainDiffList,
    rootNodesL0Active,
    rootNodesL0Proposed,
    rootNodesExclusionActive,
    rootNodesExclusionProposed,
    latestCosignatureMetrics,
    cosignatureMetrics20,
    cosignatureMetrics1000,
    qTHVotingsStats,
    votingsStats,
    proposalsStats,
    blockHeight,
  } = useRootNodesMonitoringContext();

  const getCsvHeader = () => {
    return [
      t('ADDRESS'),
      t('ALIAS'),
      t('ONCHAIN_MEMBERSHIP_STATUS'),

      t('CO_SIGNATURE_STATUS'),
      t('CYCLES_AVAILABILITY', { count: 20 }),
      t('CYCLES_AVAILABILITY', { count: 1000 }),

      t('L0_MEMBERSHIP_STATUS'),
      t('ACTIVE_ROOT_LIST_SIGNED'),
      t('PROPOSED_ROOT_LIST_SIGNED'),
      t('ACTIVE_EXCLUSION_LIST_SIGNED'),
      t('PROPOSED_EXCLUSION_LIST_SIGNED'),

      t('RNV_TOTAL_VOTINGS'),
      t('RNV_EMERGENCY_UPDATE_VOTINGS'),
      t('RNV_VALIDATOR_SLASHING_VOTINGS'),
      t('RNV_ADDRESS_VOTINGS'),
      t('RNV_UPGRADE_VOTINGS'),

      t('QTH_TOTAL_VOTINGS'),
      t('QTH_CONSTITUTION_VOTINGS'),
      t('QTH_GENERAL_UPDATE_VOTINGS'),
      t('QTH_ROOT_NODE_MEMBERSHIP_VOTINGS'),
      t('QTH_EPDR_MEMBERSHIP_VOTINGS'),
      t('QTH_EPQFI_MEMBERSHIP_VOTINGS'),
      t('QTH_EPRS_MEMBERSHIP_VOTINGS'),
      t('QTH_ROOT_NODE_SLASHING_VOTINGS'),

      t('RNP_TOTAL_PROPOSALS'),
      t('RNP_EMERGENCY_UPDATE_PROPOSALS'),
      t('RNP_ROOT_NODE_SLASHING_PROPOSALS'),
      t('RNP_VALIDATOR_SLASHING_PROPOSALS'),

      t('VOTING_PARTICIPATION'),
      t('JOIN_DATE'),
    ].join(', ');
  };

  const getExportedMetrics = () => {
    const monitoringTableMembers = buildMonitoringTableMembers(rootNodesOnchainDiffList, rootMembers);

    return monitoringTableMembers.map(({ address, alias, metric, isOnchain }) => {
      const joinTimestamp = metric?.attributes.startTime;
      const onchainMembershipStatus = getOnchainMembershipStatus(isOnchain);
      const l0MembershipStatus = getL0MembershipStatus({
        address,
        rootNodesL0Active,
        rootNodesL0Proposed,
      });

      const { listsSigned } = getL0ApprovalStatus({
        address,
        isL0Active: l0MembershipStatus === 'active',
        rootNodesL0Active,
        rootNodesL0Proposed,
        rootNodesExclusionActive,
        rootNodesExclusionProposed,
      });

      const { rootNodeVotings, qTHVotings, rootNodeProposals, aggregatePercentage } = getVotingParticipationStats({
        address,
        qTHVotingsStats,
        votingsStats,
        proposalsStats,
      });

      return [
        address,
        alias || '',
        onchainMembershipStatus,

        getTableCosignatureStatus(l0MembershipStatus, address, latestCosignatureMetrics, blockHeight),
        getCosignatureStats(address, cosignatureMetrics20)?.availability ?? 'N/a',
        getCosignatureStats(address, cosignatureMetrics1000)?.availability ?? 'N/a',

        l0MembershipStatus,

        listsSigned.isRootActiveSigned,
        listsSigned.isRootProposedSigned,
        listsSigned.isExclusionActiveSigned,
        listsSigned.isExclusionProposedSigned,

        rootNodeVotings.totalOfUser,
        rootNodeVotings.emergencyUpdateVoting,
        rootNodeVotings.validatorsSlashingVoting,
        rootNodeVotings.addressVoting,
        rootNodeVotings.upgradeVoting,

        qTHVotings.totalOfUser,
        qTHVotings.constitutionVoting,
        qTHVotings.generalUpdateVoting,
        qTHVotings.rootNodesMembershipVoting,
        qTHVotings.epdrMembershipVoting,
        qTHVotings.epqfiMembershipVoting,
        qTHVotings.eprsMembershipVoting,
        qTHVotings.rootNodesSlashingVoting,

        rootNodeProposals.totalOfUser,
        rootNodeProposals.emergencyUpdateVoting,
        rootNodeProposals.rootNodesSlashingVoting,
        rootNodeProposals.validatorsSlashingVoting,

        aggregatePercentage,
        formatDateDMY(joinTimestamp ? joinTimestamp * 1000 : '–'),
      ].join(',');
    });
  };

  const exportToCsv = () => {
    const csvContent = [getCsvHeader(), ...getExportedMetrics()].join('\n');
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(csvBlob, `rn-metrics-${blockHeight - HALF_YEAR_BLOCKS}-${blockHeight}.csv`);
  };

  return (
    <Button compact onClick={exportToCsv}>
      {t('EXPORT_AS_CSV')}
    </Button>
  );
}

export default RootNodeMetricsExport;
