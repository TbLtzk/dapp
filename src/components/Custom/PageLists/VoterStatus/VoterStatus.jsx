import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsUserEPDRMember, getIsUserEPQFIMember, getIsUserEPRSMember } from 'store/membership/action-creators';
import {
  isUserEPDRMembershipSelector,
  isUserEPQFIMembershipSelector,
  isUserEPRSMembershipSelector
} from 'store/membership/selectors';
import { getUserBalance } from 'store/q-vault/action-creators';
import { userBalance } from 'store/q-vault/selectors';
import { getCheckIsUserRootNode } from 'store/root-node/action-creators';
import { isUserRootNode } from 'store/root-node/selectors';
import { userAddressMetamask } from 'store/user-inf/selectors';
import { getIsUserValidator } from 'store/validators/action-creators';
import { isUserValidator } from 'store/validators/selectors';

function VoterStatus () {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const isRootNode = useSelector(isUserRootNode);
  const isValidator = useSelector(isUserValidator);
  const isQTokenHolder = useSelector(userBalance);
  const isEPDRMembership = useSelector(isUserEPDRMembershipSelector);
  const isEPQFIMembership = useSelector(isUserEPQFIMembershipSelector);
  const isEPRSMembership = useSelector(isUserEPRSMembershipSelector);

  useEffect(() => {
    dispatch(getIsUserValidator(userAddress));
    dispatch(getUserBalance(userAddress));
    dispatch(getCheckIsUserRootNode(userAddress));
    dispatch(getIsUserEPDRMember());
    dispatch(getIsUserEPQFIMember());
    dispatch(getIsUserEPRSMember());
  }, [dispatch, userAddress]);

  const status = useMemo(() => {
    const status = [
      { title: 'Root node', isTrue: isRootNode },
      { title: 'Validator', isTrue: isValidator },
      { title: 'Q token holder', isTrue: Boolean(Number(isQTokenHolder)) },
      { title: 'DeFi risk expert', isTrue: isEPDRMembership },
      { title: 'Fees & Incentive expert', isTrue: isEPQFIMembership },
      { title: 'Q Root Node Selection Expert', isTrue: isEPRSMembership }
    ];
    const statuses = status.filter((value) => value.isTrue);
    if (!statuses.length) {
      return 'None';
    } else {
      return statuses.map((value) => value.title).join(', ');
    }
  }, [
    isRootNode,
    isValidator,
    isQTokenHolder,
    isEPDRMembership,
    isEPDRMembership,
    isEPQFIMembership,
    isEPRSMembership
  ]);

  return <>{status}</>;
}

export default VoterStatus;
