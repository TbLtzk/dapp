import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { TimeLockContractType } from 'typings/contracts';

import Button from 'ui/Button';
import Modal from 'ui/Modal';

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
}

function LockActions ({ contract, isLoadingTimeLocks, isDepositsLimitReached }: Props) {
  const { t } = useTranslation();

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
        <Button onClick={() => setWithdrawModalOpen(true)}>
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
          onSubmit={() => setDepositModalOpen(false)}
        />
      </Modal>

      <Modal
        title={t('WITHDRAW')}
        open={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
      >
        <WithdrawForm onSubmit={() => setWithdrawModalOpen(false)} />
      </Modal>
    </StyledWrapper>
  );
}

export default LockActions;
