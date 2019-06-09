import React from 'react';
import WpApi from '../api';
import { Route } from 'react-router-dom';
import WpSite from '../site';

class WpNetwork extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      check: false,
      site: null,
      dite_data: null
    }

    this.checkSite = this.checkSite.bind(this);
  }

  componentDidMount(){
    this.checkSite();
  }

  checkSite(){
    this.setState({
      check: false,
      site: null,
      site_data: null
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
            site: this.props.match.params.slug,
            site_data: site
        });
      }.bind(this))
      .catch(function(error) {
        var opts_site2 = {
          name: '',
          debug: false
        };
        WpApi.getSite(opts_site2)
          .then(function(main_site){
            setTimeout(function(){this.props.show()}.bind(this), 3000);
            this.setState({
                check: true,
                site: this.props.match.params.slug,
                site_data: main_site[0 ]
            });
          }.bind(this));
      }.bind(this));
  }

  render(){
    return (
      <div className='network-wrapper'>
        {this.state.check &&
          <div>
          {this.state.site
            ?
              <Route path={'/'+this.state.site+'/:slug1?/:slug2?/:slug3?'} render={ function(props) { return ( <WpSite {...props} site={this.state.site} site_data={this.state.site_data} template={2} /> ) }.bind(this) } />
            :
              <Route path='/:slug1/:slug2?/:slug3?' render={ function(props) { return ( <WpSite {...props} site_data={this.state.site_data} template={2} /> ) } } />
          }
          </div>
        }
      </div>
    )
  }
}

export default WpNetwork;
