import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import { RootNodeProposalForm } from 'typings/forms';

import MultiStepForm from 'components/MultiStepForm';

import useMultiStepForm from 'hooks/useMultiStepForm';

import AddNodeStep from './components/AddNodeStep';
import ConfirmationStep from './components/ConfirmationStep';
import ExitRootNodeStep from './components/ExitRootNodeStep';
import RemoveNodeStep from './components/RemoveNodeStep';
import TypeStep from './components/TypeStep';

import { useProposals } from 'store/proposals/hooks';
import { useTransaction } from 'store/transaction/hooks';
import { useUser } from 'store/user/hooks';

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
  const { submitTransaction } = useTransaction();
  const { createNewProposal } = useProposals();
  const history = useHistory();
  const user = useUser();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (form) => {
      submitTransaction({
        successMessage: form.type === 'exit-root-node'
          ? t('YOU_SUCCESSFULLY_LEFT_ROOT_NODE_PANEL')
          : t('CREATE_PROPOSAL_SUCCESS'),
        submitFn: () => createNewProposal(form.type === 'exit-root-node' ? ({ ...form, address: user.address }) : form),
        onSuccess: () => history.push(RoutePaths.rootNodePanel),
      });
    },
  });

  const addOrRemoveStep = form.values.type === 'add-root-node'
    ? {
      id: 'add-root-node',
      name: t('ADD_ROOT_NODE'),
      title: t('ADD_ROOT_NODE'),
      children: <AddNodeStep />
    }
    : {
      id: 'remove-root-node',
      name: t('REMOVE_ROOT_NODE'),
      title: t('REMOVE_ROOT_NODE'),
      children: <RemoveNodeStep />
    };

  const isExitFromPanel = form.values.type === 'exit-root-node'
    ? [{
      id: 'exit-root-node',
      name: t('VOLUNTARY_EXIT'),
      title: t('VOLUNTARY_EXIT'),
      children: <ExitRootNodeStep />
    }]
    : [addOrRemoveStep, {
      id: 'confirm',
      name: t('CONFIRMATION'),
      title: t('CONFIRMATION'),
      tip: t('CONFIRMATION_TIP'),
      children: <ConfirmationStep />
    }];

  const steps = [
    {
      id: 'type',
      name: t('PROPOSAL_TYPE'),
      title: t('TYPE_OF_ROOT_NODE_PROPOSAL'),
      children: <TypeStep />
    },
    ...isExitFromPanel
  ];

  return (
    <NewRootProposalContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewRootProposalContext.Provider>
  );
}

export const useNewRootProposal = () => useContext(NewRootProposalContext);

export default NewRootProposal;
