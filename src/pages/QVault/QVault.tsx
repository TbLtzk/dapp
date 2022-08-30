import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { media } from 'styles/media';

import PageLayout from 'components/PageLayout';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

import BalanceOverview from './components/BalanceOverview';
import EarnBlock from './components/EarnBlock';
import SendForm from './components/SendForm';
import TransferForm from './components/TransferForm';
import WithdrawForm from './components/WithdrawForm';

const StyledWrapper = styled.div`
  display: grid;
  gap: 24px;

  ${media.lessThan('medium')} {
    gap: 16px;
  }

  .q-vault-main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;

    ${media.lessThan('medium')} {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
`;

function QVault () {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t('Q_VAULT')}
      titleExtra={<InfoTooltip placement="bottom" topic="q-vault" />}
    >
      <StyledWrapper>
        <BalanceOverview />
        <div className="q-vault-main">
          <TransferForm />
          <WithdrawForm />
          <SendForm />
          <EarnBlock />
        </div>
      </StyledWrapper>
    </PageLayout>
  );
}

export default QVault;
