import { useTranslation } from 'react-i18next';

import ValidatorStatusBar from 'components/Base/ValidatorStatusBar';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import ValidatorLink from 'components/Custom/ValidatorLink';

import { useValidatorStatus } from 'hooks/useValidatorStatus';

import { StyledWrapper } from '../styles';
import { useValidator } from '../Validator';

function MainInfo () {
  const { t } = useTranslation();
  const { validator } = useValidator();
  const { rank, address } = validator;
  const validatorStatus = useValidatorStatus(address);

  return (
    <StyledWrapper gridArea="main-info" className="block">
      <div className="block__header">
        <h3 className="text-h3">{t('MAIN_INFO')}</h3>
      </div>

      <div className="row block__content">
        <p className="color-secondary text-md">{t('RANK')}</p>
        <p className="color-primary text-md">{rank ? `# ${rank}` : '–'}</p>
      </div>

      {validatorStatus && <div className="row">
        <p className="color-secondary text-md">{t('STATUS')}</p>
        <ValidatorStatusBar status={validatorStatus.status}>
          <p className="color-primary text-md">{validatorStatus.title}</p>
        </ValidatorStatusBar>
      </div>}

      <div className="row">
        <p className="color-secondary text-md">{t('ADDRESS')}</p>
        <div className="color-primary text-md">
          <ExplorerAddress
            short
            iconed
            address={address}
          />
          <ValidatorLink address={address} />
        </div>
      </div>
    </StyledWrapper>
  );
}

export default MainInfo;
