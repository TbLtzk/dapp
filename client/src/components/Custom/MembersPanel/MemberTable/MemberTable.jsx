import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { rootNodeStake } from 'store/selectors/root-contract';

import TableView from 'components/Base/TableView';
import { Pagination, setElementsForOnePage, countPages } from 'components/Base/Pagination';

import { fN, uintPerSecondToPerYearNumber } from 'func/useful';
import { fromWei } from 'func/balance';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Circle, MemberPanelWrap, MemberAddress, Sharing } from './styles';

function MemberTable(props) {
  const { arrayData, tableHeader, type } = props;

  const userAddress = useSelector(userAddressMetamask);
  const amountNodeStake = useSelector(rootNodeStake);

  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const [elements, setElements] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationCheck, setPaginationCheck] = useState(false);

  useEffect(() => {
    if (arrayData?.length > 0 && !paginationCheck && JSON.stringify(data) !== JSON.stringify(arrayData)) {
      setPaginationCheck(true);
      setCurrentPage(0);
      setOffset(0);
      setData(arrayData);
      setPageCount(countPages(arrayData, perPage));
      setElementsForCurrentPage(arrayData, 0, perPage);
    }
  }, [arrayData]);

  const handlePageClick = (select) => {
    const selectedPage = select.selected;
    const offset = selectedPage * perPage;
    setCurrentPage(selectedPage);
    setOffset(offset);
    setElementsForCurrentPage(data, offset, perPage);
  };

  const setElementsForCurrentPage = useCallback((data, offset, perPage) => {
    setElements(setElementsForOnePage(data, offset, perPage));
  }, [data, offset, perPage]);

  const showBodyTable = (i, number, address, amount, classType, children) => {
    return (
      <tr key={i} className={classType}>
        {!number ? null : <td>{number}</td>}
        <td>
          <Circle
            className={'circleNum '}
            color={'#' + address?.slice(2, 8)}
          >

          </Circle>
          <MemberAddress
            color={userAddress === address ? 'highlight' : 'default'}
          >
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id={'tooltip-top' + i}>
                  <span>Copy to clipboard</span>
                </Tooltip>
              }
            >
              <CopyToClipboard text={address}>
                <Sharing
                  type="button"
                  onClick={() => {
                  }}
                >
                  <span className={classType}>{address}</span>
                </Sharing>
              </CopyToClipboard>
            </OverlayTrigger>
          </MemberAddress>
        </td>
        {!amount ? null : <td>{amount}</td>}
        {children}
      </tr>
    );
  };

  const showBodyTableValue = useCallback((member, i) => {
    const commonClass = 'validator-member';
    if (type === 'validators') {
      const numMember = member.rank;
      const amount = fN(fromWei(member.amount)) + 'Q';
      return showBodyTable(i, numMember, member.validator, amount, commonClass, null);
    } else if (type === 'validators-widened') {
      const numMember = member.rank;
      const amount = fN(fromWei(member.amount)) + 'Q';
      const children = <>
        <td>{fN(member.selfStake) + 'Q'}</td>
        <td>{fN(member.delegatedStake) + 'Q'}</td>
        <td>{fN(member.validatorShare) + '%'}</td>
        <td>{fN(member.delegatorShare) + '%'}</td>
        <td>{fN(member.validatorPoolBalance) + 'Q'}</td>
        <td>{fN(member.poolPayoutRatio) + '%'}</td>
      </>;
      return showBodyTable(i, numMember, member.validator, amount, 'validators-widened', children);
    } else if (type === 'root-node') {
      const amount = fN(member.stakeAmount) + 'Q';
      const share = member.share + '%';
      const children = <td>{share}</td>;
      return showBodyTable(i, null, member.address, amount, 'root-member', children);
    } else if (type === 'delegated-validators') {
      const children = <>
        <td>{fN(member.idealStake) + 'Q'}</td>
        <td>{fN(member.claimableReward) + 'Q'}</td>
      </>;
      return showBodyTable(i, null, member.validator, null, 'delegated-validators', children);
    } else if (type === 'members') {
      return showBodyTable(i, null, member, null, 'members', null);
    }

  }, [elements, amountNodeStake]);

  return (
    <MemberPanelWrap type={type}>
      {
        arrayData?.length === 0 ? <p>No data</p> :
          <>
            <TableView
              header={tableHeader}
              body={
                elements?.length === 0 ? null :
                  elements.map((member, i) => {
                    return showBodyTableValue(member, i);
                  })
              }
            />
            {pageCount > 1 ?
              <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                handleClick={handlePageClick}
              />
              : null
            }
          </>
      }
    </MemberPanelWrap>
  );
}

export default MemberTable;

