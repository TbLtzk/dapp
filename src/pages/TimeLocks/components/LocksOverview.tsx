import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { media } from 'styles/media';
import { TimeLockContractType } from 'typings/contracts';

import ExplorerAddress from 'components/Custom/ExplorerAddress';
import Button from 'ui/Button';
import Modal from 'ui/Modal';

import useAnimateNumber from 'hooks/useAnimateNumber';

import { useTimeLocksAddress } from '../TimeLocks';

import AddressForm from './AddressForm';
import LockActions from './LockActions';

const StyledWrapper = styled.div`
  display: grid;
  gap: 16px;

  .lock-values {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .lock-value {
    padding: 16px 24px;

    ${media.lessThan('medium')} {
      padding: 8px 0;
    }

    &:not(:first-child) {
      ${media.greaterThan('medium')} {
        border-left: 1px solid ${({ theme }) => theme.colors.borderSecondary};
      }
    }
  }

  .lock-address-wrp {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
  }

  .lock-address-btn {
    height: 24px;
    padding: 0 8px;
    border-radius: 8px;
  }
`;

interface Props {
  title: string;
  balance: string;
  contract: TimeLockContractType;
  timeLockBalance: string;
  isLoadingTimeLocks?: boolean;
  isDepositsLimitReached?: boolean;
  onSubmit: () => void;
}

function LocksOverview ({
  title,
  balance,
  contract,
  timeLockBalance,
  isLoadingTimeLocks,
  isDepositsLimitReached,
  onSubmit,
}: Props) {
  const { t } = useTranslation();
  const { address } = useTimeLocksAddress();
  const [addressModalOpen, setAddressModalOpen] = useState(false);

  const balanceRef = useAnimateNumber(balance);
  const timeLockBalanceRef = useAnimateNumber(timeLockBalance);

  return (
    <StyledWrapper className="block">
      <div className="block__header">
        <h2 className="text-h2">{t('OVERVIEW')}</h2>
        <LockActions
          contract={contract}
          isLoadingTimeLocks={isLoadingTimeLocks}
          isDepositsLimitReached={isDepositsLimitReached}
          balance={balance}
          timeLockBalance={timeLockBalance}
          onSubmit={onSubmit}
        />
      </div>

      <div className="lock-values">
        <div className="lock-value">
          <p className="text-md color-secondary">{t('TIME_LOCKS_ADDRESS')}</p>
          <div className="lock-address-wrp">
            <ExplorerAddress
              iconed
              short
              semibold
              className="text-xl"
              address={address}
            />
            <Button
              compact
              icon
              alwaysEnabled
              look="secondary"
              className="lock-address-btn"
              onClick={() => setAddressModalOpen(true)}
            >
              <i className="mdi mdi-pencil" />
              <span>{t('EDIT')}</span>
            </Button>
          </div>
        </div>

        <div className="lock-value">
          <p className="text-md color-secondary">{title}</p>
          <p ref={balanceRef} className="text-xl font-semibold">0 Q</p>
        </div>

        <div className="lock-value">
          <p className="text-md color-secondary">{t('TIME_LOCKED_BALANCE')}</p>
          <p ref={timeLockBalanceRef} className="text-xl font-semibold">0 Q</p>
        </div>

        <Modal
          title={t('UPDATE_ADDRESS')}
          open={addressModalOpen}
          onClose={() => setAddressModalOpen(false)}
        >
          <AddressForm onSubmit={() => setAddressModalOpen(false)} />
        </Modal>
      </div>
    </StyledWrapper>
  );
}

export default LocksOverview;
