import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import RefreshDelegationUpdate from '../RefreshDelegationUpdate';

import {
  accountableTotalStake,
  delegatedStakeSelector,
  ownStakeSelector,
  totalStakeSelector,
} from 'store/validators/selectors';

import { fN } from 'utils/useful';

function ValidatorPool () {
  const { t } = useTranslation();

  const totalStake = useSelector(totalStakeSelector);
  const ownStake = useSelector(ownStakeSelector);
  const delegatedStake = useSelector(delegatedStakeSelector);
  const accTotalStake = useSelector(accountableTotalStake);

  const validatorPoolInfo = [
    {
      id: 'total-stake',
      label: t('TOTAL_STAKE'),
      value: `${fN(totalStake)} Q`,
    },
    {
      id: 'own-stake',
      label: t('VALIDATOR_OWN_STAKE'),
      value: `${fN(ownStake)} Q`,
    },
    {
      id: 'delegated-stake',
      label: t('DELEGATED_STAKE'),
      value: `${fN(delegatedStake)} Q`,
    },
    {
      id: 'accountable-stake',
      label: t('ACCOUNTABLE_STAKE'),
      value: `${fN(accTotalStake)} Q`,
    },
  ];

  return (
    <div className="validator-pool_container">
      <h3 className="text-h3">{t('VALIDATOR_POOL')}</h3>
      <div className="validator-pool_cards">
        {validatorPoolInfo.map(({ id, label, value }) => (
          <div key={id} className="validator-pool_info">
            <p className="text-md">{label}</p>
            <h4 className="text-xl">{value}</h4>
          </div>
        ))}
      </div>

      <RefreshDelegationUpdate />
    </div>
  );
}

export default ValidatorPool;
