var React = require('react');
var WpApi = require('./api');
var ListItem = require('./list-item');

class WpList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
    }
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount(){
      this.updateItems();
  }

  updateItems(){
    this.setState(function () {
      return {
        items: null
      }
    });

    var queries = ['_embed'];
    if(this.props.queries){
      queries = this.props.queries
    }

    var opts = {
      url: this.props.url,
      site: this.props.site,
      type: this.props.type,
      queries: queries,
      debug: this.props.debug
    }

    WpApi.getList(opts)
      .then(function(items) {
        if(this.props.ready){
          setTimeout(function(){this.props.ready()}.bind(this), 1000);
        }
        if(this.props.debug)
          console.log("trae lista:",items);
        this.setState(function () {
          return {
            items: items
          }
        });
      }.bind(this));
  }

  render() {

    if(this.props.debug){
      console.log(this.state.items);
    }

    var template = 1
    if(this.props.template){
        template = this.props.template;
    }

    var imageRender = 'img';
    if(this.props.imageRender){
      imageRender = this.props.imageRender;
    }

    var imageSize = 'thumbnail';
    if(this.props.imageSize){
      imageSize = this.props.imageSize;
    }

    var imageLink = false;
    if(this.props.imageLink){
      imageLink = this.props.imageLink;
    }

    var defaultImg = null;
    if(this.props.defaultImg){
      defaultImg = this.props.defaultImg;
    }

    var heading = 2;
    if(this.props.heading){
      heading = this.props.heading;
    }

    return (
      <div className="list">
        {!this.state.items
          ?
          this.props.children
          :
          this.state.items.map(function (item, index) {
            return (<ListItem key={item.id} item={item} imageRender={imageRender} imageSize={imageSize} defaultImg={defaultImg} imageLink={imageLink} template={template}  />)
          })
        }
      </div>
    )
  }
}

// TODO: propTypes

module.exports = WpList;
