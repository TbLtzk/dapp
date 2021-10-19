import React from 'react'
import { fromWei } from 'func/balance'
import { fN } from 'func/useful'
import ProgressBar from 'components/Base/ProgressBar'
import { convertToMonthDayYear } from 'func/convertDate'
import CopyAddress from '../components/Custom/MemberTables/CopyAddress/index'

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
    rank: rootNode.rank,
    address: <CopyAddress address={rootNode.address} />,
    amount: fN(rootNode.stakeAmount) + ' Q',
    share: rootNode.share + ' %'
  }))

export const tableValidatorsShort = (tableArray) =>
  tableArray.map((validator, idx) => ({
    id: idx,
    rank: validator.rank,
    validator: <CopyAddress address={validator.validator} />,
    amount: fN(fromWei(validator.amount)) + ' Q'
  }))

export const tableValidatorsWidened = (tableArray) =>
  tableArray.map((validator, idx) => ({
    id: idx,
    rank: validator.rank,
    validator: <CopyAddress address={validator.validator} />,
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
    member: <CopyAddress address={member} />
  }))

export const tableQFees = (tableArray) =>
  tableArray.map((member, idx) => ({
    id: idx,
    member: <CopyAddress address={member} />
  }))

export const tableDelegations = (tableArray) =>
  tableArray.map((member, idx) => ({
    id: idx,
    address: <CopyAddress address={member.validator} />,
    amount: fN(fromWei(member.actualStake)) + ' Q',
    reward: fN(fromWei(member.claimableReward)) + ' Q'
  }))
