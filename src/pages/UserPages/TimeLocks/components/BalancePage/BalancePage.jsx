import React, { useCallback, useEffect, useState } from 'react';

import CustomBlock from 'components/Base/CustomBlock';
import { TableWrap, BlockWrap, Button, TableTR } from '../../styles';
import { Pagination, setElementsForOnePage, countPages } from 'components/Base/Pagination';


function BalancePage({ title, locksArray }) {

    const [offset, setOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [data, setData] = useState([]);
    const [elements, setElements] = useState([]);
    const [perPage, setPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);
    const [paginationCheck, setPaginationCheck] = useState(false);

    useEffect(() => {
        setPaginationCheck(true);
        setCurrentPage(0);
        setOffset(0);
        setData(locksArray);
        setPageCount(countPages(locksArray, perPage));
        setElementsForCurrentPage(locksArray, 0, perPage);
    }, [locksArray]);

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
        <CustomBlock>
            <BlockWrap>
                <h5>{title}</h5>
                <h4>1234 Q</h4>
            </BlockWrap>
            <BlockWrap>
                <h5>Time lock balance</h5>
                <h4>1234 Q</h4>
            </BlockWrap>
            <h5>Time locks</h5>
            <div style={{ position: 'relative' }}>
                <table style={{ width: '75%' }}>
                    <thead>
                        <TableTR>
                            <th><h5>#</h5></th>
                            <th><h5>amount</h5></th>
                            <th><h5>start date</h5></th>
                            <th><h5>end date</h5></th>
                        </TableTR>
                    </thead>
                    <tbody>
                        {elements.map(item => (
                            <TableTR key={item.id + item.amount}>
                                <td><h4>{item.id}</h4></td>
                                <td><h4>{item.amount + ' Q'}</h4></td>
                                <td><h4>{item.startDate}</h4></td>
                                <td><h4>{item.endDate}</h4></td>
                            </TableTR>
                        ))}
                    </tbody>
                </table>

                {pageCount > 1 ?
                    <Pagination
                        pageCount={pageCount}
                        currentPage={currentPage}
                        handleClick={handlePageClick}
                    />
                    : null
                }
                <Button>
                    Purge expired time locks
                </Button>
            </div>
        </CustomBlock >
    )
}

export default BalancePage
