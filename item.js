var React = require('react');
var WpApi = require('./api');
var WpItemTitle = require('./item-title');
var WpItemImage = require('./item-image');
var renderHTML = require('react-render-html');
var serialize = require('form-serialize');

class WpItem extends React.Component {

  constructor(props) {
    super();
    this.state = {
      item: null,
    }
    this.updateItem = this.updateItem.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
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
        this.formSubmit(idInput,data);
        return false;
      }.bind(this));
   }
  }

  formSubmit(id,data){
    WpApi.postContactForm(id,data,{debug:true})
      .then(function(response){
        console.log(response);
      });
  }

  updateItem(){
    this.setState(function(){
      return {
        item: null
      }
    });

    var opts = {
      url: this.props.url,
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

          //if(this.props.debug){
            console.log(item);
          //}
          if(item[0]){
            var content = item[0].content.rendered;
            var htmlObject = document.createElement('div');
            htmlObject.innerHTML = content;
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
            return {
              item: item[0]
            }
          }
        }.bind(this));
      }.bind(this));
  }

  render() {
    if(this.state.item){
      if(this.state.item._embedded['wp:featuredmedia']){
        var item_image = this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes['thumbnail'].source_url;
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

    return (
      <article>
        {!this.state.item
          ?
          this.props.children
          :
          <div className='post_content'>
            {show_title && <WpItemTitle linkTo='#' title={this.state.item.title.rendered} heading={heading} />}

            {item_image && <WpItemImage src={item_image} render='img'/>}

            {!this.state.type == 'page' &&
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
