import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setCreatedStepsLimit,
  setCreateObj,
  setStepCounter
} from 'store/actions/action-creaters/auctions/modalHandler';

import ModalCreateAuction from './ModalCreateAuction';
import Button from 'components/Base/Buttons/Button';

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
      <Button
        icon="plus-circle-outline"
        handleButton={onCreateAuction}
        title={`Create ${activeTab?.replace(/-/g, ' ') + ' auction'}`}
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

