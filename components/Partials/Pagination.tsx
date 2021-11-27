import { DOTS, usePagination } from "@Hooks/usePagination";

import { PAGE_PAGINATION } from "@Utils/enums";
import React from "react";
import classnames from "classnames";

const Pagination = ({
  currentPage,
  totalCount,
  pageSize,
  onChangePageSize,
  onPageChange,
  siblingCount = 5,
}: any) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <>
      <div className="paginator d-flex justify-content-end align-items-center">
        <div className="paginator__selector mr-3">
          Items per page:
          <select
            onChange={(e) => {
              onChangePageSize(e.target.value);
              onPageChange(1);
            }}
            defaultValue={25}
            className="border-0"
          >
            {PAGE_PAGINATION.map((size: any, index: any) => {
              return (
                <option key={index} value={size}>
                  {size}
                </option>
              );
            })}
          </select>
        </div>
        <div className="paginator__pager">
          <ul className="pagination pagination-sm">
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <span
                className="page-link"
                aria-label="Previous"
                onClick={() => onPrevious()}
              >
                <span aria-hidden="true">&laquo;</span>
              </span>
            </li>
            {paginationRange?.map((pageNumber) => {
              // If the pageItem is a DOT, render the DOTS unicode character
              if (pageNumber === DOTS) {
                return <li className="page-item dots">&#8230;</li>;
              }

              // Render our Page Pills
              return (
                <li
                  key={pageNumber}
                  className={classnames("page-item", {
                    active: pageNumber === currentPage,
                  })}
                  onClick={() => onPageChange(pageNumber)}
                >
                  <span className="page-link">{pageNumber}</span>
                </li>
              );
            })}

            <li
              className={classnames("page-item", {
                disabled: currentPage === lastPage,
              })}
            >
              <span
                className="page-link"
                aria-label="Next"
                onClick={() => onNext()}
              >
                <span aria-hidden="true">&raquo;</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Pagination;
