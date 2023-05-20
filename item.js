import React from 'react';
import WpApi from './api';
import WpItemTitle from './item-title';
import WpItemImage from './item-image';
import WpItemAudio from './item-audio';
import renderHTML from 'react-render-html';
import serialize from 'form-serialize';
import FullModal from './fullscreenImage/fullmodal';
import ShareButtons from './shareButtons';
import WpUtils from './utils';
import moment from 'moment';

moment.locale('es');

class WpItem extends React.Component {

  constructor(props) {
    super();
    this.state = {
      item: null,
      formBinded: false,
    }
    this.updateItem = this.updateItem.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount(){
    this.updateItem();
  }

  componentDidUpdate(){
    var form = document.getElementsByClassName('wpcf7-form')[0];
    //console.log('FORM ',form);

    if(form && !this.state.formBinded){

      /**
       * FORM SUBMISSION
       */
      var idInput = document.querySelector('.wpcf7-form input[name=_wpcf7]').value;
      var theSubmit = document.querySelector('.wpcf7-form input[type=submit]');
      theSubmit.removeEventListener('click', function(e) {this.formSubmit(idInput,form,e)}.bind(this),false);
      theSubmit.addEventListener('click', function(e) {
        this.formSubmit(idInput,form,e);
      }.bind(this),false);
      //console.log('BINDED ',theSubmit);
      this.setState({
        formBinded: true
      });
   }

   var images = document.querySelectorAll('.post_content img');
   if(this.props.debug) {
       console.log(images);
   }
   for(var x=0;x<images.length;x++){
      images[x].addEventListener('click',function(){
        FullModal.openFull('full-modal',this.src,this.alt);
      });
   }
  }

  formSubmit(idInput, form, e) {
      e.stopPropagation();
      e.preventDefault();
      var data = serialize(form);
      WpApi.postContactForm(idInput,data,{debug:true, site: this.props.site})
      .then(function(response){
        alert("Su mensaje fue enviado con éxito.");
        form.reset();
      });
      return false;
  }

  updateItem(){
    this.setState(function(){
      return {
        item: null
      }
    });

    var opts = {
      url: this.props.url,
      site: this.props.site,
      type: this.props.type,
      slug: this.props.slug,
      queries: ['_embed'],
      debug: this.props.debug
    }

    if(this.props.debug)
      console.log(opts);

    WpApi.getItem(opts)
      .then(function(item){
        this.setState(function(){

          if(this.props.debug){
            console.log(item);
          }
          if(item[0]){

            var content = item[0].content.rendered;
            var htmlObject = document.createElement('div');
            htmlObject.innerHTML = content;

            /* FORMS */
            var form = htmlObject.getElementsByClassName('wpcf7-form')[0];
            if(form){
              form.action = '';
              var inputs = htmlObject.querySelectorAll('.wpcf7-form .wpcf7-form-control');
              for(var x=0;x<inputs.length;x++){
                if(inputs[x].type !== 'submit'){
                  inputs[x].removeAttribute('value');
                }
              }
              htmlObject.getElementsByClassName('wpcf7-form')[0].innerHTML = form.innerHTML;
            }

            item[0].content.parsed = htmlObject.outerHTML;

            /* FULLSCREEN IMAGES */
            if(this.props.ready){
              setTimeout(function(){this.props.ready()}.bind(this), 1000);
            }

            return {
              item: item[0]
            }
          }
        });
      }.bind(this));
  }

  render() {

    var ImgSize = 'thumbnail';
    if(this.props.img_size) {
        ImgSize = this.props.img_size;
    }

    //console.log("TEMPLATE: ",this.props.template)

    var template = 1;
    if(typeof(this.props.template) !== 'undefined'){
      template = this.props.template;
    }

    var itemLink = '';
    var share = false;
    if(this.state.item){
      /* image */
      if(
        typeof(this.state.item._embedded) !== 'undefined' &&
        typeof(this.state.item._embedded['wp:featuredmedia']) !== 'undefined' &&
        typeof(this.state.item._embedded['wp:featuredmedia'][0].media_details) !== 'undefined' &&
        typeof(this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes) !== 'undefined' &&
        typeof(this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes[ImgSize]) !== 'undefined'       ){
        var item_image = this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes[ImgSize].source_url;
        var item_image_alt = this.state.item._embedded['wp:featuredmedia'][0].alt_text;
      }

      /* audio */
      var audio_src = "";
      var audio_texto1 = "";
      var audio_texto2 = "";
      var audio_separador = false;

      if(typeof(this.state.item.audio) !== 'undefined' && this.state.item.audio !== '') {
        audio_src = this.state.item.audio;

        var tieneTexto = false;
        if(typeof(this.state.item.audio_texto1) !== 'undefined' && this.state.item.audio_texto1 !== '') {
          audio_texto1 = this.state.item.audio_texto1;
          tieneTexto = true;
        }
        if(typeof(this.state.item.audio_texto2) !== 'undefined' && this.state.item.audio_texto2 !== '') {
          audio_texto2 = this.state.item.audio_texto2;
          if(tieneTexto){
            audio_separador = true;
          } 
        }
    
      }

      /* link */
      itemLink = WpUtils.generateItemLinkUrl(this.state.item);

      /* share */
      if(this.state.item.type === 'post'){
          share = true;
      }
      if(typeof(this.props.share) != 'undefined') {
          share = this.props.share;
      }
    }

    var render = 'img';
    if(typeof(this.props.render) != 'undefined'){
      render = this.props.render;
    }

    var heading = 1;
    if(this.props.heading){
      heading = this.props.heading
    }

    var show_title = true;
    if(typeof this.props.show_title === 'boolean' && this.props.show_title === false){
      show_title = false;
    }

    var articleClass = 'the-post';
    if(this.props.articleClass){
      articleClass = this.props.articleClass;
    }

    /* 
    TODO: agregar SEO y renderizado en el server
    var seoFullUrl = window.location.href;
    */
    switch(template) {
      case 1:
          return (
            <article className={articleClass}>
              {!this.state.item
                ?
                this.props.children
                :
                <div className='post_content'>
                  {show_title && <WpItemTitle linkTo='#' title={this.state.item.title.rendered} heading={heading} />}
                  {item_image && <WpItemImage src={item_image} render={render} altText={item_image_alt}/>}
                  {audio_src != '' && <WpItemAudio src={audio_src} texto1={audio_texto1} texto2={audio_texto2} separador={audio_separador} />}
                  {share && <ShareButtons url={itemLink} quote={this.state.item.title.rendered} />}
                  {this.state.item.type !== 'page' &&
                    <div className='excerpt'>{renderHTML(this.state.item.excerpt.rendered)}</div>
                  }
                  <div className='content'>{renderHTML(this.state.item.content.parsed)}</div>
                </div>
              }
            </article>
          )
      case 2:
        return (
          <article className={articleClass}>
            {!this.state.item
              ?
              this.props.children
              :
              <div className='post_content'>
                {item_image && <WpItemImage src={item_image} render='img'/>}
                {show_title && <WpItemTitle linkTo='#' title={this.state.item.title.rendered} heading={heading} />}
                {audio_src != '' && <WpItemAudio src={audio_src} texto1={audio_texto1} texto2={audio_texto2} separador={audio_separador} />}
                {share && <ShareButtons url={itemLink} quote={this.state.item.title.rendered} />}
                {this.state.item.type !== 'page' &&
                  <div className='excerpt'>{renderHTML(this.state.item.excerpt.rendered)}</div>
                }
                <div className='content'>{renderHTML(this.state.item.content.parsed)}</div>
              </div>
            }
          </article>
        )
        case 3:
          return (
            <article className={articleClass}>
              {!this.state.item
                ?
                this.props.children
                :
                <div className='post_content'>
                  {share && <ShareButtons url={itemLink} quote={this.state.item.title.rendered} />}
                  {show_title && <WpItemTitle linkTo='#' title={this.state.item.title.rendered} heading={heading} />}
                  <div className='date'>{moment(this.state.item.date).format('DD/MM/YYYY')}</div>
                  {this.state.item.type !== 'page' &&
                    <div className='excerpt'>{renderHTML(this.state.item.excerpt.rendered)}</div>
                  }
                  {item_image && <WpItemImage src={item_image} render='img'/>}
                  {audio_src != '' && <WpItemAudio src={audio_src} texto1={audio_texto1} texto2={audio_texto2} separador={audio_separador} />}
                  <div className='content'>{renderHTML(this.state.item.content.parsed)}</div>
                </div>
              }
            </article>
          )
        default:
    }       
  }

}

export default WpItem;
