import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';
import { media } from 'styles/media';

import useInterval from 'hooks/useInterval';

import AllocationBlock from './AllocationBlock';

import { useTokenomics } from 'store/tokenomics/hooks';
import { useTransaction } from 'store/transaction/hooks';

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
  const { submitTransaction } = useTransaction();

  const {
    defaultAllocationProxy,
    defaultAllocationProxyLoading,
    validationRewardProxy,
    validationRewardProxyLoading,
    rootNodeRewardProxy,
    rootNodeRewardProxyLoading,
    getDefaultAllocationProxy,
    getValidationRewardProxy,
    getRootNodeRewardProxy,
    allocateDefaultProxyRewards,
    allocateValidationProxyRewards,
    allocateRootNodeProxyRewards
  } = useTokenomics();

  useEffect(() => {
    getDefaultAllocationProxy();
    getRootNodeRewardProxy();
    getValidationRewardProxy();
  }, []);

  useInterval(() => getDefaultAllocationProxy(), 5000, defaultAllocationProxyLoading);

  return (
    <StyledWrapper>
      <AllocationBlock
        value={defaultAllocationProxy}
        loading={defaultAllocationProxyLoading}
        title={t('DEFAULT_ALLOCATION_PROXY')}
        onAllocate={() => submitTransaction({
          successMessage: t('DEFAULT_ALLOCATION_PROXY_SUCCESS'),
          hideLoading: true,
          submitFn: allocateDefaultProxyRewards
        })}
      />
      <AllocationBlock
        value={validationRewardProxy}
        loading={validationRewardProxyLoading}
        title={t('VALIDATION_REWARD_PROXY')}
        onAllocate={() => submitTransaction({
          successMessage: t('VALIDATON_REWARD_PROXY_SUCCESS'),
          hideLoading: true,
          submitFn: allocateValidationProxyRewards
        })}
      />
      <AllocationBlock
        value={rootNodeRewardProxy}
        loading={rootNodeRewardProxyLoading}
        title={t('ROOT_NODE_REWARD_PROXY')}
        onAllocate={() => submitTransaction({
          successMessage: t('ROOT_NODE_REWARD_PROXY_SUCCESS'),
          hideLoading: true,
          submitFn: allocateRootNodeProxyRewards
        })}
      />
    </StyledWrapper>
  );
}

export default AllocationBlocks;
