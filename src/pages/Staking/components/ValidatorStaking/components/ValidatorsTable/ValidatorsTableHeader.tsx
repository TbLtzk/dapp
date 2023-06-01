import { useTranslation } from 'react-i18next';

import { media } from '@q-dev/q-ui-kit';
import styled from 'styled-components';
import { ValidatorLegend } from 'typings/validator';

import ValidatorStatusBar from 'components/Base/ValidatorStatusBar';
import InfoTooltip from 'components/Tooltips/InfoTooltip';

const StyledWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  
  ${media.lessThan('tablet')} {
    flex-direction: column;
  }

  .validators-table-header__statuses {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

function ValidatorsTableHeader () {
  const { t } = useTranslation();

  const validatorsStatuses: ValidatorLegend[] = [
    {
      title: t('ACTIVE'),
      status: 'active'
    },
    {
      title: t('STANDBY'),
      status: 'standby'
    }
  ];

  return (
    <StyledWrapper>
      <h2 className="text-h2">
        <span>{t('VALIDATOR_RANKING')}</span>
        <InfoTooltip topic="validator-ranking" />
      </h2>
      <div className="validators-table-header__statuses">
        {validatorsStatuses.map((validator, index) =>
          <ValidatorStatusBar key={index} status={validator.status}>
            <p>{validator.title}</p>
          </ValidatorStatusBar>
        )}
      </div>
    </StyledWrapper>
  );
}

export default ValidatorsTableHeader;
