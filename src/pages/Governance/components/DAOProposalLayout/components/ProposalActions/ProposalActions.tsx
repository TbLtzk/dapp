import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Tooltip } from '@q-dev/q-ui-kit';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { Contract } from 'ethers';
import { DAOProposal } from 'typings/proposals';

import Button from 'components/Button';
import { ShareButton } from 'components/ShareButton';

import { useRootNodes } from 'store/root-nodes/hooks';
import { useTransaction } from 'store/transaction/hooks';

const VOTING_CONTRACT_ABI = ['function veto(uint256) external'];

interface Props {
  proposal: DAOProposal;
  title: string;
  isVetoEnded: boolean;
}

function ProposalActions ({ proposal, title, isVetoEnded }: Props) {
  const { t } = useTranslation();

  const { address, currentSigner } = useWeb3Context();
  const { submitTransaction } = useTransaction();

  const { isRootNode } = useRootNodes();

  const isUserVetoed = useMemo(() => {
    return proposal.vetoed.some((addr) => addr.toLocaleLowerCase() === address.toLocaleLowerCase());
  }, [proposal, address]);

  const veto = useCallback(() => {
    const contract = new Contract(proposal.votingContract.id, VOTING_CONTRACT_ABI, currentSigner);
    return contract.veto(Number(proposal.proposalId), { from: address });
  }, [proposal.votingContract.id, currentSigner, address, proposal.proposalId]);

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <ShareButton title={`${proposal.id} ${title}`} url={window.location.href} />

      {!isVetoEnded && (
        <Tooltip
          disabled={isRootNode}
          trigger={
            <Button
              look="danger"
              style={{ width: '160px' }}
              disabled={isUserVetoed || !isRootNode}
              onClick={() => submitTransaction({
                successMessage: t('VETO_TX'),
                submitFn: veto,
              })}
            >
              {isUserVetoed ? t('YOU_VETOED') : t('VETO')}
            </Button>
          }
        >
          {t('ROOT_NODES_VETO_TIP')}
        </Tooltip>
      )}
    </div>
  );
}

export default ProposalActions;
