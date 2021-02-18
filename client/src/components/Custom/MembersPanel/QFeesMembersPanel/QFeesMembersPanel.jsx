import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getEPQFIMembers } from 'store/actions/action-creaters/membership';
import {
  EPQFI_Members, EPQFI_MembersLoading, EPQFI_MembersError
} from 'store/selectors/membership';

import ExpertsPanel from 'components/Custom/MembersPanel/ExpertsPanel';

function QFeesMembersPanel() {
  const loading = useSelector(EPQFI_MembersError);
  const errorMessage = useSelector(EPQFI_MembersLoading);
  const members = useSelector(EPQFI_Members);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEPQFIMembers());
  }, [dispatch]);

  return (
    <ExpertsPanel
      members={members}
      loading={loading}
      errorMessage={errorMessage}
      title="Q Fees & Incentives"
    />

  );
}

export default QFeesMembersPanel;

