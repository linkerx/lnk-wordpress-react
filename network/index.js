var React = require('react');
var WpApi = require('wp/api');
var ReactRouter = require('react-router-dom');
var Route = ReactRouter.Route;
var WpSite = require('wp/site');

class WpNetwork extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      check: false,
      site: null
    }

    this.checkSite = this.checkSite.bind(this);
  }

  componentDidMount(){
    this.checkSite();
  }

  checkSite(){
    this.setState({
      check: false,
      site: null
    });

    var opts_site = {
      name: this.props.match.params.slug,
      debug: false
    };

    WpApi.getSite(opts_site)
      .then(function(site){
        setTimeout(function(){this.props.show()}.bind(this), 3000);
        this.setState({
            check: true,
            site: this.props.match.params.slug
        });
      }.bind(this))
      .catch(function (error) {
        setTimeout(function(){this.props.show()}.bind(this), 3000);
        this.setState({
            check: true,
            site: null
        });
      }.bind(this));
  }

  render(){

    //console.log(this.state);

    return (
      <div className='network-wrapper'>
        {this.state.check &&
          <div>
          {this.state.site
            ?
              <Route path={'/'+this.props.match.params.slug+'/:slug1?/:slug2?/:slug3?'} render={ function(props) { return ( <WpSite {...props} site={this.props.match.params.slug} /> ) }.bind(this) } />
            :
              <Route path='/:slug1/:slug2?/:slug3?' render={ function(props) { return ( <WpSite {...props} /> ) }.bind(this) } />
          }
          </div>
        }
      </div>
    )
  }
}

module.exports = WpNetwork;
