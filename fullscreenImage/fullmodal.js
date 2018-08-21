var React = require('react');
var ReactDOM = require('react-dom');
var renderHTML = require('react-render-html');

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
          <span>{renderHTML(desc)}</span>
        </div>
        <div className='close-trigger' onClick={() => {ReactDOM.render(<div></div>,document.getElementById(modalContainer))}} >
         <i className="fas fa-compress"></i>
        </div>
      </div>
      ,document.getElementById(modalContainer));
  }
}
