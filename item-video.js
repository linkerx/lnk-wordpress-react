import React from 'react';

class ItemVideo extends React.Component {

  render(){

    return (
      <div className='video' >
        <iframe src={this.props.src + "?controls=0"} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen={true}></iframe>
      </div>
    )
  }
}
export default ItemVideo;
