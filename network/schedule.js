import React from 'react';
import WpApi from 'wp/api';
import WpNetworkItem from './item' ;

class WpNetworkList extends React.Component {

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

    var count = 12;
    if(typeof(this.props.count) != 'undefined')
      count = this.props.count;

    var dateFormat = 'd/m/Y';
    if(typeof(this.props.dateFormat) != 'undefined')
      count = this.props.dateFormat;

    
    WpApi.getSitesPostsAgenda(count,dateFormat)
      .then(function(items) {
        this.setState(function () {
          return {
            items: items
          }
        });
      }.bind(this));
  }

  render() {

    if(this.props.debug){
      console.log(this.props.item);
    }

    var imageRender = 'img';
    if(this.props.imageRender){
      imageRender = this.props.imageRender;
    }

    var template = 1;
    if(this.props.template){
      template = this.props.template;
    }

    var imageSize = 'thumbnail';
    if(this.props.imageSize){
      imageSize = this.props.imageSize;
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
            return (
              <WpNetworkItem key={index} item={item} imageRender={imageRender} imageSize={imageSize} defaultImg={defaultImg} heading={heading} template={template} />
            )
          })
        }
      </div>
    )
  }
}

// TODO: propTypes

export default WpNetworkList;
