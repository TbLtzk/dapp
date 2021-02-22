import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getEPDRMembers } from 'store/actions/action-creaters/membership';
import {
  EPDR_Members, EPDR_MembersError, EPDR_MembersLoading
} from 'store/selectors/membership';

import ExpertsPanel from 'components/Custom/MembersPanel/ExpertsPanel';

function DefiMembersPanel() {
  const loading = useSelector(EPDR_MembersLoading);
  const errorMessage = useSelector(EPDR_MembersError);
  const members = useSelector(EPDR_Members);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEPDRMembers());
  }, [dispatch]);

  return (
    <ExpertsPanel
      members={members}
      loading={loading}
      errorMessage={errorMessage}
      title="DeFi Risk"
    />
  );
}

export default DefiMembersPanel;

