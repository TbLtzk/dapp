import { useTranslation } from 'react-i18next';

import CustomBlock from 'components/Base/CustomBlock';

import SendForm from './components/SendForm';
import TransferForm from './components/TransferForm';
import WithdrawForm from './components/WithdrawForm';

function ManageBalance () {
  const { t } = useTranslation();

  return (
    <CustomBlock style={{ gap: '15px' }}>
      <h1>{t('MANAGE_BALANCE')}</h1>
      <div style={{ display: 'grid', gap: '15px' }}>
        <TransferForm />
        <WithdrawForm />
        <SendForm />
      </div>
    </CustomBlock>
  );
}

export default ManageBalance;
