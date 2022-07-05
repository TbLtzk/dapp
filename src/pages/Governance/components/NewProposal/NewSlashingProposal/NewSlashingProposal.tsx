import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { SlashingProposalForm } from 'typings/forms';

import MultiStepForm from 'components/MultiStepForm';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import ConfirmationStep from './components/ConfirmationStep';
import DetailsStep from './components/DetailsStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/actions';

import formTypes from 'constants/form-types';
import { RoutePaths } from 'constants/routes';

const DEFAULT_VALUES: SlashingProposalForm = {
  type: 'root-slashing',
  externalLink: '',
  address: '',
  percent: '',
  amount: ''
};

const NewSlashingProposalContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewSlashingProposal () {
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createProposal(values));
    },
  });

  useMetamaskReset(formTypes.slashingProposal, () => {
    history.push(RoutePaths.slashingProposals);
  });

  const steps = [
    {
      id: 'type',
      name: 'Proposal type',
      title: 'Type of Slashing Proposal',
      children: <TypeStep />
    },
    {
      id: 'details',
      name: 'Slashing details',
      title: form.values.type === 'root-slashing'
        ? 'Root Node Slashing Details'
        : 'Validator Slashing Details',
      children: <DetailsStep />
    },
    {
      id: 'confirm',
      name: 'Confirmation',
      title: 'Confirmation',
      tip: 'Check the data and submit your proposal',
      children: <ConfirmationStep />
    }
  ];

  return (
    <NewSlashingProposalContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewSlashingProposalContext.Provider>
  );
}

export const useNewSlashingProposal = () => useContext(NewSlashingProposalContext);

export default NewSlashingProposal;
