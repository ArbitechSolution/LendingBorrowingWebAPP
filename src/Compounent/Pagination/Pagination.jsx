import React from "react";
import ReactPaginate from "react-paginate";
import './Pagination.css'

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3} // Number of pages to display in the pagination bar
      marginPagesDisplayed={1} // Number of pages to display at the beginning and end
      onPageChange={onPageChange}
      activeClassName="active"
      nextLabel="Next >"
      previousLabel="< Previous"
      breakLabel="..."
      breakClassName="break-me"
      containerClassName="pagination justify-content-center"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      nextClassName="page-item"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      breakLinkClassName="page-link"
      disabledClassName="disabled"
    />
  );
};

export default Pagination;
