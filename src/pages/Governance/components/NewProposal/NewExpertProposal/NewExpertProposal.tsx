import { createContext, useContext } from 'react';
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
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createProposal(values));
    },
  });

  useMetamaskReset(formTypes.expertProposal, () => {
    history.push(RoutePaths.expertProposals);
  });

  const steps = [
    {
      id: 'type',
      name: 'Proposal type',
      title: 'Type of Expert Proposal',
      children: <TypeStep />
    },
    ...(form.values.type === 'parameter-vote'
      ? [{
        id: 'parameter-vote',
        name: 'Parameter Vote',
        title: 'Parameter Vote',
        children: <ParameterVoteStep />
      }]
      : [{
        id: 'manage-expert',
        name: form.values.type === 'add-expert'
          ? 'Add Expert'
          : 'Remove Expert',
        title: form.values.type === 'add-expert'
          ? 'Add Expert'
          : 'Remove Expert',
        children: <ManageExpertStep />
      }]
    ),
    {
      id: 'confirm',
      name: 'Confirmation',
      title: 'Confirmation',
      tip: 'Check the data and submit your proposal',
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
