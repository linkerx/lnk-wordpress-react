var React = require('react');
var Link = require('react-router-dom').Link;
var renderHTML = require('react-render-html');

function ItemTitle(props) {
  var heading = 1;
  if(props.heading)
    heading = props.heading

  var CustomTag = 'h'+heading;

  return (
      <CustomTag>
        {props.linkTo != "#"
          ?
          <Link to={props.linkTo}>{renderHTML(props.title)}</Link>
          :
          <span>{renderHTML(props.title)}</span>
        }
      </CustomTag>
  )
}

module.exports = ItemTitle;
