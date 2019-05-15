var React = require('react');
var FullModal = require('./fullmodal');
require('./styles.scss');

function FullscreenImage(props) {

  var desc = 'Sin descripcion';
  if(props.desc){
    desc = props.desc;
  }

  return (
    <div className='open-trigger' onClick={() => {FullModal.openFull(props.modalContainer,props.imageSrc,desc)}} >
      <i className="fas fa-expand"></i>
    </div>
  )
}

module.exports = FullscreenImage;
