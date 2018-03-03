var React = require('react');
var WpApi = require('./api');
var WpUtils = require('wp/utils');
var WpItemTitle = require('./item-title');
var WpItemImage = require('./item-image');
var renderHTML = require('react-render-html');
var serialize = require('form-serialize');
var FullModal = require('./fullscreenImage/fullmodal');
var ShareButtons = require('./shareButtons');

class WpItem extends React.Component {

  constructor(props) {
    super();
    this.state = {
      item: null,
    }
    this.updateItem = this.updateItem.bind(this);
  }

  componentDidMount(){
    this.updateItem();
  }

  componentDidUpdate(){
    var form = document.getElementsByClassName('wpcf7-form')[0];
    if(form){

      /**
       * FORM SUBMISSION
       */
      var idInput = document.querySelector('.wpcf7-form input[name=_wpcf7]').value;
      form.addEventListener('submit',function(e){
        e.preventDefault();
        var data = serialize(form);
        WpApi.postContactForm(idInput,data,{debug:true})
          .then(function(response){
            alert("Su mensaje fue enviado con éxito.");
            form.reset();
          });
        return false;
      }.bind(this));
   }

   var images = document.querySelectorAll('img');
   if(this.props.debug) {
       console.log(images);
   }
   for(var x=0;x<images.length;x++){
      images[x].addEventListener('click',function(){
        FullModal.openFull('museo-modal',this.src,this.alt);
      });
   }
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
                  inputs[x].removeAttribute('value');
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
        }.bind(this));
      }.bind(this));
  }

  render() {

    var ImgSize = 'thumbnail';
    if(this.props.img_size) {
        ImgSize = this.props.img_size;
    }

    var itemLink = '';
    var share = false;
    if(this.state.item){
      /* image */
      if(this.state.item._embedded && this.state.item._embedded['wp:featuredmedia'] && this.state.item._embedded['wp:featuredmedia'][0].media_details){
        var item_image = this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes[ImgSize].source_url;
      }
      /* link */
      itemLink = WpUtils.generateItemLinkUrl(this.state.item);
      /* share */
      if(this.state.item.type == 'post'){
          share = true;
      }
      if(this.props.share) {
          share = this.props.share;
      }
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

    var seoFullUrl = window.location.href;

    return (
      <article className={articleClass}>
        {!this.state.item
          ?
          this.props.children
          :
          <div className='post_content'>

            {show_title && <WpItemTitle linkTo='#' title={this.state.item.title.rendered} heading={heading} />}

            {item_image && <WpItemImage src={item_image} render='img'/>}

            {share && <ShareButtons url={itemLink} quote={this.state.item.title.rendered} />}

            {this.state.item.type != 'page' &&
              <div className='excerpt'>{renderHTML(this.state.item.excerpt.rendered)}</div>
            }
            <div className='content'>{renderHTML(this.state.item.content.parsed)}</div>

          </div>
        }
      </article>
    )
  }

}

module.exports = WpItem;
