import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm } from '@q-dev/form-hooks';
import { Modal, Tip } from '@q-dev/q-ui-kit';
import { formatAsset, toBigNumber } from '@q-dev/utils';
import snakeCase from 'lodash/snakeCase';
import styled from 'styled-components';
import { AuctionBid, AuctionCompletedInfos, LiquidationAuctionBid } from 'typings/auctions';

import Button from 'components/Button';
import Input from 'components/Input';

import { useAuctions } from 'store/auctions/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

import { getStableCoinInstance } from 'contracts/contract-instance';
import { getAuctionInstance } from 'contracts/helpers/auction';

import { MAX_APPROVE_AMOUNT } from 'constants/boundaries';
import { max, min, required } from 'utils/validators';
import { fromWei } from 'utils/web3';

const StyledBidModal = styled.form`
  display: flex; 
  flex-direction: column;
  gap: 16px;

  .bid-modal__button {
    width: 100%
  }
`;

interface Props {
  auction: AuctionCompletedInfos;
  modalOpen: boolean;
  onSubmit: () => void;
  onHide: () => void;
}

function BidModal ({ modalOpen, auction, onHide, onSubmit }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { bidForAuction } = useAuctions();
  const [allowance, setAllowance] = useState('0');
  const [balance, setBalance] = useState('0');
  const modalTitle = useMemo(() => `${t('BID_FOR')} ${t(snakeCase(auction.auctionType).toUpperCase())}`, [t, auction.auctionType]);
  const user = useUser();

  const form = useForm({
    initialValues: { bid: '' },
    validators: { bid: [required, min(auction.raisingBid), max(balance)] },
    onSubmit: (values) => {
      submitTransaction({
        successMessage: t('BID_FOR_AUCTION_TX'),
        onSuccess: () => {
          handleCloseModal();
          onSubmit();
        },
        submitFn: () => bidForAuction({
          auctionType: auction.auctionType,
          form: {
            ...values,
            vaultOwner: (auction as LiquidationAuctionBid).vaultOwner,
            auctionId: (auction as AuctionBid).auctionId,
            vaultId: (auction as LiquidationAuctionBid).vaultId
          }
        })
      });
    },
  });

  const isApproved = useMemo(() => {
    return toBigNumber(form.values.bid || 0).isLessThanOrEqualTo(allowance);
  }, [form.values.bid, allowance]);

  const canBid = useMemo(() => {
    return toBigNumber(balance).isGreaterThanOrEqualTo(auction.raisingBid) &&
     toBigNumber(form.values.bid || 0).isLessThanOrEqualTo(balance);
  }, [balance, form.values.bid, auction.raisingBid]);

  const handleCloseModal = () => {
    form.reset();
    onHide();
  };

  async function loadAllowanceValue () {
    const stableCoin = await getStableCoinInstance();
    const { address } = await getAuctionInstance(auction.auctionType);
    const allowance = await stableCoin.allowance(user.address, address);
    setAllowance(fromWei(allowance));
  }

  async function loadUserBalance () {
    const stableCoin = await getStableCoinInstance();
    const balance = await stableCoin.balanceOf(user.address);
    setBalance(fromWei(balance));
  }

  useEffect(() => {
    loadAllowanceValue();
    loadUserBalance();
  }, []);

  async function approveContract () {
    const contract = await getStableCoinInstance();
    const { address } = await getAuctionInstance(auction.auctionType);

    await submitTransaction({
      successMessage: t('APPROVE_TX'),
      submitFn: () => contract.approve(address, MAX_APPROVE_AMOUNT, { from: user.address }),
      onSuccess: () => {
        loadUserBalance();
        loadAllowanceValue();
      }
    });
  }

  return (
    <Modal
      open={modalOpen}
      title={modalTitle}
      width={460}
      onClose={handleCloseModal}
    >
      <StyledBidModal noValidate onSubmit={form.submit}>
        {!isApproved && canBid && (
          <Tip
            action={
              <Button
                compact
                onClick={approveContract}
              >
                {t('APPROVE')}
              </Button>
            }
          >
            {t('APPROVE_BID_CONTRACT')}
          </Tip>
        )}
        <Input
          {...form.fields.bid}
          type="number"
          label={t('BID_AMOUNT')}
          labelTip={t('MINIMUM_BID_TIP', { amount: formatAsset(auction.raisingBid, auction.bidAsset) })}
          hint={t('YOUR_BALANCE', { balance: formatAsset(balance, auction.bidAsset) })}
          max={balance}
          min={auction.raisingBid}
          placeholder={t('BID')}
        />
        <Button
          type="submit"
          className="bid-modal__button"
          disabled={!form.isValid || !canBid || !isApproved}
        >
          {t('CONFIRM')}
        </Button>
      </StyledBidModal>
    </Modal>
  );
}

export default BidModal;
