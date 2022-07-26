import { useTranslation } from 'react-i18next';

import { RootNodeProposalForm } from 'typings/forms';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useNewRootProposal } from '../NewRootProposal';

function ConfirmationStep () {
  const { t } = useTranslation();
  const { values, confirm, goBack, updateStep } = useNewRootProposal();

  const proposalTypeMap: Record<RootNodeProposalForm['type'], string> = {
    'add-root-node': t('ADD_ROOT_NODE'),
    'remove-root-node': t('REMOVE_ROOT_NODE')
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
        title={t('DETAILS')}
        onAction={() => updateStep(1)}
      >
        {values.type === 'add-root-node' && (
          <div>
            <p className="text-md color-secondary">{t('HASH')}</p>
            <p className="text-lg">{values.hash}</p>
          </div>
        )}

        <div>
          <p className="text-md color-secondary">{t('EXTERNAL_SOURCE')}</p>
          <p className="text-lg">{values.externalLink}</p>
        </div>

        {values.address !== '' && (
          <div>
            <p className="text-md color-secondary">{t('ROOT_NODE_TO_REMOVE')}</p>
            <p className="text-lg">{values.address}</p>
          </div>
        )}
      </FormBlock>
    </FormStep>
  );
}

export default ConfirmationStep;
