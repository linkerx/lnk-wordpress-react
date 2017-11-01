var React = require('react');
var ReactDOM = require('react-dom');
var FontAwesome = require('react-fontawesome');

module.exports = {
  openFull: function(modalContainer,imageSrc,desc){
    ReactDOM.render(
      <div id='fullscreen-image' onClick={() => {ReactDOM.render(<div></div>,document.getElementById(modalContainer))}} >
        <div className='modal'>
        </div>
        <div className='img-container' onClick={() => {ReactDOM.render(<div></div>,document.getElementById(modalContainer))}} >
          <img src={imageSrc} />
        </div>
        <div className='descripcion' >
          <span>{desc}</span>
        </div>
        <div className='close-trigger' onClick={() => {ReactDOM.render(<div></div>,document.getElementById(modalContainer))}} >
          <FontAwesome name='compress' />
        </div>
      </div>
      ,document.getElementById(modalContainer));
  }
}
