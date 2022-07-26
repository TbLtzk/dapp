import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Classification } from '@q-dev/q-js-sdk';
import { QProposalForm } from 'typings/forms';

import MultiStepForm from 'components/MultiStepForm';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmationStep from './components/ConfirmationStep';
import ConstitutionStep from './components/ConstitutionStep';
import LinkStep from './components/LinkStep';
import ParamsStep from './components/ParamsStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/actions';

import formTypes from 'constants/form-types';
import { RoutePaths } from 'constants/routes';

const DEFAULT_VALUES: QProposalForm = {
  type: 'constitution',
  classification: Classification.BASIC,
  hash: '',
  externalLink: '',
  isParamsChanged: false,
  params: []
};

const NewQProposalContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewQProposal () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createProposal(values));
    },
  });

  useMetamaskReset(formTypes.qProposal, () => {
    history.push(RoutePaths.qProposals);
  });

  const isConstitutionType = form.values.type === 'constitution';
  const steps = [
    {
      id: 'type',
      name: t('PROPOSAL_TYPE'),
      title: t('TYPE_OF_Q_PROPOSAL'),
      children: <TypeStep />
    },
    ...(isConstitutionType
      ? [{
        id: 'constitution',
        name: t('BASIC_DETAILS'),
        title: t('BASIC_DETAILS'),
        children: <ConstitutionStep />
      }]
      : [{
        id: 'link',
        name: t('DETAILS'),
        title: t('DETAILS'),
        children: <LinkStep />
      }]
    ),
    ...(isConstitutionType
      ? [{
        id: 'params',
        name: t('PARAMETERS'),
        title: t('CHANGE_OF_CONSTITUTION_PARAMETERS'),
        children: <ParamsStep />
      }]
      : []
    ),
    {
      id: 'confirm',
      name: t('CONFIRMATION'),
      title: t('CONFIRMATION'),
      tip: t('CONFIRMATION_TIP'),
      children: <ConfirmationStep />
    }
  ];

  return (
    <NewQProposalContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewQProposalContext.Provider>
  );
}

export const useNewQProposalForm = () => useContext(NewQProposalContext);

export default NewQProposal;
