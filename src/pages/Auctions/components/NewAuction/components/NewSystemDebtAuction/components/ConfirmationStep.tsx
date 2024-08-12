import { useTranslation } from 'react-i18next';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { useSystemDebtAuctionForm } from '../NewSystemDebtAuction';

interface Props {
  reserveLot: string | number;
}
function ConfirmStep ({ reserveLot }: Props) {
  const { t } = useTranslation();
  const { qTicker } = useNetworkConfig();
  const { values, goBack, confirm, updateStep } = useSystemDebtAuctionForm();

  return (
    <FormStep onConfirm={confirm} onBack={goBack}>
      <FormBlock title={t('AUCTION_TYPE')}>
        <p className="text-lg"> {t('SYSTEM_DEBT_AUCTION')}</p>
      </FormBlock>

      <FormBlock title={t('AUCTION_LOT')}>
        <p className="text-lg">{reserveLot} {qTicker}</p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title={t('BID')}
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">{values.bid} {values.asset}</p>
      </FormBlock>

    </FormStep>
  );
}

export default ConfirmStep;
