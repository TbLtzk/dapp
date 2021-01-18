import React, { useMemo, useState } from 'react';
import { web3 } from 'contracts/config/drizzle-config';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import {
  setCreatedStepsLimit,
  setCreateProposalObj,
  setStepCounter
} from 'store/actions/action-creaters/voting/proposals';

import CreateQBtn from 'components/Custom/PageLists/CreateQBtn';

import { liquidation, systemDebt, systemSurplus } from './constants';
import { bn } from '../../../../../../api/contracts/Voting/handler/commonFunc';

const { useDrizzle } = drizzleReactHooks;

function CreateAuctionBtn(props) {
  const { activeTab } = props;
  const { drizzle } = useDrizzle();
  const userAddress = useSelector(userAddressMetamask);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const activeTabTitle = useMemo(() => {
    switch (activeTab) {
      case 'liquidation':
        return liquidation;
      case 'system-debt':
        return systemDebt;
      case 'system-surplus':
        return systemSurplus;
      default:
        return liquidation;
    }
  }, [activeTab]);

  const onCreateAuction = async () => {
    // dispatch(setStepCounter(1));
    // setModalShow(true);
    // switch (activeTab) {
    //   case 'liquidation':
    //     dispatch(setCreatedStepsLimit(4));
    //     break;
    //   case 'system-debt':
    //     dispatch(setCreatedStepsLimit(3));
    //     break;
    //   case 'system-surplus':
    //     dispatch(setCreatedStepsLimit(3));
    //     break;
    // }
    // const result = await getPastEvents(drizzle, 'LiquidationAuction', 'AuctionStarted');
    // const result = await drizzle.contracts.LiquidationAuction.methods.auctions().call();
    const vaultId = 0;
    // const bid = 10;

    // const bid = web3.utils.BN((web3.utils.toWei("10")));
    // console.log('bid', bid);
    // const bid = bn(100);
    const bid = bn(10000000000000000000); //10
    // const bid = bn(1000000000000000000000); //100
    // const bid = bn(1000000000000000000000); //100
    // const result = await drizzle.contracts.LiquidationAuction.methods.startAuction(
    //   '0xd10a97806b8FdFC8E4CC83a49f35CCF513F0a1f3', vaultId, bid)
    //   .send({ from: userAddress });
    // console.log('LiquidationAuction', result);
    const result = await drizzle.contracts.SystemSurplusAuction.methods.startAuction()
      .send({
        from: userAddress,
        value: bid
      });
  };

  return (
    <>
      <CreateQBtn
        onCreate={onCreateAuction}
        activeTabTitle={activeTabTitle}
      />

      {/*<ModalCreateProposal*/}
      {/*  activeTab={activeTab}*/}
      {/*  activeTabTitle={activeTabTitle}*/}
      {/*  modalShow={modalShow}*/}
      {/*  onHide={() => {*/}
      {/*    setModalShow(false);*/}
      {/*    dispatch(setCreateProposalObj({}));*/}
      {/*  }}*/}
      {/*/>*/}
    </>

  );
}

export default CreateAuctionBtn;

