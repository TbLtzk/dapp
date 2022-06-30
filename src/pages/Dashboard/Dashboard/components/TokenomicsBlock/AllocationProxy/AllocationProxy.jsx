import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'ui/Button';

import LoadingSpinner from 'components/Base/LoadingSpinner';

import useAnimateNumber from 'hooks/useAnimateNumber';
import useInterval from 'hooks/useInterval';

import {
  getDefaultAllocationProxy,
  getRootNodeRewardProxy,
  getValidationRewardProxy,
} from 'store/tokenomics/action-creators';
import {
  defaultAllocationProxyLoadingSelector,
  defaultAllocationProxySelector,
  rootNodeRewardProxyLoadingSelector,
  rootNodeRewardProxySelector,
  validationRewardProxyLoadingSelector,
  validationRewardProxySelector,
} from 'store/tokenomics/selectors';

function AllocationProxy () {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const defaultAllocationProxy = useSelector(defaultAllocationProxySelector);
  const defaultAllocationProxyLoading = useSelector(defaultAllocationProxyLoadingSelector);
  const defaultAllocationProxyRef = useAnimateNumber(defaultAllocationProxy);

  const validationRewardProxy = useSelector(validationRewardProxySelector);
  const loadingValidationRewardProxy = useSelector(validationRewardProxyLoadingSelector);
  const validationRewardProxyRef = useAnimateNumber(validationRewardProxy);

  const rootNodeRewardProxy = useSelector(rootNodeRewardProxySelector);
  const loadingRootNodeRewardProxy = useSelector(rootNodeRewardProxyLoadingSelector);
  const rootNodeRewardProxyRef = useAnimateNumber(rootNodeRewardProxy);

  useInterval(() => {
    if (!defaultAllocationProxyLoading) {
      dispatch(getDefaultAllocationProxy(false));
    }
  }, 5000);

  useEffect(() => {
    dispatch(getDefaultAllocationProxy(false));
    dispatch(getRootNodeRewardProxy(false));
    dispatch(getValidationRewardProxy(false));
  }, []);

  const handleAllocateDefault = () => {
    dispatch(getDefaultAllocationProxy(true));
  };

  const handleAllocateValidator = () => {
    dispatch(getValidationRewardProxy(true));
  };

  const handleAllocateRootNode = () => {
    dispatch(getRootNodeRewardProxy(true));
  };

  const allocationArray = [
    {
      id: 'default-allocation',
      title: t('DEFAULT_ALLOCATION_PROXY'),
      ref: defaultAllocationProxyRef,
      loading: defaultAllocationProxyLoading,
      func: handleAllocateDefault,
    },
    {
      id: 'validation-reward-allocation',
      title: t('VALIDATION_REWARD_PROXY'),
      ref: validationRewardProxyRef,
      loading: loadingValidationRewardProxy,
      func: handleAllocateValidator,
    },
    {
      id: 'root-node-allocation',
      title: t('ROOT_NODE_REWARD_PROXY'),
      ref: rootNodeRewardProxyRef,
      loading: loadingRootNodeRewardProxy,
      func: handleAllocateRootNode,
    },
  ];

  return (
    <>
      {allocationArray.map((item) => (
        <div key={item.id} className="card_block">
          <div>
            <h5>{item.title}</h5>
            <p ref={item.ref}>0 Q</p>
          </div>
          <div>
            <Button
              compact
              disabled={item.loading}
              style={{ width: '100%' }}
              onClick={item.func}
            >
              {item.loading ? <LoadingSpinner size="sm" type="light" /> : <i className="mdi mdi-cube-outline" />}
              <span>{t('ALLOCATE')}</span>
            </Button>
          </div>
        </div>
      ))}
      <div style={{ margin: '10px 0px 20px 0px' }} className="card__line" />
    </>
  );
}

export default AllocationProxy;
