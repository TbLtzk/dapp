import { useSelector } from 'react-redux';

import { networkSelector } from 'store/user-inf/selectors';

import { isFeatureEnabled } from 'func/useful';

function useFeatureFlag (feature) {
  const network = useSelector(networkSelector);
  return isFeatureEnabled(feature, network);
}

export default useFeatureFlag;
