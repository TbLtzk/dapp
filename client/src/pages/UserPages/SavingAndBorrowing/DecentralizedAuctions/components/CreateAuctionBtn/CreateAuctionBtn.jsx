import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setCreatedStepsLimit,
  setCreateObj,
  setStepCounter
} from 'store/actions/action-creaters/auctions/modalHandler';

import CreateQBtn from 'components/Custom/PageLists/CreateQBtn';
import ModalCreateAuction from './ModalCreateAuction';

function CreateAuctionBtn(props) {
  const { activeTab } = props;
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const onCreateAuction = async () => {
    dispatch(setStepCounter(1));
    dispatch(setCreatedStepsLimit(2));
    setModalShow(true);
    dispatch(setCreateObj({ first: activeTab }));
  };

  return (
    <>
      <CreateQBtn
        onCreate={onCreateAuction}
        activeTabTitle={activeTab?.replace(/-/g, ' ') + ' Auction'}
      />
      <ModalCreateAuction
        activeTab={activeTab}
        modalShow={modalShow}
        onHide={() => {
          setModalShow(false);
          dispatch(setCreateObj({}));
        }}
      />
    </>

  );
}

export default CreateAuctionBtn;

