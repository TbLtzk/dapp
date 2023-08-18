import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import { ErrorHandler } from 'helpers';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { setFeatures } from './reducer';

import { useAppSelector } from 'store';

export function useServerConfig () {
  const dispatch = useDispatch();
  const { serverConfigUrl } = useNetworkConfig();

  const features = useAppSelector(({ serverConfig }) => serverConfig.features);

  async function loadFeatures () {
    try {
      const serverConfigInstance = axios.create({ baseURL: serverConfigUrl });
      const { data: features } = await serverConfigInstance.get('/features');
      dispatch(setFeatures(features));
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      dispatch(setFeatures({ savingAndBorrowing: false }));
    }
  }

  return {
    features,
    loadFeatures: useCallback(loadFeatures, []),
  };
}
