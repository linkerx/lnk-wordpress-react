var React = require('react');
var ItemTitle = require('./item-title');
var ItemImage = require('./item-image');
var renderHTML = require('react-render-html');
var WpUtils = require('wp/utils');

import moment from 'moment';
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

  if(props.item.type != 'attachment'){
    if(props.item._embedded && props.item._embedded['wp:featuredmedia'] && props.item._embedded['wp:featuredmedia'][0].media_details && props.item._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize]){
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

  var heading = 2;
  if(props.heading){
    heading = props.heading;
  }

  var itemLink = WpUtils.generateItemLinkUrl(props.item);

    switch(template) {
        case 1:
            return (
                <article className={activeClass}>
                  <ItemTitle title={props.item.title.rendered} item={props.item} linkTo={itemLink} heading={heading} />
                  <ItemImage render={imageRender} src={item_image} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                  <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
                  <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
                </article>
            )
        case 2:
            return (
                <article className={activeClass}>
                  <ItemImage render={imageRender} src={item_image} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                  <ItemTitle title={props.item.title.rendered} item={props.item} linkTo={itemLink} heading={heading} />
                  <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
                  <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
                </article>
            )
    }
}

module.exports = ListItem;
