var React = require('react');
var ReactDOM = require('react-dom');
var FontAwesome = require('react-fontawesome');
var FullModal = require('./fullmodal');
require('./styles.less');

function FullscreenImage(props) {
  //console.log(props.modalContainer,props.imageSrc);

  var desc = 'Sin descripcion';
  if(props.desc){
    desc = props.desc;
  }

  return (
    <div className='open-trigger' onClick={() => {FullModal.openFull(props.modalContainer,props.imageSrc,desc)}} >
      <FontAwesome name='expand' />
    </div>
  )
}

module.exports = FullscreenImage;
