import { Placement } from '@popperjs/core';
import Tooltip from 'ui/Tooltip';

import { AuctionPeriodsContainer } from 'pages/Auctions/styles';

import { formatDate, formatDateRelative } from 'func/formatters';

interface Props {
  endTime: string;
  placement?: Placement;
}

function AuctionPeriods ({ endTime, placement = 'top', ...rest }: Props) {
  const auctionEndTime = new Date(Number(endTime) * 1000).getTime();

  const auctionText = auctionEndTime > Date.now() ? 'Auction ends' : 'Auction ended';

  return (
    <AuctionPeriodsContainer {...rest}>
      <Tooltip
        placement={placement}
        trigger={<p className="text-md font-light">{`${auctionText} ${formatDateRelative(auctionEndTime)}`}</p>}
      >
        {formatDate(auctionEndTime)}
      </Tooltip>
    </AuctionPeriodsContainer>
  );
}

export default AuctionPeriods;
