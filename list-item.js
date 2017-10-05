var React = require('react');
var ItemTitle = require('./item-title');
var ItemImage = require('./item-image');
var renderHTML = require('react-render-html');

import moment from 'moment';
moment.locale('es');

function ListItem(props) {

  var item_image = '';

  if(props.debug){
    console.log(props.item);
  }

  var imageRender = 'img';
  if(props.imageRender){
    imageRender = props.imageRender;
  }

  var imageSize = 'thumbnail';
  if(props.imageSize){
    imageSize = props.imageSize;
  }

  if(props.item.type != 'attachment'){
    if(props.item._embedded && props.item._embedded['wp:featuredmedia']){
      var item_image = props.item._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize].source_url;
    } else if(props.defaultImg) {
      var item_image = props.defaultImg;
    }
  } else {
    var item_image = props.item.media_details.sizes[imageSize].source_url;
  }

  var activeClass = 'inactive';
  if(props.active)
    activeClass = 'active';

  return(
    <article className={activeClass}>
      <ItemTitle title={props.item.title.rendered} linkTo={'/'+props.item.type+'/'+props.item.slug} />
      <ItemImage render={imageRender} src={item_image} />
      <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
      <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
    </article>
  )
}

module.exports = ListItem;
