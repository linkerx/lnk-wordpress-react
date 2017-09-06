var React = require('react');
var WpApi = require('./api');

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
      position: this.props.location,
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
      <nav className={cls}>
        {!this.state.menu
          ?
            this.props.children
          :
          <div className='sidebar-container'>
          {this.state.sidebar.name}
            <div className='widgets'>
            {
              this.state.sidebar.widgets.map(function (widget, index) {
                  return (<WpWidget key={widget.id} widget={widget} />);
              }.bind(this))
            }
            </div>
          </div>
        }
      </nav>
    )
  }
}

// TODO: propTypes

module.exports = WpSidebar;
