import React from 'react';
import moment from 'moment';
import ItemTitle from './item-title';
import ItemImage from './item-image';
import renderHTML from 'react-render-html';

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

  if(props.item.type !== 'attachment'){
    console.log(props.item, imageSize);
    if(props.item._embedded && props.item._embedded['wp:featuredmedia']){
      if (typeof(props.item._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize]) !== 'undefined'){
        item_image = props.item._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize].source_url;
      } else {
        item_image = props.item._embedded['wp:featuredmedia'][0].source_url;
      }
    } else if(props.defaultImg) {
      item_image = props.defaultImg;
    }
  } else {
    item_image = props.item.media_details.sizes[imageSize].source_url;
  }

  var activeClass = 'inactive';
  if(props.active)
    activeClass = 'active';

  var heading = 2;
  if(props.heading){
    heading = props.heading;
  }

  return(
    <article className={activeClass}>
    {
      props.layout === 'title-first' ?
        <div className='wrapper'>
          <ItemTitle title={props.item.title.rendered} linkTo={'/'+props.item.type+'/'+props.item.slug} heading={heading} />
          <ItemImage render={imageRender} src={item_image} />
          <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
          <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
        </div>
      :
      <div className='wrapper'>
        <ItemImage render={imageRender} src={item_image} />
        <ItemTitle title={props.item.title.rendered} linkTo={'/'+props.item.type+'/'+props.item.slug} heading={heading} />
        <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
        <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
      </div>
    }
    </article>
  )
}

export default ListItem;
