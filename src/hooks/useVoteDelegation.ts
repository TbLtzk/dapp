import { useSelector } from 'react-redux';

import { votingAgent } from 'store/q-vault/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { ZERO_ADDRESS } from 'constants/config';

function useVoteDelegation (ownWeight: string, address = '') {
  const agent = useSelector(votingAgent);
  const userAddress = useSelector(userAddressMetamask);
  const voteAddress = address || userAddress;

  switch (true) {
    case !agent:
      return {
        delegateInfo: '...',
        votingInfo: '...'
      };

    case agent !== voteAddress && agent !== ZERO_ADDRESS:
      return {
        delegateInfo: `You delegated your voting rights to ${agent}`,
        votingInfo: `Your voting agent is ${agent}`
      };

    case Number(ownWeight) && agent === voteAddress:
      return {
        delegateInfo: 'You exercise your voting right yourself',
        votingInfo: 'You vote for yourself'
      };

    case agent === voteAddress:
      return {
        delegateInfo: 'You delegated your voting rights to yourself',
        votingInfo: 'You vote for yourself'
      };

    default:
      const title = 'You currently have no voting weight & rights';
      return {
        delegateInfo: title,
        votingInfo: title,
      };
  }
}

export default useVoteDelegation;
