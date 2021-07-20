import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsUserValidator } from 'store/actions/action-creaters/validators';
import { getUserBalance } from 'store/actions/action-creaters/q-vault';
import { getIsUserEPDRMember, getIsUserEPQFIMember } from 'store/actions/action-creaters/membership';

import { isUserRootNode } from 'store/selectors/root-contract';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { isUserValidator } from 'store/selectors/validators';
import { isUserEPDRMembership, isUserEPQFIMembership } from 'store/selectors/membership';

import { userBalance } from 'store/selectors/q-vault';

function VoterStatus() {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const isRootNode = useSelector(isUserRootNode);
  const isValidator = useSelector(isUserValidator);
  const userQVBalance = useSelector(userBalance);
  const isEPDRMembership = useSelector(isUserEPDRMembership);
  const isEPQFIMembership = useSelector(isUserEPQFIMembership);

  useEffect(() => {
    dispatch(getIsUserValidator(userAddress));
    dispatch(getUserBalance(userAddress));
    dispatch(getIsUserEPDRMember(userAddress));
    dispatch(getIsUserEPQFIMember(userAddress));
  }, [dispatch]);

  const showStatus = useMemo(() => {
    const arrStatus = [];
    if (isRootNode) {
      arrStatus.push('Root Node');
    }
    if (isValidator) {
      arrStatus.push('Validator');
    }
    if (userQVBalance !== '0') {
      arrStatus.push('Q Token Holder');
    }
    if (isEPDRMembership) {
      arrStatus.push('DeFi Risk Expert');
    }
    if (isEPQFIMembership) {
      arrStatus.push('Fees & Incentive Expert');
    }
    if (arrStatus.length === 0) {
      return 'None';
    } else {
      return arrStatus.join(', ');
    }
  }, [isRootNode, isValidator, userQVBalance]);

  return (
    <>{showStatus}</>
  );
}

export default VoterStatus;

