import { useTranslation } from 'react-i18next';

import FormBlock from 'components/FormBlock';
import { FormStep } from 'components/MultiStepForm';

import { useNewRootProposal } from '../NewRootProposal';

function ExitRootNodeStep () {
  const { t } = useTranslation();
  const { confirm, goBack } = useNewRootProposal();

  return (
    <FormStep onConfirm={confirm} onBack={goBack}>
      <FormBlock title={t('ARE_YOU_SURE')}>
        <p className="text-lg">{t('YOU_GOING_TO_LEAVE_ROOT_NODE_PANEL')}</p>
      </FormBlock>
    </FormStep>
  );
}

export default ExitRootNodeStep;
