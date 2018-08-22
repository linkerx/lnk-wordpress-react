var React = require('react');
import ReactPaginate from 'react-paginate';
require('./styles.less');

function Pagination(props) {

  console.log(props);

  return (
    <ReactPaginate
      previousLabel={"anterior"}
      nextLabel={"siguiente"}
      breakLabel={<a href="">...</a>}
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

module.exports = Pagination;
