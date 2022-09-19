import { useTranslation } from 'react-i18next';

import { ProgressBarWrapper } from 'components/Base/ProgressBar/styles';
import ExplorerAddress from 'components/Custom/ExplorerAddress';

import { StyledWrapper } from '../styles';
import { useValidator } from '../Validator';

function MainInfo () {
  const { t } = useTranslation();
  const { validator } = useValidator();
  const { rank, address, isActiveValidator } = validator;

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
        <ProgressBarWrapper value={isActiveValidator ? 1 : 99}>
          <p className="color-primary text-md">{isActiveValidator ? t('ACTIVE_VALIDATOR') : t('INACTIVE_VALIDATOR')}</p>
        </ProgressBarWrapper>
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
