import React, { useEffect, useState } from 'react';
import { Accordion, Col } from 'react-bootstrap';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import CardHeader from './CardHeader';
import CardBody from './CardBody';

import { CardBlock, LoadingW } from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import ModalBid from '../CreateAuctionBtn/ModalBid';
import { remainDate } from 'func/convertDate';
import { bidForAuction, executeAuction } from 'store/actions/action-creaters/auctions/auctions';
import {
  setCreatedStepsLimit, setCreateObj,
  setStepCounter, setDisabledCreatedObjBtn
} from 'store/actions/action-creaters/auctions/modalHandler';

function AuctionsList(props) {
  const { auctions, loading, errorMessage, activeTab } = props;
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);
  const [modalShow, setModalShow] = useState(false);
  const [inf, setInf] = useState(null);

  const onAuctionBid = (user, vaultId, contract, id, bid) => {
    setInf({
      user,
      vaultId,
      contract,
      id: id,
    });
    dispatch(setStepCounter(1));
    dispatch(setCreatedStepsLimit(2));
    setModalShow(true);
    dispatch(setCreateObj({ first: activeTab }));

    // const bid = bn(14000000000000000000); //10
    // dispatch(bidForAuction({
    //   user,
    //   vaultId,
    //   bid,
    //   contract,
    // }));
  };

  const onAuctionExecute = (user, vaultId, contract, id) => {
    dispatch(executeAuction({
      user,
      vaultId,
      contract,
      id: id
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
                return <CardBlock key={auction?.contract === 'SystemSurplusAuction' ? auction.id : i + auction?.contract}>
                  <CardHeader
                    auction={auction}
                    title={auction?.title}
                    status={auction?.status}
                    isExecuted={auction?.isExecuted}
                    handleBid={() => {
                      onAuctionBid(auction.user, auction.userVaultId, auction.contract, auction?.id);
                    }}
                    handleExecute={() => {
                      onAuctionExecute(auction.user, auction.userVaultId, auction.contract, auction?.id);
                    }}
                    remainDate={remainDate(auction.endTime)}
                  />
                  <CardBody
                    id={auction?.contract === 'SystemSurplusAuction' ? auction.id : i + auction?.contract}
                    data={auction}
                  />
                </CardBlock>;
              })
        }
      </Accordion>
      <ModalBid
        inf={inf}
        activeTab={activeTab}
        modalShow={modalShow}
        onHide={() => {
          setModalShow(false);
          dispatch(setCreateObj({}));
          dispatch(setStepCounter(1));
          // dispatch(setDisabledCreatedObjBtn(true));
        }}
      />
    </>
  );
}

export default AuctionsList;

