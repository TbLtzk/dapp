import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { drizzleReactHooks } from '@drizzle/react-plugin';

import TableView from 'components/Base/TableView';
import { Pagination, setElementsForOnePage, countPages } from 'components/Base/Pagination';

import { Circle, MemberPanelWrap, MemberAddress } from './styles';
import { rootNodeStake } from '../../../../store/selectors/root-contract';
import { fN } from '../../../../func/useful';

const { useDrizzle } = drizzleReactHooks;

function MemberTable(props) {
  const { arrayData, tableHeader, type } = props;

  const { drizzle } = useDrizzle();
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

  const showBodyTable = useCallback((member, i) => {
    if (type === 'validators') {
      return (
        <tr key={i}>
          <td>{
            (i + 1) === 10
              ? currentPage + 1 + '0'
              : currentPage === 0 ? i + 1 : currentPage + `${i + 1}`
          }</td>
          <td>
            <Circle
              className={'circleNum '}
              color={'#' + member.validator?.slice(2, 8)}
            >

            </Circle>
            <MemberAddress
              color={userAddress === member.validator ? 'highlight' : 'default'}
            >
              <span className="validator-member">{member.validator}</span>
            </MemberAddress>
          </td>
          <td>{fN(drizzle.web3.utils.fromWei(member.amount, 'ether'))}Q</td>
        </tr>
      );
    } else {
      return (
        <tr key={i}>
          <td>
            <Circle
              className={'circleNum '}
              color={'#' + member.address?.slice(2, 8)}
            >

            </Circle>
            <MemberAddress
              color={userAddress === member.address ? 'highlight' : 'default'}
            >
              <span className="root-member">{member.address}</span>
              {/*{member.address.slice(0, 14) + '...'}*/}
            </MemberAddress>
          </td>
          <td>{userAddress === member.address ? fN(amountNodeStake) : fN(member.stakeAmount)} Q</td>
          <td>{member.share + '%'}</td>
        </tr>
      );
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
                    return showBodyTable(member, i);
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

