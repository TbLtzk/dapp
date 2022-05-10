import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';

import ModalCreateAuction from './ModalCreateAuction';

import { setCreatedStepsLimit, setCreateObj, setStepCounter } from 'store/modal-handler/action-creators';
import { successMessageSelector } from 'store/transaction-handler/selectors';

function CreateAuctionBtn ({ auctionsType }) {
  const shouldCloseModal = useSelector(successMessageSelector);
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const title = `Create ${auctionsType.replace(/-/g, ' ') + ' Auction'}`;

  const onCreateAuction = async () => {
    dispatch(setStepCounter(1));
    dispatch(setCreatedStepsLimit(2));
    setModalShow(true);
    dispatch(setCreateObj({ contract: auctionsType }));
  };

  const onHide = () => {
    setModalShow(false);
    dispatch(setCreateObj({}));
  };

  useEffect(() => {
    if (shouldCloseModal) {
      setModalShow(false);
      dispatch(setCreateObj({}));
    }
  }, []);

  return (
    <>
      <Button
        icon="plus-circle-outline"
        handleButton={onCreateAuction}
        title={title}
      />
      <ModalCreateAuction
        activeTab={auctionsType}
        modalShow={modalShow}
        onHide={onHide}
      />
    </>
  );
}

export default CreateAuctionBtn;
