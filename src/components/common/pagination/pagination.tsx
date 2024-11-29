import classnames from 'classnames';
import { DOTS, usePagination } from './usePagination';
import './pagination.css';

const Pagination = ({
    totalPages,
    onPageChange,
    currentPage
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalPages,
    });

    const onNext = () => onPageChange(currentPage + 1);
    const onPrevious = () => onPageChange(currentPage - 1);

    const lastPage = totalPages;

    return (
        <ul className='pagination-container'>
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1,
                })}
                onClick={onPrevious}
            >
                <div className="arrow left" />
            </li>
            {
                paginationRange.map((pageNumber, p) => {
                    if (pageNumber === DOTS) {
                        return (
                            <li className="pagination-item dots" key={pageNumber + p}>
                                &#8230;
                            </li>
                        );
                    }

                    return (
                        <li
                            key={pageNumber === DOTS ? pageNumber + p : pageNumber}
                            className={classnames('pagination-item', {
                                selected: pageNumber === currentPage,
                            })}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </li>
                    );
                })
            }
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage,
                })}
                onClick={onNext}
            >
                <div className="arrow right" />
            </li>
        </ul>
    )
}

export default Pagination;