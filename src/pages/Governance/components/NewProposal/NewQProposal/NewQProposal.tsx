import { createContext, useContext } from 'react';
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
      name: 'Proposal type',
      title: 'Type of Q Proposal',
      children: <TypeStep />
    },
    ...(isConstitutionType
      ? [{
        id: 'constitution',
        name: 'Basic details',
        title: 'Basic details',
        children: <ConstitutionStep />
      }]
      : [{
        id: 'link',
        name: 'Details',
        title: 'Details',
        children: <LinkStep />
      }]
    ),
    ...(isConstitutionType
      ? [{
        id: 'params',
        name: 'Parameters',
        title: 'Change of constitution parameters',
        children: <ParamsStep />
      }]
      : []
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
    <NewQProposalContext.Provider value={form}>
      <MultiStepForm stepIndex={form.stepIndex} steps={steps} />
    </NewQProposalContext.Provider>
  );
}

export const useNewQProposalForm = () => useContext(NewQProposalContext);

export default NewQProposal;
