import React, { useState } from 'react';
import { Accordion, Col } from 'react-bootstrap';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

import { CardBlock, LoadingW } from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import ModalVote from 'pages/UserPages/QGovernance/components/CreateQProposalBtn/ModalVote';
import { remainDate } from 'func/convertDate';
import { bn } from '../../../../../../contracts/handler/VotingHandler';
import { bidForAuction, executeAuction } from '../../../../../../store/actions/action-creaters/auctions/auctions';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

function AuctionsList(props) {
  const { auctions, loading, errorMessage, activeTab } = props;
  const { drizzle } = useDrizzle();
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const [modalShow, setModalShow] = useState(false);
  const [proposalId, setProposalId] = useState(null);
  const [vetoEndTime, setVetoEndTime] = useState(null);
  const [proposalContract, setProposalContract] = useState(null);

  const onAuctionBid = (user, vaultId, contract) => {
    const bid = bn(14000000000000000000); //10
    dispatch(bidForAuction({
      user,
      vaultId,
      bid,
      contract,
    }));
  };

  const onAuctionExecute = (user, vaultId, contract) => {
    dispatch(executeAuction({
      user,
      vaultId,
      contract
    }));
  };

  return (
    <>
      <Accordion defaultActiveKey="0">
        {loading ? <LoadingW xs={12}><LoadingSpinner/></LoadingW> :
          errorMessage ? <p>No auctions</p> :
            auctions.length === 0
              ? <p>No auctions</p>
              : auctions.map((auction, i) => {
                return <CardBlock key={i + auction?.contract}>
                  <CardHeader
                    title={auction?.title}
                    status={auction?.status}
                    handleBid={() => {
                      onAuctionBid(auction.user, auction.userVaultId, auction.contract);
                    }}
                    handleExecute={() => {
                      onAuctionExecute(auction.user, auction.userVaultId, auction.contract);
                    }}
                    remainDate={remainDate(auction.endTime)}
                  />
                  <CardBody
                    id={i + auction?.contract}
                    data={auction}
                  />
                </CardBlock>;
              })
        }
      </Accordion>
      <ModalVote
        proposalContract={proposalContract}
        proposalId={proposalId}
        vetoEndTime={vetoEndTime}
        activeTab={activeTab}
        modalShow={modalShow}
        onHide={() => {
          setModalShow(false);
          // dispatch(setVoteProposalObj({}));
          // dispatch(setStepVoteCounter(1));
          // dispatch(setDisabledCreatedProposalBtn(true));

        }}
      />
    </>
  );
}

export default AuctionsList;

