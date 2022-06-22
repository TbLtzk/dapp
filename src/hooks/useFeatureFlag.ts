import { useSelector } from 'react-redux';

import { networkSelector } from 'store/user-inf/selectors';

import { networkParameters } from 'constants/config';
import { isFeatureEnabled } from 'func/useful';

type FeatureFlag = keyof typeof networkParameters['devnet']['featureFlags']

function useFeatureFlag (feature: FeatureFlag) {
  const network = useSelector(networkSelector);
  return isFeatureEnabled(feature, network);
}

export default useFeatureFlag;
