import React, { useCallback, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';
import { getEPDRUint } from 'contracts/handler/ContractsEPDR';

import { SubTitle, SummarText, SummarTextType } from 'components/Custom/ModalActions/styles';


function CreateStep2(props) {
  const { activeTab, register, errors } = props;
  const formData = useSelector(formObject);
  const [surplusLot, setSurplusLot] = useState('0');
  const [reserveLot, setReserveLot] = useState('0');

  useEffect (() => {
    getEPDRUint("governed.EPDR.QUSD_surplusLot", setSurplusLot);
    getEPDRUint("governed.EPDR.reserveLot", setReserveLot);
  },[])

  const showCommonData = (children) => {
    return (
      <div>
        <SubTitle>Chosen data:</SubTitle>
        <SummarText>Type:
          <SummarTextType> {formData?.first?.replace(/-/g, ' ')}</SummarTextType>
        </SummarText>
        {children}
        <SummarText>Bid: {formData['bid']}</SummarText>
      </div>
    );
  };

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case 'liquidation':
        return showCommonData(
          <>
            <SummarText style={{ marginBottom: 0 }}>Address of vault holder, which shall be liquidated:</SummarText>
            <SummarText>{formData.address}</SummarText>
            <SummarText>The Vault ID to be liquidated: {formData['vault-id']}</SummarText>
          </>
        );
      case 'system-debt' :
        return showCommonData(<>
        <SummarText>Auction Lot: {reserveLot} Q</SummarText>
        </>);
      case 'system-surplus':
        return showCommonData(<>
        <SummarText>Auction Lot: {surplusLot} QUSD</SummarText>
        </>);
      default:
        return null;
    }

  }, [activeTab, register,surplusLot, reserveLot, errors]);

  return (
    <>
      {contentSwitcher()}
    </>
  );
}

export default CreateStep2;

