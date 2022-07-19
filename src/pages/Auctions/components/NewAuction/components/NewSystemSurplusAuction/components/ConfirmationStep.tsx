import { useTranslation } from 'react-i18next';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useSystemSurplusAuctionForm } from '../NewSystemSurplusAuction';

interface Props {
  surplusLot: number | string;
}
function ConfirmStep ({ surplusLot }: Props) {
  const { t } = useTranslation();
  const { values, goBack, confirm, updateStep } = useSystemSurplusAuctionForm();

  return (
    <FormStep onConfirm={confirm} onBack={goBack}>

      <FormBlock title={t('AUCTION_TYPE')}>
        <p className="text-lg"> {t('SYSTEM_SURPLUS_AUCTION')}</p>
      </FormBlock>

      <FormBlock
        title={t('AUCTION_LOT')}
      >
        <p className="text-lg">
          {surplusLot} QUSD
        </p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title={t('BID')}
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          {values.bid} Q
        </p>
      </FormBlock>

    </FormStep>
  );
}

export default ConfirmStep;
