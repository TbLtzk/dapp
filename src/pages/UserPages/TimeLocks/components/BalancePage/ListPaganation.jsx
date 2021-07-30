import React, { useState, useEffect, useCallback } from 'react'
import { Pagination, setElementsForOnePage, countPages } from 'components/Base/Pagination';
import { TableTR } from '../../styles';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import TableView from 'components/Base/TableView';

function ListPaganation({ lockAmountData }) {

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
        setData(lockAmountData);
        setPageCount(countPages(lockAmountData, perPage));
        setElementsForCurrentPage(lockAmountData, 0, perPage);
    }, [lockAmountData]);

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

    
    const tableHeader = ['#', 'amount', 'start date', 'end date'];
    const showBodyTable = ({ id, amount, startDate, endDate }) => {
        return <tr key={id + amount}>
            <td>
                {id}
            </td>
            <td>
                {amount}
            </td>
            <td>
                {startDate}
            </td>
            <td>
                {endDate}
            </td>
        </tr>
    }

    return (
        <div>
            <TableView
                header={tableHeader}
                body={
                    elements.map(item => {
                        return showBodyTable(item)
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
        </div>
    )
}

export default ListPaganation


{/* <table style={{ width: '75%' }}>
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

                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                                popperConfig={{ value: item.startDate }}
                            >
                                <td><h4>{item.startDate}</h4></td>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                                popperConfig={{ value: item.endDate }}
                            >
                                <td><h4>{item.endDate}</h4></td>
                            </OverlayTrigger>

                        </TableTR>
                    ))}
                </tbody>
            </table>
*/}
