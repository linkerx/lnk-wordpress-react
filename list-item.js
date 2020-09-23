import React from 'react';
import WpUtils from './utils';
import moment from 'moment';
import ItemTitle from './item-title';
import ItemImage from './item-image';
import renderHTML from 'react-render-html';

moment.locale('es');

function ListItem(props) {

  if(props.debug){
    console.log(props.item);
  }

  var template = 1;
  if(props.template){
    template = props.template;
  }

  var imageRender = 'img';
  if(props.imageRender){
    imageRender = props.imageRender;
  }

  var imageSize = 'thumbnail';
  if(props.imageSize){
    imageSize = props.imageSize;
  }

  var imageLink = false;
  if(props.imageLink){
    imageLink = true;
  }

  var item_image = '';

  if(props.item.type !== 'attachment'){
    if(
      typeof(props.item._embedded) !== 'undefined' &&
      typeof(props.item._embedded['wp:featuredmedia']) !== 'undefined' &&
      typeof(props.item._embedded['wp:featuredmedia'][0].media_details) !== 'undefined' &&
      typeof(props.item._embedded['wp:featuredmedia'][0].media_details.sizes) !== 'undefined' &&
      typeof(props.item._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize]) !== 'undefined'
    ){
        item_image = props.item._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize].source_url;
    } else if(props.defaultImg) {
      item_image = props.defaultImg;
    }
  } else {
    item_image = props.item.media_details.sizes[imageSize].source_url;
  }

  var showContent = false;
  if(typeof(props.showContent) !== 'undefined'){
    showContent = props.showContent;
  } 

  var activeClass = 'inactive';
  if(props.active)
    activeClass = 'active';

  var heading = 2;
  if(props.heading){
    heading = props.heading;
  }

  var itemLink = WpUtils.generateItemLinkUrl(props.item,props.site);

  switch(template) {
        case 1:
            return (
                <article className={activeClass}>
                  <ItemTitle title={props.item.title.rendered} item={props.item} linkTo={itemLink} heading={heading} />
                  <ItemImage render={imageRender} src={item_image} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                  <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
                  <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
                  <div className='content'>{showContent && renderHTML(props.item.content.rendered)}</div>
                </article>
            )
        case 2:
            return (
                <article className={activeClass}>
                  <ItemImage render={imageRender} src={item_image} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                  <ItemTitle title={props.item.title.rendered} item={props.item} linkTo={itemLink} heading={heading} />
                  <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
                  <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
                  <div className='content'>{showContent && renderHTML(props.item.content.rendered)}</div>
                </article>
            )
        case 3:
          return (
              <article className={activeClass}>
                <ItemImage render={imageRender} src={item_image} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                <div className='post_content'>
                  <ItemTitle title={props.item.title.rendered} item={props.item} linkTo={itemLink} heading={heading} />
                  <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
                  <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
                  <div className='content'>{showContent && renderHTML(props.item.content.rendered)}</div>
                </div>
              </article>
          )
          case 4:
            return (
                <article className={activeClass}>
                  <ItemImage render={imageRender} src={item_image} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                  <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
                  <ItemTitle title={props.item.title.rendered} item={props.item} linkTo={itemLink} heading={heading} />
                  <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
                  <div className='content'>{showContent && renderHTML(props.item.content.rendered)}</div>
                </article>
            )
        default:
    }
}

export default ListItem;
