import React from 'react';
import Paginate from 'react-paginate';
import './styles.scss';

function Pagination(props) {

  //console.log(props);

  return (
    <Paginate
      previousLabel={"anterior"}
      nextLabel={"siguiente"}
      breakLabel={"..."}
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
