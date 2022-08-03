import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createProposal(values, t('CREATE_PROPOSAL_SUCCESS')));
    },
  });

  useMetamaskReset(formTypes.rootNodeProposal, () => {
    history.push(RoutePaths.rootNodePanel);
  });

  const steps = [
    {
      id: 'type',
      name: t('PROPOSAL_TYPE'),
      title: t('TYPE_OF_ROOT_NODE_PROPOSAL'),
      children: <TypeStep />
    },
    ...(form.values.type === 'add-root-node'
      ? [{
        id: 'add-root-node',
        name: t('ADD_ROOT_NODE'),
        title: t('ADD_ROOT_NODE'),
        children: <AddNodeStep />
      }]
      : [{
        id: 'remove-root-node',
        name: t('REMOVE_ROOT_NODE'),
        title: t('REMOVE_ROOT_NODE'),
        children: <RemoveNodeStep />
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
    <NewRootProposalContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewRootProposalContext.Provider>
  );
}

export const useNewRootProposal = () => useContext(NewRootProposalContext);

export default NewRootProposal;
