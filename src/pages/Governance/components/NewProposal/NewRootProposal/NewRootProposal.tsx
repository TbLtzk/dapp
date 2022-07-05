import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { RootNodeProposalForm } from 'typings/forms';

import MultiStepForm from 'components/MultiStepForm';

import useMetamaskReset from 'hooks/useMetamaskReset';
import useMultiStepForm from 'hooks/useMultiStepForm';

import AddNodeStep from './components/AddNodeStep';
import ConfirmationStep from './components/ConfirmationStep';
import RemoveNodeStep from './components/RemoveNodeStep';
import TypeStep from './components/TypeStep';

import { createProposal } from 'store/voting/proposals/actions';

import formTypes from 'constants/form-types';
import { RoutePaths } from 'constants/routes';

const DEFAULT_VALUES: RootNodeProposalForm = {
  type: 'add-root-node',
  externalLink: '',
  address: '',
  hash: '',
};

const NewRootProposalContext = createContext(
  {} as ReturnType<typeof useMultiStepForm<typeof DEFAULT_VALUES>>
);

function NewRootProposal () {
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createProposal(values));
    },
  });

  useMetamaskReset(formTypes.rootNodeProposal, () => {
    history.push(RoutePaths.rootNodePanel);
  });

  const steps = [
    {
      id: 'type',
      name: 'Proposal type',
      title: 'Type of Root Node Proposal',
      children: <TypeStep />
    },
    ...(form.values.type === 'add-root-node'
      ? [{
        id: 'add-root-node',
        name: 'Add Root Node',
        title: 'Add Root Node',
        children: <AddNodeStep />
      }]
      : [{
        id: 'remove-root-node',
        name: 'Remove Root Node',
        title: 'Remove Root Node',
        children: <RemoveNodeStep />
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
    <NewRootProposalContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewRootProposalContext.Provider>
  );
}

export const useNewRootProposal = () => useContext(NewRootProposalContext);

export default NewRootProposal;
