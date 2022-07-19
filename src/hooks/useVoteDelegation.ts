import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { votingAgent } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { ZERO_ADDRESS } from 'constants/config';

function useVoteDelegation (ownWeight: string, address = '') {
  const agent = useSelector(votingAgent);
  const userAddress = useSelector(userAddressMetamask);
  const voteAddress = address || userAddress;
  const { t } = useTranslation();

  switch (true) {
    case !agent:
      return {
        delegateInfo: '...',
        votingInfo: '...',
      };

    case agent !== voteAddress && agent !== ZERO_ADDRESS:
      return {
        delegateInfo: `${t('YOU_DELEGATED_YOUR_VOTING_RIGHTS_TO')} ${agent}`,
        votingInfo: `${t('YOUR_VOTING_AGENT_IS')} ${agent}`,
      };

    case Number(ownWeight) && agent === voteAddress:
      return {
        delegateInfo: t('YOU_EXERCISE_YOUR_VOTING_RIGHT_YOURSELF'),
        votingInfo: t('YOU_VOTE_FOR_YOURSELF'),
      };

    case agent === voteAddress:
      return {
        delegateInfo: t('YOU_DELEGATED_YOUR_VOTING_RIGHTS_TO_YOURSELF'),
        votingInfo: t('YOU_VOTE_FOR_YOURSELF'),
      };

    default:
      const title = t('YOU_CURRENTLY_HAVE_NO_VOTING_WEIGHT_RIGHTS');
      return {
        delegateInfo: title,
        votingInfo: title,
      };
  }
}

export default useVoteDelegation;
