import React from 'react';

class ItemAudio extends React.Component {

  render(){
    console.log("MUESTRA AUDIO");
    return (
      <div className='audio' >
        <audio src={this.props.src} controls={true}></audio>
      </div>
    )
  }
}
export default ItemAudio;
