var React = require('react');
var Link = require('react-router-dom').Link;
var renderHTML = require('react-render-html');

function ItemTitle(props) {
  return (
      <h2><Link to={props.linkTo}>{renderHTML(props.title)}</Link></h2>
  )
}

module.exports = ItemTitle;
