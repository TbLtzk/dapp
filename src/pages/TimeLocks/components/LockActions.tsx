import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@q-dev/q-ui-kit';
import { useWeb3Context } from 'context/Web3ContextProvider';
import styled from 'styled-components';
import { TimeLockContractType } from 'typings/contracts';

import Button from 'components/Button';

import { useTimeLocksAddress } from '../TimeLocks';

import DepositForm from './DepositForm';
import WithdrawForm from './WithdrawForm';

const StyledWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

interface Props {
  contract: TimeLockContractType;
  isLoadingTimeLocks?: boolean;
  isDepositsLimitReached?: boolean;
  timeLockBalance: string;
  balance: string;
  onSubmit: () => void;
}

function LockActions ({
  contract,
  isLoadingTimeLocks,
  isDepositsLimitReached,
  onSubmit,
  timeLockBalance,
  balance,
}: Props) {
  const { t } = useTranslation();

  const { address: accountAddress } = useWeb3Context();
  const { address } = useTimeLocksAddress();

  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  return (
    <StyledWrapper className="lock-actions">
      <Button
        disabled={isLoadingTimeLocks}
        onClick={() => setDepositModalOpen(true)}
      >
        {t('DEPOSIT')}
      </Button>

      {contract === 'vesting' && (
        <Button
          disabled={accountAddress !== address}
          onClick={() => setWithdrawModalOpen(true)}
        >
          {t('WITHDRAW')}
        </Button>
      )}

      <Modal
        title={t('DEPOSIT')}
        open={depositModalOpen}
        width={480}
        onClose={() => setDepositModalOpen(false)}
      >
        <DepositForm
          isDepositsLimitReached={isDepositsLimitReached}
          contract={contract}
          onSubmit={() => {
            onSubmit();
            setDepositModalOpen(false);
          }}
        />
      </Modal>

      <Modal
        title={t('WITHDRAW')}
        open={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
      >
        <WithdrawForm
          balance={balance}
          timeLockBalance={timeLockBalance}
          onSubmit={() => {
            onSubmit();
            setWithdrawModalOpen(false);
          }}
        />
      </Modal>
    </StyledWrapper>
  );
}

export default LockActions;
