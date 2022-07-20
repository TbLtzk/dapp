import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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

function useVoterStatus () {
  const { t, i18n } = useTranslation();
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
    dispatch(getCheckIsUserRootNode());
    dispatch(getIsUserEPDRMember());
    dispatch(getIsUserEPQFIMember());
    dispatch(getIsUserEPRSMember());
  }, [dispatch, userAddress]);

  const status = useMemo(() => {
    const status = [
      { title: t('ROOT_NODE'), isTrue: isRootNode },
      { title: t('VALIDATOR'), isTrue: isValidator },
      { title: t('Q_TOKEN_HOLDER'), isTrue: Boolean(Number(isQTokenHolder)) },
      { title: t('DEFI_RISK_EXPERT'), isTrue: isEPDRMembership },
      { title: t('FEES_INCENTIVE_EXPERT'), isTrue: isEPQFIMembership },
      { title: t('Q_ROOT_NODE_SELECTION_EXPERT'), isTrue: isEPRSMembership }
    ];
    const statuses = status.filter((value) => value.isTrue);
    if (!statuses.length) {
      return t('NONE');
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
    isEPRSMembership,
    i18n.language
  ]);

  return status;
}

export default useVoterStatus;
