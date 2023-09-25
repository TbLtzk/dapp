
import { useTranslation } from 'react-i18next';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useLiquidationAuctionForm } from '../NewLiquidationAuction';

function ConfirmStep () {
  const { t } = useTranslation();
  const { values, goBack, confirm, updateStep } = useLiquidationAuctionForm();

  return (
    <FormStep
      onConfirm={confirm}
      onBack={goBack}
    >

      <FormBlock
        title={t('AUCTION_TYPE')}
      >
        <p className="text-lg">
          {t('LIQUDATION_AUCTION')}
        </p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title={t('ADDRESS_OF_VAULT_HOLDER_WHICH_SHALL_BE_LIQUIDATED')}
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          {values.vaultOwner}
        </p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title={t('THE_VAULT_ID_TO_BE_LIQUIDATED')}
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          # {values.vaultId}
        </p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title={t('BID')}
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          {values.bid} {values.asset}
        </p>
      </FormBlock>

    </FormStep>
  );
}

export default ConfirmStep;
