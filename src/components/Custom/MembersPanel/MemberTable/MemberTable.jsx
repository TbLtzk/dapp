import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { userAddressMetamask } from 'store/selectors/user-inf'
import { rootNodeStake } from 'store/selectors/root-contract'

import TableView from 'components/Base/TableView'
import { Pagination, setElementsForOnePage, countPages } from 'components/Base/Pagination'

import { fN } from 'func/useful'
import { fromWei } from 'func/balance'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { OverlayTrigger, Popover } from 'react-bootstrap'
import { MemberAddress } from './styles'
import colors from 'constants/colors'
import ProgressBar from 'components/Base/ProgressBar'

function MemberTable (props) {
  const {
    arrayData,
    tableHeader,
    type
  } = props

  const userAddress = useSelector(userAddressMetamask)
  const amountNodeStake = useSelector(rootNodeStake)

  const [offset, setOffset] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [data, setData] = useState([])
  const [elements, setElements] = useState([])
  const [perPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [paginationCheck, setPaginationCheck] = useState(false)

  useEffect(() => {
    if (arrayData?.length > 0 && !paginationCheck && JSON.stringify(data) !== JSON.stringify(arrayData)) {
      setPaginationCheck(true)
      setCurrentPage(0)
      setOffset(0)
      setData(arrayData)
      setPageCount(countPages(arrayData, perPage))
      setElementsForCurrentPage(arrayData, 0, perPage)
    }
  }, [arrayData])

  const handlePageClick = (select) => {
    const selectedPage = select.selected
    const offset = selectedPage * perPage
    setCurrentPage(selectedPage)
    setOffset(offset)
    setElementsForCurrentPage(data, offset, perPage)
  }

  const setElementsForCurrentPage = useCallback((data, offset, perPage) => {
    setElements(setElementsForOnePage(data, offset, perPage))
  }, [data, offset, perPage])

  const showBodyTable = (i, number, address, amount, classType, children) => {
    return (
      <tr key={i} className={classType}>
        {!number ? null : <td>{number}</td>}
        <td className={classType}>
          <MemberAddress
            color={userAddress === address ? 'highlight' : 'default'}
          >
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Popover id="popover-basic">
                  <Popover.Content style={{
                    background: colors.neonGreen
                  }}>
                    Copy
                  </Popover.Content>
                </Popover>
              }
            >
              <CopyToClipboard text={address}>
                <span>{address}</span>
              </CopyToClipboard>
            </OverlayTrigger>
          </MemberAddress>
        </td>
        {!amount ? null : <td>{amount}</td>}
        {children}
      </tr>
    )
  }

  const showBodyTableValue = useCallback((member, i) => {
    const commonClass = 'validator-member'
    if (type === 'validators') {
      const numMember = member.rank
      const amount = fN(fromWei(member.amount)) + 'Q'
      return showBodyTable(i, numMember, member.validator, amount, commonClass, null)
    } else if (type === 'validators-widened') {
      const numMember = member.rank
      const amount = fN(fromWei(member.amount)) + 'Q'
      const children = <>
        <td>{fN(member.selfStake) + 'Q'}</td>
        <td>{fN(member.delegatedStake) + 'Q'}</td>
        <td>{fN(member.validatorShare) + '%'}</td>
        <td>{fN(member.delegatorShare) + '%'}</td>
        <td>{fN(member.delegationEfficiency) + '%'}</td>
        <td><ProgressBar value={fN(member.delegationSaturation)}/></td>
      </>
      return showBodyTable(i, numMember, member.validator, amount, 'validators-widened', children)
    } else if (type === 'root-node') {
      const numMember = member.rank
      const amount = fN(member.stakeAmount) + 'Q'
      const share = member.share + '%'
      const children = <td>{share}</td>
      return showBodyTable(i, numMember, member.address, amount, '', children)
    } else if (type === 'delegated-validators') {
      const children = <>
        <td>{fN(member.actualStake) + 'Q'}</td>
        <td>{fN(member.claimableReward) + 'Q'}</td>
      </>
      return showBodyTable(i, null, member.validator, null, 'delegated-validators', children)
    } else if (type === 'members') {
      return showBodyTable(i, null, member, null, 'members', null)
    }
  }, [elements, amountNodeStake])

  return (
    <>
      {
        arrayData?.length === 0
          ? <p>No data</p>
          : <>
            <TableView
              header={tableHeader}
              body={
                elements?.length === 0
                  ? null
                  : elements.map((member, i) => {
                    return showBodyTableValue(member, i)
                  })
              }
            />
            {pageCount > 1
              ? <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                handleClick={handlePageClick}
              />
              : null
            }
          </>
      }
    </>
  )
}

export default MemberTable
