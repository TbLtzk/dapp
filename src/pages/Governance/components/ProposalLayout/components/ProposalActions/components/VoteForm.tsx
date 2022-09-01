
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Proposal } from 'typings/proposals';
import { fromWei } from 'web3-utils';

import Button from 'ui/Button';
import RadioGroup from 'ui/RadioGroup';

import useForm from 'hooks/useForm';

import { StyledVoteForm } from './styles';

import { voteForProposal } from 'store/voting/proposals/actions';
import { baseVotingWeightInfoSelector } from 'store/voting/proposals/selectors';

import { formatAsset } from 'utils/numbers';
import { required } from 'utils/validators';

interface Props {
  proposal: Proposal
  isMemberVoting?: boolean;
}

function VoteForm ({ proposal, isMemberVoting }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { ownWeight } = useSelector(baseVotingWeightInfoSelector);

  const weight = formatAsset(fromWei(ownWeight || '0'), 'Q');

  const form = useForm({
    initialValues: { vote: '' },
    validators: { vote: [required] },
    onSubmit: (form) => {
      dispatch(
        voteForProposal({
          type: 'basic',
          isVotedFor: form.vote === 'yes',
          proposal
        }, t('VOTE_SUCCESS'))
      );
    }
  });

  return (
    <StyledVoteForm
      noValidate
      $selectedOption={form.values.vote === 'yes' ? 'for' : 'against'}
      onSubmit={form.submit}
    >
      {!isMemberVoting &&
        <div>
          <p className="text-md">{t('TOTAL_VOTING_WEIGHT')}</p>
          <p
            className="text-xl font-semibold"
            title={weight}
          >
            {weight}
          </p>
        </div>
      }
      <RadioGroup
        {...form.fields.vote}
        extended
        name="vote"
        options={[
          { label: t('YES'), value: 'yes' },
          { label: t('NO'), value: 'no' },
        ]}
      />

      <Button
        type="submit"
        style={{ width: '100%' }}
        disabled={!form.isValid}
      >
        {t('SUBMIT')}
      </Button>
    </StyledVoteForm>
  );
}

export default VoteForm;
