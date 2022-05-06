import AuctionService, { ERROR_TYPES, getStatusTransformation } from './auction-service-helper';

import { getSystemSurplusAuctionInstance } from 'contracts/contract-instance';

import { CONTRACT_TYPES } from 'constants/contracts';
import { fromWei } from 'func/balance';
import { dateToTimestamp, getNowTimestamp } from 'func/convertDate';
import { groupArrayByBlockNumber } from 'func/useful';

export function creationSystemSurplusContractObj () {
  return new SystemSurplusAuction();
}

export default class SystemSurplusAuction extends AuctionService {
  constructor () {
    super();
    this.contractName = CONTRACT_TYPES.systemSurplusAuction;
  }

  prepareAuctionData (data, info, raisingBid) {
    const completedInfo = {};
    completedInfo.bidder = data.bidder;
    completedInfo.user = info?.bidder || info?.user;
    completedInfo.id = info.id;
    completedInfo.raisingBid = raisingBid ? fromWei(raisingBid) : 0;
    completedInfo.endTime = dateToTimestamp(data.endTime);
    completedInfo.isExecuted = data.isExecuted;
    completedInfo.highestBid = fromWei(data.highestBid);
    completedInfo.lot = fromWei(data.lot);
    completedInfo.title = 'System Surplus Auction';
    completedInfo.status = getStatusTransformation(data.status);
    completedInfo.statusNumber = data.status;
    completedInfo.blockNumber = info.blockNumber;
    const disabledButtons = Number(dateToTimestamp(data.endTime)) <= Number(getNowTimestamp());
    completedInfo.disableBidButton = disabledButtons;
    completedInfo.disableExecuteButton = !disabledButtons;

    completedInfo.contract = this.contractName;
    return completedInfo;
  }

  async getAuctionsEvents () {
    const contract = await this.getContractInstance(this.contractName);
    const pastEvents = await contract.instance.getPastEvents('AuctionStarted', { fromBlock: 0, toBlock: 'latest' });
    if (!pastEvents.length) {
      return [];
    } else {
      const auctionInfo = pastEvents.map((event) => ({
        id: event.returnValues._auctionId,
        bidder: event.returnValues._bidder,
        bid: event.returnValues._bid,
        blockNumber: event.blockNumber
      }));
      return auctionInfo;
    }
  }

  async getAuctions () {
    const auctionsInfo = await this.getAuctionsEvents();

    const allAuctionsData = await Promise.all(auctionsInfo.map((event) => this.getAuction(event)));
    const preparedAuctionsData = allAuctionsData.map((auction) =>
      this.prepareAuctionData(auction.data, auction.info, auction.raisingBid)
    );
    const groupedAuctionsByBlockNumber = groupArrayByBlockNumber(preparedAuctionsData);

    const activeAuctions = groupedAuctionsByBlockNumber.filter((auction) => auction.statusNumber === '1');
    const endedAuctions = groupedAuctionsByBlockNumber.filter((auction) => auction.statusNumber !== '1');

    return {
      contract: this.contractName,
      activeAuctions,
      endedAuctions
    };
  }

  async getOneAuction (id) {
    try {
      const contract = await this.getContractInstance();
      const info = await contract.getAuctionInfo(id);
      if (!Number(info.endTime)) {
        return { error: ERROR_TYPES.notExist };
      } else {
        const pastEvents = await this.getAuctionsEvents();
        const event = pastEvents.find((event) => event.id === id);
        let raisingBid = null;
        if (info.status === '1') {
          raisingBid = await contract.getRaisingBid(id);
        }
        return this.prepareAuctionData(info, event, raisingBid);
      }
    } catch (error) {
      return { error: ERROR_TYPES.wrongLink };
    }
  }

  async createAuction (data) {
    const contract = await getSystemSurplusAuctionInstance();
    return await contract.startAuction({ qAmount: data?.bid });
  }

  async bid (auctionId, bid, userAddress) {
    const contract = await getSystemSurplusAuctionInstance();
    const result = await contract.bid(auctionId, {
      from: userAddress,
      qAmount: bid
    });

    return result;
  }

  async execute (auctionId, userAddress) {
    const contract = await getSystemSurplusAuctionInstance();
    const result = await contract.execute(auctionId, { from: userAddress });
    return result;
  }
}
