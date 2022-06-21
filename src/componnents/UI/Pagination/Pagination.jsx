import React from 'react';
import { getPagesArray } from '../../../helpers/getTotalPages';

const Pagination = ({totalPage, currentPage, changePage}) => {
    let pagesArray = getPagesArray(totalPage);
    return (
        <div className="pagination_body">
            {pagesArray.map(p =>
                <span 
                    key={p} onClick={() => changePage(p)} 
                    className={p === currentPage ? 'pagination_main pagination_select' : 'pagination_main'}>
                        {p}
                </span>
            )}
        </div>
    );
};

export default Pagination;