/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Pagination from '../pagination/pagination';
import { Card } from 'reactstrap';
import { MdAdd } from 'react-icons/md';
import InputSearch from '../input/inputSearch';
import RenderTbody from './renderTboby';

interface DataTableProps {
    handleSearch: () => void,
    addNewPress: () => void,
    columns: any[],
    rows: any[],
    totalPages: number,
    currentPage: number,
    onChangePage: (n: number) => void,
    rightComponents: ChildNode | any
}

function DataTable({ handleSearch, addNewPress, columns,
    rows, totalPages, currentPage, onChangePage, rightComponents }: DataTableProps) {
    return (
        <div className="px-3">
            <div className='d-flex justify-content-end align-items-center'>
                <InputSearch
                    onChangeInput={handleSearch}
                />
                <button
                    className='new-button p-1 ml-3'
                    onClick={addNewPress}
                >
                    <MdAdd size={25} color='#FFF' />
                </button>
            </div>
            <Card className="m-2">
                <div className="table-responsive">
                    <table className="table table-sm table-striped table-hover">
                        <thead>
                            <tr>
                                {columns.map((column, cIndex) => (
                                    <th key={column.value || cIndex}>{column.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {RenderTbody(rows, columns, rightComponents)}
                        </tbody>
                    </table>
                    <Pagination
                        totalPages={totalPages}
                        onPageChange={(page: number) => onChangePage(page)}
                        currentPage={currentPage}
                    />
                </div>
            </Card>
        </div>
    )
}
export default DataTable;