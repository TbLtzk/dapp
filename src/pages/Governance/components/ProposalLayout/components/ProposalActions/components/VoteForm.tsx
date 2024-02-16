
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { RadioGroup } from '@q-dev/q-ui-kit';
import { formatAsset, toBigNumber } from '@q-dev/utils';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';
import { Proposal } from 'typings/proposals';

import Button from 'components/Button';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { StyledVoteForm } from './styles';

import { useProposals } from 'store/proposals/hooks';
import { useTransaction } from 'store/transaction/hooks';

import { getVotingWeightProxyInstance } from 'contracts/contract-instance';

import { required } from 'utils/validators';
import { fromWei } from 'utils/web3';

interface Props {
  proposal: Proposal;
  isMemberVoting?: boolean;
  onSubmit: () => void;
}

function VoteForm ({ proposal, isMemberVoting, onSubmit }: Props) {
  const { t } = useTranslation();
  const { address } = useWeb3Context();
  const { submitTransaction } = useTransaction();
  const { qTicker } = useNetworkConfig();
  const { voteForProposal } = useProposals();
  const [baseWeight, setBaseWeight] = useState('0');
  const canUserVote = useMemo(
    () => isMemberVoting || toBigNumber(baseWeight).isGreaterThan(0),
    [baseWeight, isMemberVoting]
  );

  async function getBaseVotingWeightInfo () {
    try {
      const contract = await getVotingWeightProxyInstance();
      const result = await contract.getBaseVotingWeightInfo(address, proposal.votingEndTime.toString());
      setBaseWeight(fromWei(result.ownWeight));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      setBaseWeight('0');
    }
  }

  const form = useForm({
    initialValues: { vote: '' },
    validators: { vote: [required] },
    onSubmit: (form) => {
      submitTransaction({
        successMessage: t('VOTE_TX'),
        onConfirm: () => onSubmit(),
        submitFn: () => voteForProposal({
          type: 'basic',
          isVotedFor: form.vote === 'yes',
          proposal,
        })
      });
    }
  });

  useEffect(() => {
    getBaseVotingWeightInfo();
  }, []);

  return (
    <StyledVoteForm
      noValidate
      $selectedOption={form.values.vote === 'yes' ? 'for' : 'against'}
      onSubmit={form.submit}
    >
      {
        !canUserVote &&
        <div className="vote-form__voting-block">
          <p className="text-md">{t('VOTING_BLOCK')}</p>
        </div>
      }
      {!isMemberVoting &&
        <div>
          <p className="text-md">{t('TOTAL_VOTING_WEIGHT')}</p>
          <p
            className="text-xl font-semibold"
            title={baseWeight}
          >
            {formatAsset(baseWeight, qTicker)}
          </p>
        </div>
      }
      <RadioGroup
        {...form.fields.vote}
        extended
        name="vote"
        disabled={!canUserVote}
        options={[
          { label: t('YES'), value: 'yes' },
          { label: t('NO'), value: 'no' },
        ]}
      />

      <Button
        type="submit"
        style={{ width: '100%' }}
        disabled={!form.isValid || !canUserVote}
      >
        {t('SUBMIT')}
      </Button>
    </StyledVoteForm>
  );
}

export default VoteForm;
