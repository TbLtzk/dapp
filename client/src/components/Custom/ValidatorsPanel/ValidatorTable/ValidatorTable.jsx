import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userAddressMetamask } from 'store/selectors/user-inf';

import TableView from 'components/Base/TableView';
import { Pagination, setElementsForOnePage, countPages } from 'components/Base/Pagination';

import { circles, tableHeader } from '../constants';

import { Circle, RootNodePanelWrap, MemberAddress } from './styles';
import { validatorMembers } from '../../../../store/selectors/validators';
import { drizzleReactHooks } from '@drizzle/react-plugin';

const { useDrizzle } = drizzleReactHooks;

function ValidatorTable() {
  const { drizzle } = useDrizzle();
  const validators = useSelector(validatorMembers);
  const userAddress = useSelector(userAddressMetamask);
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [data, setData] = useState([]);
  const [elements, setElements] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationCheck, setPaginationCheck] = useState(false);

  useEffect(() => {
    if (validators.length > 0 && !paginationCheck && JSON.stringify(data) !== JSON.stringify(validators)) {
      setPaginationCheck(true);
      setCurrentPage(0);
      setOffset(0);
      setData(validators);
      setPageCount(countPages(validators, perPage));
      setElementsForCurrentPage(validators, 0, perPage);
    }
  }, [validators]);

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

  return (
    <RootNodePanelWrap>
      {
        validators?.length === 0 ? <p>No validators data</p> :
          <>
            <TableView
              header={tableHeader}
              body={
                elements?.length === 0 ? null :
                  elements.map((member, i) => {
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
                            color={circles[i]}
                          >

                          </Circle>
                          <MemberAddress
                            color={userAddress === member.validator ? 'highlight' : 'default'}
                          >
                            {member.validator}
                          </MemberAddress>
                        </td>
                        <td>{drizzle.web3.utils.fromWei(member.amount, 'ether')}Q</td>
                      </tr>
                    );
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

    </RootNodePanelWrap>
  );
}

export default ValidatorTable;

