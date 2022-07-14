import { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { camelCase, startCase } from 'lodash';
import { AuctionBid, AuctionCompletedInfos, LiquidationAuctionBid } from 'typings/auctions';
import Button from 'ui/Button';
import Input from 'ui/Input';
import Modal from 'ui/Modal';

import InfoTip from 'components/Custom/InfoTip';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import { ApproveTipWrapper } from './styles';

import { bidForAuction } from 'store/auctions/actions';
import { setTransactionLoading, setTransactionLoadingSuccess } from 'store/transaction-handler/action-creators';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getStableCoinInstance } from 'contracts/contract-instance';
import { getAuctionInstance } from 'contracts/helpers/auction';

import formTypes from 'constants/form-types';
import { MAX_APPROVE_AMOUNT } from 'constants/numbers';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { BN } from 'func/useful';
import { max, min, required } from 'func/validators';

const DEFAULT_VALUES = {
  bid: '',
};

interface Props {
  auction: AuctionCompletedInfos;
  modalOpen: boolean;
  onHide: () => void
}

const LocalStateContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function BidModal ({ modalOpen, auction, onHide, }:Props) {
  const dispatch = useDispatch();
  const userAddress = useSelector(userAddressMetamask);

  const form = useForm({
    initialValues: DEFAULT_VALUES,
    validators: { bid: [required, min(auction.raisingBid), max('1000000000000000')] },
    onSubmit: (values) => {
      dispatch(bidForAuction(auction.auctionType, {
        ...values,
        vaultOwner: (auction as LiquidationAuctionBid).vaultOwner,
        auctionId: (auction as AuctionBid).auctionId,
        vaultId: (auction as LiquidationAuctionBid).vaultId
      }));
    },
  });

  const handleHide = () => {
    form.reset();
    onHide();
  };

  useMetamaskReset(formTypes.bidForAuction, handleHide);

  const modalTitle = `Bid for ${startCase(camelCase(auction.auctionType))}`;

  const [allowance, setAllowance] = useState<string | number>(0);
  const [isApproved, setIsApproved] = useState(true);

  useEffect(() => {
    async function getAllowanceValue () {
      const stableCoin = await getStableCoinInstance();
      const { address } = await getAuctionInstance(auction.auctionType);

      const allowance = await stableCoin.allowance(userAddress, address);
      setAllowance(allowance);
    }

    getAllowanceValue();
  }, [isApproved]);

  const handleBidChange = async (value: string) => {
    form.fields.bid.onChange(value);
    setIsApproved(BN(value).comparedTo(allowance) !== 1);
  };

  async function approveContract () {
    const contract = await getStableCoinInstance();
    const { address } = await getAuctionInstance(auction.auctionType);

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

  const bidTitle = auction.auctionType === 'systemDebt' ? 'Provide your Bid' : 'Provide a Bid for this auction';

  return (
    <Modal
      open={modalOpen}
      title={modalTitle}
      onClose={handleHide}
    >
      <form noValidate onSubmit={form.submit}>

        <Input
          {...form.fields.bid}
          type="number"
          label={`${bidTitle} (minimum: ${auction.raisingBid} ${auction.bidAsset})`}
          placeholder="Bid"
          onChange={handleBidChange}
        />

        {!isApproved && (
          <InfoTip style={{ marginTop: '10px' }}>
            <ApproveTipWrapper>
              <p>
                You have to approve the contract interaction <br /> before making a bid
              </p>
              <Button onClick={approveContract}>Approve</Button>
            </ApproveTipWrapper>
          </InfoTip>
        )}

        <Button
          type="submit"
          style={{ width: '100%', marginTop: '24px' }}
          disabled={!form.isValid || !isApproved}
        >
          Confirm
        </Button>

      </form>
    </Modal>
  );
}

export const useBid = () => useContext(LocalStateContext);

export default BidModal;
