import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useForm, useMultiStepForm } from '@q-dev/form-hooks';
import { Modal, Tip } from '@q-dev/q-ui-kit';
import { toBigNumber } from '@q-dev/utils';
import snakeCase from 'lodash/snakeCase';
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

const DEFAULT_VALUES = {
  bid: '',
};

interface Props {
  auction: AuctionCompletedInfos;
  modalOpen: boolean;
  onSubmit: () => void;
  onHide: () => void;
}

const LocalStateContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function BidModal ({ modalOpen, auction, onHide, onSubmit }: Props) {
  const { t } = useTranslation();
  const { submitTransaction } = useTransaction();
  const { bidForAuction } = useAuctions();
  const user = useUser();

  const form = useForm({
    initialValues: DEFAULT_VALUES,
    validators: { bid: [required, min(auction.raisingBid), max('1000000000000000')] },
    onSubmit: (values) => {
      submitTransaction({
        successMessage: t('BID_FOR_AUCTION_TX'),
        onSuccess: () => {
          handleHide();
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

  const handleHide = () => {
    form.reset();
    onHide();
  };

  const [allowance, setAllowance] = useState<string | number>(0);
  const [isApproved, setIsApproved] = useState(true);

  useEffect(() => {
    async function getAllowanceValue () {
      const stableCoin = await getStableCoinInstance();
      const { address } = await getAuctionInstance(auction.auctionType);

      const allowance = await stableCoin.allowance(user.address, address);
      setAllowance(allowance);
    }

    getAllowanceValue();
  }, [isApproved]);

  const handleBidChange = async (value: string) => {
    form.fields.bid.onChange(value);
    setIsApproved(toBigNumber(value).comparedTo(allowance) !== 1);
  };

  async function approveContract () {
    const contract = await getStableCoinInstance();
    const { address } = await getAuctionInstance(auction.auctionType);

    await submitTransaction({
      successMessage: t('APPROVE_TX'),
      submitFn: () => contract.approve(address, MAX_APPROVE_AMOUNT, { from: user.address }),
      onSuccess: () => setIsApproved(true),
      onError: () => setIsApproved(false)
    });
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
