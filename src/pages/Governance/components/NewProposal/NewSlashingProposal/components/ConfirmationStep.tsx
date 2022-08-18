import { useTranslation } from 'react-i18next';

import { SlashingProposalForm } from 'typings/forms';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useNewSlashingProposal } from '../NewSlashingProposal';

import { formatAsset, formatPercent } from 'utils/numbers';

function ConfirmationStep () {
  const { t } = useTranslation();
  const { values, confirm, goBack, updateStep } = useNewSlashingProposal();

  const proposalTypeMap: Record<SlashingProposalForm['type'], string> = {
    'root-slashing': t('ROOT_NODE_SLASHING'),
    'validator-slashing': t('VALIDATOR_NODE_SLASHING')
  };

  return (
    <FormStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <FormBlock
        icon="edit"
        title={t('PROPOSAL_TYPE')}
        onAction={() => updateStep(0)}
      >
        <p className="text-lg">
          {proposalTypeMap[values.type]}
        </p>
      </FormBlock>

      <FormBlock
        icon="edit"
        title={t('SLASHING_DETAILS')}
        onAction={() => updateStep(1)}
      >
        <div>
          <p className="text-md color-secondary">{t('CANDIDATE_TO_SLASH')}</p>
          <p className="text-lg ellipsis">{values.address}</p>
        </div>

        <div>
          <p className="text-md color-secondary">{t('AMOUNT_TO_SLASH')}</p>
          <p className="text-lg">
            <span>{formatAsset(values.amount, 'Q')}</span>
            <span className="font-light" style={{ marginLeft: '4px' }}>
              ({formatPercent(values.percent)})
            </span>
          </p>
        </div>

        <div>
          <p className="text-md color-secondary">{t('EXTERNAL_SOURCE')}</p>
          <p className="text-lg ellipsis">{values.externalLink}</p>
        </div>
      </FormBlock>
    </FormStep>
  );
}

export default ConfirmationStep;
