import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { votingAgent } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { trimAddress } from 'utils/strings';

function useVoteDelegation () {
  const { t } = useTranslation();

  const agent = useSelector(votingAgent);
  const userAddress = useSelector(userAddressMetamask);

  if (!agent) return '...';

  if (agent !== userAddress && agent !== ZERO_ADDRESS) {
    return `${t('YOUR_VOTING_AGENT_IS')} ${trimAddress(agent)}`;
  }

  if (agent === userAddress) {
    return t('YOU_VOTE_FOR_YOURSELF');
  }

  return t('YOU_CURRENTLY_HAVE_NO_VOTING_WEIGHT_RIGHTS');
}

export default useVoteDelegation;
