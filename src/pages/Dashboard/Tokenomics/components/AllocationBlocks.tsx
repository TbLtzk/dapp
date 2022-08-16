import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import { media } from 'styles/media';

import useInterval from 'hooks/useInterval';

import AllocationBlock from './AllocationBlock';

import {
  getDefaultAllocationProxy,
  getRootNodeRewardProxy,
  getValidationRewardProxy
} from 'store/tokenomics/action-creators';
import {
  defaultAllocationProxyLoadingSelector,
  defaultAllocationProxySelector,
  rootNodeRewardProxyLoadingSelector,
  rootNodeRewardProxySelector,
  validationRewardProxyLoadingSelector,
  validationRewardProxySelector
} from 'store/tokenomics/selectors';

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 24px;

  ${media.lessThan('medium')} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

function AllocationBlocks () {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const defaultAllocationProxy = useSelector(defaultAllocationProxySelector);
  const defaultAllocationProxyLoading = useSelector(defaultAllocationProxyLoadingSelector);

  const validationRewardProxy = useSelector(validationRewardProxySelector);
  const validationRewardProxyLoading = useSelector(validationRewardProxyLoadingSelector);

  const rootNodeRewardProxy = useSelector(rootNodeRewardProxySelector);
  const rootNodeRewardProxyLoading = useSelector(rootNodeRewardProxyLoadingSelector);

  useEffect(() => {
    dispatch(getDefaultAllocationProxy(false));
    dispatch(getRootNodeRewardProxy(false));
    dispatch(getValidationRewardProxy(false));
  }, []);

  useInterval(() => dispatch(getDefaultAllocationProxy(false)), 5000, defaultAllocationProxyLoading);

  return (
    <StyledWrapper>
      <AllocationBlock
        value={defaultAllocationProxy}
        loading={defaultAllocationProxyLoading}
        title={t('DEFAULT_ALLOCATION_PROXY')}
        onAllocate={() => dispatch(getDefaultAllocationProxy(true, t('DEFAULT_ALLOCATION_PROXY_SUCCESS')))}
      />
      <AllocationBlock
        value={validationRewardProxy}
        loading={validationRewardProxyLoading}
        title={t('VALIDATION_REWARD_PROXY')}
        onAllocate={() => dispatch(getValidationRewardProxy(true, t('VALIDATON_REWARD_PROXY_SUCCESS')))}
      />
      <AllocationBlock
        value={rootNodeRewardProxy}
        loading={rootNodeRewardProxyLoading}
        title={t('ROOT_NODE_REWARD_PROXY')}
        onAllocate={() => dispatch(getRootNodeRewardProxy(true, t('ROOT_NODE_REWARD_PROXY_SUCCESS')))}
      />
    </StyledWrapper>
  );
}

export default AllocationBlocks;
