import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ButtonSlide from 'components/Base/Buttons/ButtonSlide';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { SavingQUSD } from 'contracts/Saving';
import { roundNumber } from 'func/useful';
import { web3 } from 'contracts/config/drizzle-config';
import { GovernedEpdrQbtcAddress, GovernedEpdrQethAddress, StableCoinQUSD } from 'contracts/StableCoin';

import { CardDetail } from '../styles';
import Handler from './handler';

export default function SavingBlock(props) {
  const { actCardData } = props;

  const [savingBalance, setSavingBalance] = useState(0);
  const [avToDeposit, setAvToDeposit] = useState(0);
  const [estInterest, setEstInterest] = useState(0);

  const address = useSelector(userAddressMetamask);
  const handler = new Handler(address, actCardData?.vault?.colKey);

  useEffect(async () => {
    if (actCardData.type !== 'saving') return;

    handler.setSavingBalance(setSavingBalance);
    handler.setAvailableToDeposit(setAvToDeposit);
  }, [actCardData]);

  useEffect(() => {
    if (actCardData.intRate !== undefined) {
      const estInterestL = roundNumber(savingBalance * (actCardData.intRate / 100), 4);
      setEstInterest(estInterestL);
    }
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
          <span>{savingBalance}</span>
        </div>
        <div className="txt">
          <span>Available to deposit</span>
          <span>{avToDeposit}</span>
        </div>
        <p className="title-2">Interest</p>
        <div className="txt">
          <span>Receive Asset</span>
          <span>QUSD</span>
        </div>
        <div className="txt">
          <span>Estimated Interest</span>
          <span>{estInterest}</span>
        </div>
        <div className="txt">
          <span>Interest Rate p.a.</span>
          <span>{actCardData.intRate === undefined ? '-' : `${actCardData.intRate}%`}</span>
        </div>
        <div className="btn-group">
          <ButtonSlide
            btnTxt="Deposit Saving Asset"
            btnShortTxt="Deposit"
            onclick={deposit}
            inpType="number"
            inpPlaceholder="Amount (Q)"
            inpRules={{ required: true }}
          />
          <ButtonSlide
            btnTxt="Withdraw Saving Asset"
            btnShortTxt="Withdraw"
            onclick={withdraw}
            inpType="number"
            inpPlaceholder="Amount (Q)"
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
