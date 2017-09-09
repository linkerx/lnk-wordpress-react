var React = require('react');
var WpApi = require('./api');
var WpItemTitle = require('./item-title');
var WpItemImage = require('./item-image');
var renderHTML = require('react-render-html');


class WpItem extends React.Component {

  constructor(props) {
    super();
    this.state = {
      item: null
    }

    this.updateItem = this.updateItem.bind(this);
  }

  componentDidMount(){
    this.updateItem();
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

    //console.log(this.props,opts);

    WpApi.getItem(opts)
      .then(function(item){
        this.setState(function(){
          return {
            item: item[0]
          }
        });
      }.bind(this));
  }

  render() {
    if(this.state.item){
      if(this.state.item._embedded['wp:featuredmedia']){
        var item_image = this.state.item._embedded['wp:featuredmedia'][0].media_details.sizes['thumbnail'].source_url;
      }
    }

    return (
      <article>
        {!this.state.item
          ?
          this.props.children
          :
          <div className='post_content'>
            <WpItemTitle linkTo='#' title={this.state.item.title.rendered}/>
            {item_image && <WpItemImage src={item_image} render='img'/>}

            {!this.state.type == 'page' &&
              <div className='excerpt'>{renderHTML(this.state.item.excerpt.rendered)}</div>
            }
            <div className='content'>{renderHTML(this.state.item.content.rendered)}</div>

          </div>
        }
      </article>
    )
  }

}

module.exports = WpItem;
