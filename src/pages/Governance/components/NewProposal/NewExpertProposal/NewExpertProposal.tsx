import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { ExpertProposalForm } from 'typings/forms';

import MultiStepForm from 'components/MultiStepForm';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmationStep from './components/ConfirmationStep';
import ManageExpertStep from './components/ManageExpertStep';
import ParameterVoteStep from './components/ParameterVoteStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/actions';

import formTypes from 'constants/form-types';
import { RoutePaths } from 'constants/routes';

const DEFAULT_VALUES: ExpertProposalForm = {
  type: 'add-expert',
  panelType: 'fees-incentives',
  address: '',
  externalLink: '',
  params: []
};

const NewExpertProposalContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewExpertProposal () {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createProposal(values, t('CREATE_PROPOSAL_SUCCESS')));
    },
  });

  useMetamaskReset(formTypes.expertProposal, () => {
    history.push(RoutePaths.expertProposals);
  });

  const steps = [
    {
      id: 'type',
      name: t('PROPOSAL_TYPE'),
      title: t('TYPE_OF_EXPERT_PROPOSAL'),
      children: <TypeStep />
    },
    ...(form.values.type === 'parameter-vote'
      ? [{
        id: 'parameter-vote',
        name: t('PARAMETER_VOTE'),
        title: t('PARAMETER_VOTE'),
        children: <ParameterVoteStep />
      }]
      : [{
        id: 'manage-expert',
        name: form.values.type === 'add-expert'
          ? t('ADD_EXPERT')
          : t('REMOVE_EXPERT'),
        title: form.values.type === 'add-expert'
          ? t('ADD_EXPERT')
          : t('REMOVE_EXPERT'),
        children: <ManageExpertStep />
      }]
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
    <NewExpertProposalContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewExpertProposalContext.Provider>
  );
}

export const useNewExpertProposal = () => useContext(NewExpertProposalContext);

export default NewExpertProposal;
