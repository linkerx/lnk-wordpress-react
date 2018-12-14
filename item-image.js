var React = require('react');
var Link = require('react-router-dom').Link;
var FullscreenImage = require('./fullscreenImage');

class ItemImage extends React.Component {
  constructor(props){
    super(props);
  }

  endLoading(){

  }

  render(){
    var background = {
      backgroundImage: "url(" + this.props.src + ")"
    };

    var imageLink = false;
    if(this.props.imageLink){
      imageLink = true;
    }

    var imageRender = 'img';
    if(this.props.render){
      imageRender = this.props.render;
    }

    var cls = 'image_container';
    if(this.props.cls){
        cls = this.props.cls;
    }

    var fullscreen = false;
    if(this.props.fullscreen){
      fullscreen = true;
    }

    return (
      <div className={cls}>
        {imageRender === 'img'
          ?
            <div className='image_wrapper'>
            {imageLink
              ?
              <Link to={this.props.linkTo} > <img src={this.props.src} onLoad={this.endLoading()} onError={this.endLoading()} alt={this.props.alt} /></Link>
              :
              <img src={this.props.src} onLoad={this.endLoading()} onError={this.endLoading()} alt={this.props.alt} />
            }
            </div>
          :
            <div className='image_wrapper'>
            {imageLink
              ?
              <Link to={this.props.linkTo} ><div className='image' style={background} alt={this.props.alt} ></div></Link>
              :
              <div className='image' style={background} alt={this.props.alt} ></div>
            }
            </div>
        }
        {fullscreen &&
          <FullscreenImage imageSrc={this.props.src} modalContainer='museo-modal' desc={this.props.alt} />
        }
      </div>
    )
  }
}

module.exports = ItemImage;
