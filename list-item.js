import React from 'react';
import WpUtils from './utils';
import moment from 'moment';
import ItemTitle from './item-title';
import ItemImage from './item-image';
import ItemVideo from './item-video';
import ItemAudio from './item-audio';
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

  var videoAsFeaturedImage = false;
  if(typeof(props.videoAsFeaturedImage) !== 'undefined') {
    videoAsFeaturedImage = props.videoAsFeaturedImage;
  }

  var featuredImageType = 'img';
  var video_src = '';
  var image_src = '';
  if(videoAsFeaturedImage && typeof(props.item.video) !== 'undefined' && props.item.video !== '') {
    featuredImageType = 'vid';
    video_src = props.item.video;
  } else {
    if(props.item.type !== 'attachment'){
      if(
        typeof(props.item._embedded) !== 'undefined' &&
        typeof(props.item._embedded['wp:featuredmedia']) !== 'undefined' &&
        typeof(props.item._embedded['wp:featuredmedia'][0].media_details) !== 'undefined' &&
        typeof(props.item._embedded['wp:featuredmedia'][0].media_details.sizes) !== 'undefined' &&
        typeof(props.item._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize]) !== 'undefined'
      ){
          image_src = props.item._embedded['wp:featuredmedia'][0].media_details.sizes[imageSize].source_url;
      } else if(props.defaultImg) {
        image_src = props.defaultImg;
      }
    } else {
      image_src = props.item.media_details.sizes[imageSize].source_url;
    }
  }
  if(props.debug){
    console.log("DATA IMG : ", videoAsFeaturedImage, props.item.video);
    console.log("FEATURED TYPE: ",featuredImageType);
  }

  var showFeaturedAudio = false;
  if(typeof(props.showFeaturedAudio) !== 'undefined') {
    showFeaturedAudio = props.showFeaturedAudio;
  }
  var audio_src = "";
  var audio_texto1 = "";
  var audio_texto2 = "";
  var audio_separador = false;

  if(showFeaturedAudio && typeof(props.item.audio) !== 'undefined' && props.item.audio !== '') {
    audio_src = props.item.audio;

    var tieneTexto = false;
    if(typeof(props.item.audio_texto1) !== 'undefined' && props.item.audio_texto1 !== '') {
      audio_texto1 = props.item.audio_texto1;
      tieneTexto = true;
    }
    if(typeof(props.item.audio_texto2) !== 'undefined' && props.item.audio_texto2 !== '') {
      audio_texto2 = props.item.audio_texto2;
      if(tieneTexto){
        audio_separador = true;
      } 
    }

  } else {
    showFeaturedAudio = false;
  }



  //console.log("SHOW AUDIO: ",props.showFeaturedAudio, showFeaturedAudio );
  //console.log("AUDIO: ",props.item.audio );

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
  //console.log('LIST ITEM LINK: ',props.site);

  switch(template) {
        case 1:
            return (
                <article className={activeClass}>
                  <ItemTitle title={props.item.title.rendered} item={props.item} linkTo={itemLink} heading={heading} />
                  
                  <div className='featured'>
                  { featuredImageType == 'img' ?
                    <ItemImage render={imageRender} src={image_src} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                    :
                    <ItemVideo src={video_src} />
                  }
                  </div>
                  
                  { showFeaturedAudio &&
                    <ItemAudio src={audio_src} texto1={audio_texto1} texto2={audio_texto2} separador={audio_separador} />
                  }

                  <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
                  <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
                  <div className='content'>{showContent && renderHTML(props.item.content.rendered)}</div>
                </article>
            )
        case 2:
            return (
                <article className={activeClass}>

                  <div className='featured'>
                  { featuredImageType == 'img' ?
                    <ItemImage render={imageRender} src={image_src} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                    :
                    <ItemVideo src={video_src} />
                  }
                  </div>

                  { showFeaturedAudio &&
                    <ItemAudio src={audio_src} texto1={audio_texto1} texto2={audio_texto2} separador={audio_separador} />
                  }

                  <ItemTitle title={props.item.title.rendered} item={props.item} linkTo={itemLink} heading={heading} />
                  <div className='date'>{moment(props.item.date).format('DD/MM/YYYY')}</div>
                  <div className='excerpt'>{renderHTML(props.item.excerpt.rendered)}</div>
                  <div className='content'>{showContent && renderHTML(props.item.content.rendered)}</div>
                </article>
            )
        case 3:
          return (
              <article className={activeClass}>

                <div className='featured'>
                { featuredImageType == 'img' ?
                  <ItemImage render={imageRender} src={image_src} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                  :
                  <ItemVideo src={video_src} />
                }
                </div>

                { showFeaturedAudio &&
                    <ItemAudio src={audio_src} texto1={audio_texto1} texto2={audio_texto2} separador={audio_separador} />
                  }

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

                  <div className='featured'>
                  { featuredImageType == 'img' ?
                    <ItemImage render={imageRender} src={image_src} item={props.item} linkTo={itemLink} imageLink={imageLink} />
                    :
                    <ItemVideo src={video_src} />
                  }
                  </div>

                  { showFeaturedAudio &&
                    <ItemAudio src={audio_src} texto1={audio_texto1} texto2={audio_texto2} separador={audio_separador} />
                  }
                  
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
