import React from 'react';
import WpApi from '../api';
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
    WpApi.getSitesPosts(count)
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

    var layout = 'title-first';
    if(this.props.layout){
      layout = this.props.layout;
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
              <WpNetworkItem key={index} item={item} imageRender={imageRender} imageSize={imageSize} defaultImg={defaultImg} heading={heading} layout={layout} />
            )
          })
        }
      </div>
    )
  }
}

// TODO: propTypes

export default WpNetworkList;
