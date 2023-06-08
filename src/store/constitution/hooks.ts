import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ParameterType } from '@q-dev/q-js-sdk/lib/contracts/BaseParametersInstance';
import { ErrorHandler } from 'helpers';
import { ParametersInstance } from 'typings/contracts';

import { setConstitutionError, setConstitutionParameters } from './reducer';

import { useAppSelector } from 'store';

import { getConstitutionInstance } from 'contracts/contract-instance';

async function getParameters (contract: ParametersInstance) {
  const PARAMETER_TYPES: ParameterType[] = ['Uint', 'String', 'Bool', 'Addr', 'Bytes32'];

  const rawParams = await Promise.all(PARAMETER_TYPES.map(async type => {
    const parameters = await contract.getParameters(type);
    return parameters.map(param => ({ ...param, type }));
  }));

  return rawParams.flat();
}

export function useConstitution () {
  const dispatch = useDispatch();

  const constitutionParams = useAppSelector(({ constitution }) => constitution.constitutionParams);
  const isLoadingConstitution = useAppSelector(({ constitution }) => constitution.isLoadingConstitution);
  const constitutionError = useAppSelector(({ constitution }) => constitution.constitutionError);

  const maxNStandbyValidators = useAppSelector(({ constitution }) => {
    const parameter = constitution.constitutionParams.find(i => i.key === 'constitution.maxNStandbyValidators');
    return Number(parameter?.value) || 0;
  });

  const maxNValidators = useAppSelector(({ constitution }) => {
    const parameter = constitution.constitutionParams.find(i => i.key === 'constitution.maxNValidators');
    return Number(parameter?.value) || 0;
  });

  async function getConstitutionParameters () {
    try {
      const contract = await getConstitutionInstance();
      const parameters = await getParameters(contract);
      dispatch(setConstitutionParameters(parameters));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      dispatch(setConstitutionError('There was an error while loading Constitution Parameters data'));
    }
  }

  return {
    constitutionParams,
    isLoadingConstitution,
    constitutionError,

    maxNStandbyValidators,
    maxNValidators,

    getConstitutionParameters: useCallback(getConstitutionParameters, []),
  };
}
