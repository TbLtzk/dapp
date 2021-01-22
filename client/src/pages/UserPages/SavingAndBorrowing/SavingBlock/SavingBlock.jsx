import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSlide from 'components/Base/Buttons/ButtonSlide';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { uintPercentToNumber, fN } from 'func/useful';
import { web3 } from 'contracts/config/drizzle-config';

import { CardDetail } from '../styles';
import Handler from './handler';

export default function SavingBlock(props) {
  const { actCardData } = props;

  const [savingBalance, setSavingBalance] = useState(0);
  const [latestClaim, setLatestClaim] = useState(0);
  const [avToDeposit, setAvToDeposit] = useState(0);
  const [estInterest, setEstInterest] = useState(0);
  const [savingRate, setSavingRate] = useState(0);
  const [claimReward, setClaimReward] = useState('0');

  const address = useSelector(userAddressMetamask);
  const handler = new Handler(address, useDispatch());

  useEffect(async () => {
    if (actCardData.type !== 'saving') return;

    handler.setSavingBalanceAndLatestClaim(setSavingBalance, setLatestClaim);
    handler.setAvailableToDeposit(setAvToDeposit);
    handler.setSavingRate(setSavingRate);
  }, [actCardData]);

  const calculateClaimReward = () => {
    const timeLastClaim = Math.floor(Date.now() / 1000) - latestClaim;
    const balAtPrClaim = web3.utils.toWei(new web3.utils.BN(savingBalance));

    let res = (1 + uintPercentToNumber(savingRate)) ** timeLastClaim * balAtPrClaim - balAtPrClaim;
    res = web3.utils.fromWei(new web3.utils.BN(String(res)));
    setClaimReward(String(res));
  };

  useEffect(() => {
    if (actCardData.intRate !== undefined) {
      const estInterestL = savingBalance * (actCardData.intRate / 100);
      setEstInterest(estInterestL);
    }
    calculateClaimReward();
  });

  const deposit = (formData) => {
    handler.deposit(formData.field, setSavingBalance, setAvToDeposit);
  };

  const withdraw = (formData) => {
    handler.withdraw(formData.field, setSavingBalance, setAvToDeposit);
  };

  const mint = (formData) => {
    handler.mint(formData.field, setAvToDeposit);
  };

  const claim = () => {
    handler.claim(setClaimReward);
  };

  return (
    <Col xs={12}>
      <CardDetail>
        <p className="title-1">Save QUSD</p>
        <p className="title-2">Deposit</p>
        <div className="txt">
          <span>Asset</span>
          <span>QUSD</span>
        </div>
        <div className="txt">
          <span>Saving Balance</span>
          <span>{fN(savingBalance)}</span>
        </div>
        <div className="txt">
          <span>Available to deposit</span>
          <span>{fN(avToDeposit)}</span>
        </div>
        <p className="title-2">Interest</p>
        <div className="txt">
          <span>Receive Asset</span>
          <span>QUSD</span>
        </div>
        <div className="txt">
          <span>Estimated Interest</span>
          <span>{fN(estInterest)}</span>
        </div>
        <div className="txt">
          <span>Interest Rate p.a.</span>
          <span>{actCardData.intRate === undefined ? '-' : `${fN(actCardData.intRate)}%`}</span>
        </div>
        <div className="btn-group">
          <ButtonSlide
            btnTxt="Claim reward"
            btnShortTxt="Claim"
            onclick={claim}
            inpType="number"
            inpPlaceholder={fN(claimReward)}
            inpRules={{ required: false }}
            disabled={true}
          />
          <ButtonSlide
            btnTxt="Deposit Saving Asset"
            btnShortTxt="Deposit"
            onclick={deposit}
            inpType="number"
            inpPlaceholder="Amount (QUSD)"
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Withdraw Saving Asset"
            btnShortTxt="Withdraw"
            onclick={withdraw}
            inpType="number"
            inpPlaceholder="Amount (QUSD)"
            inpRules={{ required: true }}
          />
        </div>
        <ButtonSlide
          btnTxt="Mint (Test only)"
          btnShortTxt="Mint"
          onclick={mint}
          inpType="text"
          inpPlaceholder="Amount to mint"
          inpRules={{ required: true }}
        />
      </CardDetail>
    </Col>
  );
}

SavingBlock.propTypes = {
  actCardData: PropTypes.object.isRequired,
};
