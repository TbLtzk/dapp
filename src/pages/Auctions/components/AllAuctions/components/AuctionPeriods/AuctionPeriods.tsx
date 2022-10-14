import { useTranslation } from 'react-i18next';

import { Placement } from '@popperjs/core';
import { Tooltip } from '@q-dev/q-ui-kit';

import { AuctionPeriodsContainer } from 'pages/Auctions/styles';

import { formatDate, formatDateRelative } from 'utils/date';

interface Props {
  endTime: string;
  placement?: Placement;
}

function AuctionPeriods ({ endTime, placement = 'top', ...rest }: Props) {
  const { t, i18n } = useTranslation();

  const auctionEndTime = new Date(Number(endTime) * 1000).getTime();
  const auctionText = auctionEndTime > Date.now() ? t('AUCTION_ENDS') : t('AUCTION_ENDED');

  return (
    <AuctionPeriodsContainer {...rest}>
      <Tooltip
        placement={placement}
        trigger={<p className="text-md">{`${auctionText} ${formatDateRelative(auctionEndTime, i18n.language)}`}</p>}
      >
        {formatDate(auctionEndTime, i18n.language)}
      </Tooltip>
    </AuctionPeriodsContainer>
  );
}

export default AuctionPeriods;
