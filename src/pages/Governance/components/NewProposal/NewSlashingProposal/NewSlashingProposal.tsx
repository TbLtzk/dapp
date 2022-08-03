import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const form = useMultiStepForm({
    initialValues: DEFAULT_VALUES,
    onConfirm: (values) => {
      dispatch(createProposal(values, t('CREATE_PROPOSAL_SUCCESS')));
    },
  });

  useMetamaskReset(formTypes.slashingProposal, () => {
    history.push(RoutePaths.slashingProposals);
  });

  const steps = [
    {
      id: 'type',
      name: t('PROPOSAL_TYPE'),
      title: t('TYPE_OF_SLASHING_PROPOSAL'),
      children: <TypeStep />
    },
    {
      id: 'details',
      name: t('SLASHING_DETAILS'),
      title: form.values.type === 'root-slashing'
        ? t('ROOT_NODE_SLASHING_DETAILS')
        : t('VALIDATOR_SLASHING_DETAILS'),
      children: <DetailsStep />
    },
    {
      id: 'confirm',
      name: t('CONFIRMATION'),
      title: t('CONFIRMATION'),
      tip: t('CONFIRMATION_TIP'),
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
