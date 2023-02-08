import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import StatusBar, { StatusType } from 'components/Base/StatusBar';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { StyledWrapper } from '../styles';
import { useValidator } from '../Validator';

import { useParameters } from 'store/parameters/hooks';

function MainInfo () {
  const { t } = useTranslation();
  const { validator } = useValidator();
  const { rank, address, isActiveValidator } = validator;

  const { constitutionParameters } = useParameters();

  const maxNValidators = useMemo(() => {
    const maxNValidatorsType = constitutionParameters?.find(i => i.key === 'constitution.maxNValidators');
    return Number(maxNValidatorsType?.value || 0);
  }, [constitutionParameters]);

  const validatorStatus = useMemo<{text: string; status: StatusType}>(() => {
    if (rank <= maxNValidators) {
      return isActiveValidator
        ? { text: t('ACTIVE_VALIDATOR'), status: 'success' }
        : { text: t('INACTIVE_VALIDATOR'), status: 'danger' };
    }

    return { text: t('BACKUP_VALIDATOR'), status: 'warning' };
  }, [isActiveValidator, rank, maxNValidators, t]);

  return (
    <StyledWrapper gridArea="main-info" className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('MAIN_INFO')}</h3>
      </div>

      <div className="row block__content">
        <p className="color-secondary text-md">{t('RANK')}</p>
        <p className="color-primary text-md"># {rank}</p>
      </div>

      <div className="row">
        <p className="color-secondary text-md">{t('STATUS')}</p>
        <StatusBar status={validatorStatus.status}>
          <p className="color-primary text-md">{validatorStatus.text}</p>
        </StatusBar>
      </div>

      <div className="row">
        <p className="color-secondary text-md">{t('ADDRESS')}</p>
        <div className="color-primary text-md">
          <ExplorerAddress
            short
            iconed
            address={address}
          />
        </div>
      </div>
    </StyledWrapper>
  );
}

export default MainInfo;
