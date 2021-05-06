import React, { useEffect, useState } from 'react';
import LoadingSpinner from 'components/Base/LoadingSpinner';
import SmallBlock from './SmallBlock';
import Button from 'components/Base/Buttons/Button';

import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { useDispatch, useSelector } from 'react-redux';
import { loadingNumberAll, numberOfAllProposals, constitutionHash } from 'store/selectors/voting/proposals';
import { getNumberAllProposals, getConstitutionHash } from 'store/actions/action-creaters/voting/proposals';
import { latestConstitution, archiveConstitution } from 'contracts/handler/ConstitutionHandler';
import { Link } from 'react-router-dom';

function InfBlocksUp() {
  const [blockNumber, setBlockNumber] = useState('0');

  window.web3.eth.getBlock('latest')
    .then(response => {
      setBlockNumber(response.number || 0);
    });

  const dispatch = useDispatch();

  const numberAllProposals = useSelector(numberOfAllProposals);
  const loadingNumberAllProposals = useSelector(loadingNumberAll);
  const constitutionHashShow = useSelector(constitutionHash);

  useEffect(() => {
    dispatch(getNumberAllProposals());
    dispatch(getConstitutionHash());
  }, [dispatch]);

  return (
    <>
      <SmallBlock
        title="Blockchain"
        firstSubtitle="Block Height"
        secondSubtitle="System Contract Registry:"
        firstContent={<p> {blockNumber}</p>}
        secondContent={
          <p>
            {contractsToAddresses.ContractRegistry}
          </p>}
      />
      <SmallBlock
        title="Constitution"
        firstSubtitle="Hash:"
        secondSubtitle={null}
        firstContent={
          <p>
            {constitutionHashShow}
          </p>
        }
        secondContent={
          <div className={'actions'}>
            <a href={latestConstitution} target="_blank">
              <Button
                icon='download'
                title={'Download Latest'}
                handleButton={() => {
                }}
              />
            </a>
            <a href={archiveConstitution} target="_blank">
              <Button
                icon='archive-outline'
                title={'Check archive'}
                handleButton={() => {
                }}
              />
            </a>
          </div>
        }
      />
      <SmallBlock
        display={'columns'}
        title="Governance"
        firstSubtitle="Active proposals"
        secondSubtitle="Past proposals"
        firstContent={
          loadingNumberAllProposals ? <LoadingSpinner className={'card-spinner'}/> :
            <>
              <p>{numberAllProposals?.active}</p>
              <div className={'actions'}>
                <Link to={'/q-governance'}>
                  <Button
                    type={'white'}
                    icon="arrow-right"
                    title={'Go to Governance'}
                    handleButton={() => {
                    }}
                  />
                </Link>
              </div>
            </>
        }
        secondContent={
          loadingNumberAllProposals ? <LoadingSpinner className={'card-spinner'}/> :
            (<>
              <p>{numberAllProposals?.ended}</p>
            </>)
        }
      />
    </>
  );
}

export default InfBlocksUp;

