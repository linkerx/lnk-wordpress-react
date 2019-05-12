var React = require('react');
var WpApi = require('./api');
var renderHTML = require('react-render-html');

class WpSidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebar: null,
    }
    this.updateSidebar = this.updateSidebar.bind(this);
  }

  componentDidMount(){
      this.updateSidebar();
  }

  updateSidebar(){
    this.setState(function () {
      return {
        sidebar: null
      }
    });
    var opts = {
      url: this.props.url,
      pos: this.props.pos,
      debug: this.props.debug
    }

    WpApi.getSidebar(opts)
      .then(function(sidebar) {
        this.setState(function () {
          return {
            sidebar: sidebar
          }
        });
      }.bind(this));
  }

  render() {

    var cls = 'sidebar';
    if(this.props.cls){
      cls = this.props.cls;
    }

    return (
      <sidebar id={this.props.pos}>
        {!this.state.sidebar
          ?
            this.props.children
          :
          <div className='sidebar-container'>
            {renderHTML(this.state.sidebar.rendered)}
          </div>
        }
      </sidebar>
    )
  }
}

// TODO: propTypes

module.exports = WpSidebar;
