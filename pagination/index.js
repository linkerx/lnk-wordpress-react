import React from 'react';
import Paginate from 'react-paginate';
import './styles.less';

function Pagination(props) {

  console.log(props);

  return (
    <Paginate
      previousLabel={"anterior"}
      nextLabel={"siguiente"}
      breakLabel={<a href="/">...</a>}
      breakClassName={"break-me"}
      pageCount={parseInt(props.totalPages)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      onPageChange={props.handleClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      forcePage={props.currentPage}
      />
  )
}

export default Pagination;
