import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import Input from 'components/Base/Form/Input';
import ModalStep from 'components/Base/ModalStep';
import InfoTip from 'components/Custom/InfoTip';

import useForm from 'hooks/useForm';

import { useBid } from '../../BidModal';

import { ApproveTipWrapper } from './styles';

import { setTransactionLoading, setTransactionLoadingSuccess } from 'store/transaction-handler/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getStableCoinInstance } from 'contracts/contract-instance';
import { switchContract } from 'contracts/helpers/auctions-helpers/auction-service-helper';

import { MAX_APPROVE_AMOUNT } from 'constants/numbers';
import { AUCTIONS_TYPES, TRANSACTION_TYPES } from 'constants/statuses';
import { BN } from 'func/useful';
import { min, required } from 'func/validators';

function BidStep ({ type, symbol, auction }) {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const { goNext } = useBid();

  const form = useForm({
    initialValues: { bid: '' },
    validators: { bid: [required, min(auction.raisingBid)] },
    onSubmit: goNext,
  });

  const [allowance, setAllowance] = useState(0);
  const [isApproved, setIsApproved] = useState(true);

  useEffect(() => {
    async function getAllowanceValue () {
      const stableCoin = await getStableCoinInstance();
      const { address } = await switchContract(auction.contract);

      const allowance = await stableCoin.allowance(userAddress, address);
      setAllowance(allowance);
    }

    getAllowanceValue();
  }, [isApproved]);

  const handleBidChange = async (value) => {
    form.fields.bid.onChange(value);
    setIsApproved(BN(value).comparedTo(allowance) !== 1);
  };

  async function approveContract () {
    const contract = await getStableCoinInstance();
    const { address } = await switchContract(auction.contract);

    try {
      dispatch(setTransactionLoading());
      await contract.approve(address, MAX_APPROVE_AMOUNT, { from: userAddress });
      setIsApproved(true);
    } catch {
      setIsApproved(false);
    } finally {
      dispatch(setTransactionLoadingSuccess({ transactionType: TRANSACTION_TYPES.success }));
    }
  }

  const bidTitle = type === AUCTIONS_TYPES.systemDebt
    ? 'Provide your Bid'
    : 'Provide a Bid for this auction';

  return (
    <ModalStep
      disabled={!form.isValid || !isApproved}
      onNext={form.submit}
    >
      <Input
        {...form.fields.bid}
        invertedColors
        type="number"
        label={`${bidTitle} (minimum: ${auction.raisingBid} ${symbol})`}
        placeholder={`Your bid in ${symbol}`}
        onChange={handleBidChange}
      />

      {!isApproved && (
        <InfoTip style={{ marginTop: '15px' }}>
          <ApproveTipWrapper>
            <p>You have to approve the contract interaction <br /> before making a bid</p>
            <Button onClick={approveContract}>Approve</Button>
          </ApproveTipWrapper>
        </InfoTip>
      )}
    </ModalStep>
  );
}

export default BidStep;
