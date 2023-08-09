import { useTranslation } from 'react-i18next';

import { formatPercent } from '@q-dev/utils';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  padding: 24px 24px 16px;

  .recent-transition-block__val {
    margin-top: 4px;
    display: flex;
    gap: 8px;
  }

  .recent-transition-block__val-percent {
    color: ${({ theme }) => theme.colors.errorMain};
  }

  .recent-transition-block__sub-val-status {
    margin-top: 16px;
    color: ${({ theme }) => theme.colors.warningPrimary};
  }
`;

function RecentTransitionBlock () {
  const { t } = useTranslation();

  return (
    <StyledWrapper className="block">
      <div>
        <h2 className="text-lg">{t('RECENT_TRANSITION_BLOCK')}</h2>
        <p className="recent-transition-block__val text-xl">
          <span className="font-semibold">
            {t('NUMBER_SIGNED', {
              currentCount: 0,
              fullCount: 0
            })}
          </span>
          <span className="recent-transition-block__val-percent">
            {formatPercent(0)}
          </span>
        </p>
        <p className="recent-transition-block__sub-val-status text-sm font-regular">
          {t('COLLECTING_APPROVALS')}
        </p>
      </div>
    </StyledWrapper>
  );
}

export default RecentTransitionBlock;
