import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { snakeCase } from 'lodash';
import { AuctionBid, AuctionCompletedInfos, LiquidationAuctionBid } from 'typings/auctions';
import Button from 'ui/Button';
import Input from 'ui/Input';
import Modal from 'ui/Modal';
import Tip from 'ui/Tip';

import useForm from 'hooks/useForm';
import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import { bidForAuction } from 'store/auctions/actions';
import { setTransactionLoading, setTransactionLoadingError, setTransactionLoadingSuccess } from 'store/transaction-handler/actions';
import { userAddressMetamask } from 'store/user-inf/selectors';

import { getStableCoinInstance } from 'contracts/contract-instance';
import { getAuctionInstance } from 'contracts/helpers/auction';

import formTypes from 'constants/form-types';
import { MAX_APPROVE_AMOUNT } from 'constants/numbers';
import { TRANSACTION_TYPES } from 'constants/statuses';
import { captureError, getErrorMessage, getSuccessMessage } from 'func/errors';
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
  const { t } = useTranslation();

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
      }, t('BID_FOR_AUCTION_SUCCESS')));
    },
  });

  const handleHide = () => {
    form.reset();
    onHide();
  };

  useMetamaskReset(formTypes.bidForAuction, handleHide);

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
      const transaction = await contract.approve(address, MAX_APPROVE_AMOUNT, { from: userAddress });
      setIsApproved(true);
      dispatch(setTransactionLoadingSuccess(getSuccessMessage(TRANSACTION_TYPES.success, transaction, t('APPROVE_SUCCESS'))));
    } catch (error) {
      setIsApproved(false);
      captureError(error);
      dispatch(setTransactionLoadingError(getErrorMessage(error)));
    }
  }

  const modalTitle = `${t('BID_FOR')} ${t(snakeCase(auction.auctionType).toUpperCase())}`;
  const bidTitle = auction.auctionType === 'systemDebt' ? t('PROVIDE_YOUR_BID') : t('PROVIDE_A_BID_FOR_THIS_AUCTION');

  return (
    <Modal
      open={modalOpen}
      title={modalTitle}
      width={460}
      onClose={handleHide}
    >
      <form noValidate onSubmit={form.submit}>
        {!isApproved && (
          <Tip
            style={{ marginBottom: '16px' }}
            action={<Button compact onClick={approveContract}>{t('APPROVE')}</Button>}
          >
            {t('APPROVE_BID_CONTRACT')}
          </Tip>
        )}

        <Input
          {...form.fields.bid}
          type="number"
          label={`${bidTitle} (${t('MINIMUM')}: ${auction.raisingBid} ${auction.bidAsset})`}
          placeholder={t('BID')}
          onChange={handleBidChange}
        />

        <Button
          type="submit"
          style={{ width: '100%', marginTop: '24px' }}
          disabled={!form.isValid || !isApproved}
        >
          {t('CONFIRM')}
        </Button>

      </form>
    </Modal>
  );
}

export const useBid = () => useContext(LocalStateContext);

export default BidModal;
