import React from 'react'
import { fromWei } from 'func/balance'
import { fN } from 'func/useful'
import ProgressBar from 'components/Base/ProgressBar'
import { convertToMonthDayYear } from 'func/convertDate'
import CopyToClipboard from 'components/Base/CopyToClipboard'

export const tableLockAmount = (tableArray) =>
  tableArray.map((lock) => ({
    id: lock.id,
    amount: fromWei(lock.amount) + ' Q',
    releaseStart: convertToMonthDayYear(lock.releaseStart),
    releaseEnd: convertToMonthDayYear(lock.releaseEnd)
  }))

export const tableRootNode = (tableArray) =>
  tableArray.map((rootNode, idx) => ({
    id: idx,
    address: <CopyToClipboard valueToCopy={rootNode.address}>{rootNode.address}</CopyToClipboard>,
    amount: fN(rootNode.stakeAmount) + ' Q',
    share: rootNode.share + ' %'
  }))

export const tableRootNodeMonitoring = (tableArray) =>
  tableArray.map((rootNode, idx) => ({
    id: idx,
    address: <CopyToClipboard valueToCopy={rootNode.address}>{rootNode.address}</CopyToClipboard>,
    amount: fN(rootNode.stakeAmount) + ' Q',
    offChain: 'offChain',
    onChain: 'onChain'
  }))

export const tableValidatorsShort = (tableArray) =>
  tableArray.map((validator, idx) => ({
    id: idx,
    rank: idx + 1,
    validator: <CopyToClipboard valueToCopy={validator.validator}>{validator.validator}</CopyToClipboard>,
    amount: fN(validator.amount) + ' Q'
  }))

export const tableValidatorsMonitoring = (tableArray) =>
  tableArray.map((validator, idx) => ({
    id: idx,
    rank: idx + 1,
    validator: <CopyToClipboard valueToCopy={validator.validator}>{validator.validator}</CopyToClipboard>,
    amount: fN(validator.amount) + ' Q',
    lastBlock: 'lastBlock',
    timestamp: 'timestamp',
    average: 'average'
  }))

export const tableValidatorsWidened = (tableArray) =>
  tableArray.map((validator, idx) => ({
    id: idx,
    rank: validator.rank,
    validator: <CopyToClipboard valueToCopy={validator.validator}>{validator.validator}</CopyToClipboard>,
    amount: fN(fromWei(validator.amount)) + ' Q',
    selfStake: fN(validator.selfStake) + ' Q',
    delegatedStake: fN(validator.delegatedStake) + ' Q',
    validatorShare: fN(validator.validatorShare) + ' %',
    delegatorShare: fN(validator.delegatorShare) + ' %',
    delegationEfficiency: fN(validator.delegationEfficiency) + ' %',
    delegationSaturation: <ProgressBar value={fN(validator.delegationSaturation)} />
  }))

export const tableDefiRisks = (tableArray) =>
  tableArray.map((member, idx) => ({
    id: idx,
    member: <CopyToClipboard valueToCopy={member}>{member}</CopyToClipboard>
  }))

export const tableQFees = (tableArray) =>
  tableArray.map((member, idx) => ({
    id: idx,
    member: <CopyToClipboard valueToCopy={member}>{member}</CopyToClipboard>
  }))

export const tableDelegations = (tableArray) =>
  tableArray.map((member, idx) => ({
    id: idx,
    address: <CopyToClipboard valueToCopy={member.validator}>{member.validator}</CopyToClipboard>,
    amount: fN(fromWei(member.actualStake)) + ' Q',
    reward: fN(fromWei(member.claimableReward)) + ' Q'
  }))
