import React, { useCallback, useMemo } from 'react'
import { PROPOSALS_TYPES } from 'constants/statuses'
import { getTypeName } from 'func/contractHelpers'
import { CONTRACTS_NAMES } from 'constants/contracts'
import { PollDetailContainer } from './styles'

const EMPTY_ADDR = '0x0000000000000000000000000000000000000000'

function PollDetail ({ pollDetail, proposalsKind, contract }) {
  const approvalContracts = contract === CONTRACTS_NAMES.addressVoting || contract === CONTRACTS_NAMES.upgradeVoting

  function getParametersInfo (parameters) {
    return parameters.map((item, index) => {
      return [
        {
          label: `Parameter type #${index + 1}`,
          value: getTypeName(item.parameterType)
        },
        {
          label: `Parameter key #${index + 1}`,
          value: item.parameterKey
        },
        {
          label: `Parameter value #${index + 1}`,
          value: item.parameterValue + ''
        }
      ]
    })
  }

  const showDataArr = useMemo(() => {
    switch (proposalsKind) {
      case PROPOSALS_TYPES.proposals:
        let oneLineInfos = []
        const defaultInfo = [
          {
            label: 'Current Constitution Hash',
            value: pollDetail?.currentConstitutionHash
          },
          {
            label: 'New Constitution Hash',
            value: pollDetail?.newConstitutionHash
          }
        ]
        if (pollDetail.parameters) {
          oneLineInfos = getParametersInfo(pollDetail.parameters)
        }
        return [...defaultInfo, ...oneLineInfos]
      case PROPOSALS_TYPES.rootNodePanel:
        const rootNodeArr = []
        if (pollDetail.candidate && pollDetail.candidate !== EMPTY_ADDR) {
          rootNodeArr.push({
            label: 'Proposal to Add Root Node',
            value: pollDetail.candidate
          })
        }
        if (pollDetail.replaceDest && pollDetail.replaceDest !== EMPTY_ADDR) {
          rootNodeArr.push({
            label: 'Proposal to Remove Root Node',
            value: pollDetail.replaceDest
          })
        }
        return rootNodeArr
      case PROPOSALS_TYPES.expertProposals:
        if (pollDetail.kindVoting === 'membership') {
          const membershipArr = []
          if (pollDetail.addressToAdd && pollDetail.addressToAdd !== EMPTY_ADDR) {
            membershipArr.push({
              label: 'Address to Add',
              value: pollDetail.addressToAdd
            })
          }
          if (pollDetail.addressToRemove && pollDetail.addressToRemove !== EMPTY_ADDR) {
            membershipArr.push({
              label: 'Address to Remove',
              value: pollDetail.addressToRemove
            })
          }
          return membershipArr
        } else {
          return getParametersInfo(pollDetail.parameters)
        }
      case PROPOSALS_TYPES.slashingProposals:
        return [
          {
            label: 'Candidate',
            value: pollDetail?.candidate
          },
          {
            label: 'Amount to Slash',
            value: pollDetail?.amountToSlash + ' Q'
          }
        ]
      case PROPOSALS_TYPES.contractUpdates:
        const checkContract = contract === CONTRACTS_NAMES.addressVoting
        return [
          {
            label: checkContract ? 'Key' : 'Implementation',
            value: checkContract ? pollDetail.key : pollDetail.implementation
          },
          {
            label: 'Proxy',
            value: pollDetail.proxy
          }
        ]
    }
  }, [pollDetail])

  const printValues = (label, value, key) => {
    const keyId = key + label.replace(/ /g, '-').toLowerCase() + +new Date()
    return !value || value === 'undefined'
      ? null
      : (
            <div key={keyId}>
                <h5>{label}</h5>
                <p title={value}>{value}</p>
            </div>
        )
  }

  const showContent = useCallback(() => {
    return showDataArr.map((el, i) => {
      if (!Array.isArray(el)) {
        return printValues(el.label, el.value, i)
      } else {
        return (
                    <div className="list-card__column-1-2-2" key={+new Date() + i}>
                        {el.map((item, index) => {
                          return printValues(item.label, item.value, i + '-' + index + +new Date())
                        })}
                    </div>
        )
      }
    })
  }, [showDataArr])

  const checkLinkAndPrint = () => {
    let hrefValue = ''
    if (pollDetail?.remark?.includes('http') || pollDetail?.remark?.includes('https')) {
      hrefValue = pollDetail.remark
    } else {
      hrefValue = '//' + pollDetail.remark
    }
    return (
            <a href={hrefValue} target="_blank" rel="noreferrer">
                {pollDetail.remark}
            </a>
    )
  }

  return (
        <PollDetailContainer>
            <h3>Proposal Details</h3>
            {showContent()}
            {approvalContracts
              ? null
              : (
                <>
                    <h5>External Reference</h5>
                    {checkLinkAndPrint()}
                </>
                )}
        </PollDetailContainer>
  )
}

export default PollDetail
