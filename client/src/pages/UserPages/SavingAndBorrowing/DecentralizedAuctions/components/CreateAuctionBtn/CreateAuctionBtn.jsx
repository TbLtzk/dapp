import React, { useMemo, useState } from 'react';
import { web3 } from 'contracts/config/drizzle-config';
import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { drizzleRegistry, contracts } from 'contracts/config/drizzle-config';
import {
  setCreatedStepsLimit,
  setCreateObj,
  setStepCounter
} from 'store/actions/action-creaters/auctions/modalHandler';

import CreateQBtn from 'components/Custom/PageLists/CreateQBtn';
import ModalCreateAuction from './ModalCreateAuction';

import { bn } from 'contracts/handler/VotingHandler';
import Handler from 'pages/UserPages/SavingAndBorrowing/BorrowBlock/handler';
import { StableCoinQUSD } from 'contracts/src/StableCoin';
import { getPastEvents } from 'contracts/handler/VotingHandler';

const { useDrizzle } = drizzleReactHooks;

function CreateAuctionBtn(props) {
  const { activeTab } = props;
  const { drizzle } = useDrizzle();
  const userAddress = useSelector(userAddressMetamask);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const StableCoin = new StableCoinQUSD();
  // const handler = new Handler(userAddress, 'QETH' ,useDispatch());

  const onCreateAuction = async () => {
    dispatch(setStepCounter(1));
    dispatch(setCreatedStepsLimit(2));
    setModalShow(true);
    dispatch(setCreateObj({ first: activeTab }));
    // const vaultId = 1;
    // const bid = 10;

    // const bid = web3.utils.BN((web3.utils.toWei("10")));
    // console.log('bid', bid);
    // const bid = bn(100);
    // const bid = bn(10000000000000000000); //10
    const maxApproveAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
    // const bid = bn(1000000000000000000000); //100
    // const bid = bn(1000000000000000000000); //100

    // let res = await StableCoin.allowance(userAddress, '0xFef40e2286F2240843E55fE66F06c34e7d6Ae317');
    // console.log('res', res);
    // if (allowance < bid ) {
    //   make approve
    // }
    // await StableCoin.approve('0xFef40e2286F2240843E55fE66F06c34e7d6Ae317', maxApproveAmount, userAddress);
    // const result = await drizzle.contracts.LiquidationAuction.methods.startAuction(
    //   '0xd10a97806b8FdFC8E4CC83a49f35CCF513F0a1f3', vaultId, bid)
    //   .send({ from: userAddress });
    // const result = await drizzle.contracts.SystemDebtAuction.methods.startAuction(bid)
    //   .send({ from: userAddress });
    // console.log('LiquidationAuction', result);
    // const result = await drizzle.contracts.SystemSurplusAuction.methods.startAuction()
    //   .send({
    //     from: userAddress,
    //     value: bid
    //   });
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

