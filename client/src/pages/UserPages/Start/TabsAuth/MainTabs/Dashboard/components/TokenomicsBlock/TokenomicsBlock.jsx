import React, { useEffect, useState } from 'react';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import SmallBlock from '../SmallBlock';

import { Col, Row } from 'react-bootstrap';
import { LoadingWrap } from 'components/Custom/MembersPanel/styles';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { loadingNumberAll, numberOfAllProposals } from 'store/selectors/voting/proposals';
import { getNumberAllProposals } from 'store/actions/action-creaters/voting/proposals';
import CustomBlock from '../../../../../../../../components/Base/CustomBlock';
import { Title } from '../../styles';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function TokenomicsBlock() {
  const state = useDrizzleState(state => state);

  const dispatch = useDispatch();

  // const numberAllProposals = useSelector(numberOfAllProposals);
  // const loadingNumberAllProposals = useSelector(loadingNumberAll);
  //
  // useEffect(() => {
  //   dispatch(getNumberAllProposals());
  // }, [dispatch]);

  return (
    <div>
      <CustomBlock style={{
        padding: '14px 10px',
        width: '100%'
      }}>
        <Title>Tokenomics</Title>

      </CustomBlock>
    </div>
  );
}

export default TokenomicsBlock;

