import { useTranslation } from 'react-i18next';

import { Validator } from 'typings/validator';

import ProgressBar from 'components/Base/ProgressBar';
import DelegateModal from 'pages/Staking/components/DelegationStaking/components/DelegateModal';

import { StyledWrapper } from '../styles';

import { useUser } from 'store/user/hooks';

import { formatAsset, formatPercent } from 'utils/numbers';

function DelegationInfo ({ validator }: { validator: Validator }) {
  const { t } = useTranslation();
  const user = useUser();
  const { delegationSaturation, delegationEfficiency, payoutPerDelegatedQ, address } = validator;

  return (
    <StyledWrapper gridArea="delegation-info" className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('DELEGATION_INFO')}</h3>
        {user.address !== address && (
          <DelegateModal
            btnTitle={t('DELEGATE')}
            type="validator-select"
            delegation={validator}
          />
        )}
      </div>

      <div className="row block__content">
        <p className="color-secondary text-md">{t('PAYOUT_DELEGATED_Q')}</p>
        <p className="color-primary text-md">{formatAsset(payoutPerDelegatedQ, 'Q')}</p>
      </div>

      <div className="row">
        <p className="color-secondary text-md">{t('DELEGATION_EFFICIENCY')}</p>
        <p className="color-primary text-md">{formatPercent(delegationEfficiency)}</p>
      </div>

      <div className="row">
        <p className="color-secondary text-md">{t('DELEGATION_SATURATION')}</p>
        <p className="color-primary text-md">
          <ProgressBar value={delegationSaturation} />
        </p>
      </div>
    </StyledWrapper>
  );
}

export default DelegationInfo;
