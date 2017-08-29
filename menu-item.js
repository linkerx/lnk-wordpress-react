var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var ItemImage = require('./item-image');

function MenuItem(props) {

  var site = props.path
  var item_link = '/';
  var item_text = props.item.title;
  var item_target = '_self';
  var click_action = null;
  if(props.action){
  click_action = props.action;
  }

  if(props.item.target != ""){
    item_target = props.item.target;
  }

  if(props.item.type == "custom"){
    item_link = props.item.url;
  } else if(props.item.type == "post_type") {
      if(props.item.object == "page") {
        item_link = site + 'pages/' + props.item.object_slug;
      } else if(props.item.object == "post") {
        item_link = site + 'posts/' + props.item.object_slug;
      }
  } else if(props.item.type == "taxonomy") {
    item_link = site + props.item.object_slug;
  }

  //console.log(props.item);

  return(
    <NavLink exact to={item_link} activeClassName="active" onClick={click_action}>
      {props.item.thumbnail_id &&
        <ItemImage src={props.item.thumbnail_url} title={item_text} alt={item_text} render='img' cls='image_container thumb' />
      }
      {props.item.thumbnail_hover_id &&
        <ItemImage src={props.item.thumbnail_hover_url} title={item_text} alt={item_text} render='img' cls='image_container thumb_hover' />
      }
      <span>{item_text}</span>
    </NavLink>
  )
}

module.exports = MenuItem;
