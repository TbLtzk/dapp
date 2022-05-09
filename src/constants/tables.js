import React from 'react';

import ProgressBar from 'components/Base/ProgressBar';
import Tooltip from 'components/Base/Tooltip';
import ExplorerAddress from 'components/Custom/ExplorerAddress';
import BorrowManageAsset from 'pages/SavingAndBorrowing/components/BorrowManageAsset';
import SaveManageAsset from 'pages/SavingAndBorrowing/components/SaveManageAsset';

import { fromWei } from 'func/balance';
import { convertToMonthDayYear } from 'func/convertDate';
import { fN } from 'func/useful';

export const tableLockAmount = (tableArray) =>
  tableArray.map((lock) => ({
    id: lock.id,
    amount: fromWei(lock.amount) + ' Q',
    releaseStart: convertToMonthDayYear(lock.releaseStart),
    releaseEnd: convertToMonthDayYear(lock.releaseEnd)
  }));

export const tableRootNode = (tableArray) =>
  tableArray.map((rootNode, idx) => ({
    id: idx,
    address: <ExplorerAddress address={rootNode.address} />,
    amount: fN(rootNode.stakeAmount) + ' Q',
    share: rootNode.share + ' %'
  }));

export const tableRootNodeMonitoring = (tableArray) =>
  tableArray.map((rootNode, idx) => ({
    id: idx,
    address: <ExplorerAddress address={rootNode.address} />,
    amount: fN(rootNode.stakeAmount) + ' Q',
    offChain: 'n/a',
    onChain: 'n/a'
  }));

export const tableValidatorsShort = (tableArray) =>
  tableArray.map((validator, idx) => ({
    id: idx,
    rank: idx + 1,
    validator: <ExplorerAddress address={validator.validator} />,
    amount: fN(validator.amount) + ' Q'
  }));

export const tableValidatorsMonitoring = (tableArray) =>
  tableArray.map((validator, idx) => ({
    id: idx,
    rank: idx + 1,
    validator: <ExplorerAddress address={validator.validator} />,
    amount: fN(validator.amount) + ' Q',
    lastBlock: validator.lastBlock,
    timestamp: <Tooltip additionalInfo={validator.timestamp}>{validator.monthDayYear}</Tooltip>,
    average: validator.average
  }));

export const tableValidatorsWidened = (tableArray) =>
  tableArray.map((validator, idx) => ({
    id: idx,
    rank: validator.rank,
    validator: <ExplorerAddress address={validator.validator} />,
    amount: fN(fromWei(validator.amount)) + ' Q',
    selfStake: fN(validator.selfStake) + ' Q',
    delegatedStake: fN(validator.delegatedStake) + ' Q',
    validatorShare: fN(validator.validatorShare) + ' %',
    delegatorShare: fN(validator.delegatorShare) + ' %',
    delegationEfficiency: fN(validator.delegationEfficiency) + ' %',
    delegationSaturation: <ProgressBar value={fN(validator.delegationSaturation)} />
  }));

export const tableDefiRisks = (tableArray) =>
  tableArray.map((member, idx) => ({
    id: idx,
    member: <ExplorerAddress address={member} />
  }));

export const tableQFees = (tableArray) =>
  tableArray.map((member, idx) => ({
    id: idx,
    member: <ExplorerAddress address={member} />
  }));

export const tableEprs = (tableArray) =>
  tableArray.map((member, idx) => ({
    id: idx,
    member: <ExplorerAddress address={member} />
  }));

export const tableDelegations = (tableArray) =>
  tableArray.map((member, idx) => ({
    id: idx,
    address: <ExplorerAddress address={member.validator} />,
    amount: fN(fromWei(member.actualStake)) + ' Q',
    reward: fN(fromWei(member.claimableReward)) + ' Q'
  }));

export const savingCryptoAssets = (tableArray) =>
  tableArray.map((value, idx) => ({
    id: idx,
    depositAsset: value.depositAsset,
    interestAsset: value.interestAsset,
    rate: fN(value.rate) + ' %',
    button: (
      <SaveManageAsset
        depositAsset={value.depositAsset}
        interestAsset={value.interestAsset}
        rate={value.rate}
      />
    )
  }));

export const borrowCryptoAssets = (tableArray) =>
  tableArray.map((vault, idx) => ({
    id: idx,
    depositAsset: vault.colKey,
    asset: 'QUSD',
    interestAsset: fN(vault.borrowingFee) + '%',
    button: vault.isLiquidated ? 'Vault is Liquidated' : <BorrowManageAsset vault={vault} />
  }));
