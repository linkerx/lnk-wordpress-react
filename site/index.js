import React from 'react';
import WpSiteHeader from './header';
import WpSiteMenu from './menu';
import WpSiteContent from './content';
import WpSiteSidebar from './sidebar';
import 'styles/wp/site.scss';

class WpSite extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      menu_opened: false
    }
    this.openMenu = this.openMenu.bind(this);
  }

  openMenu(){
    this.setState({
      menu_opened: true
    })
  }

  render() {
    var debug = false;
    if(typeof(this.props.debug) !== 'undefined'){
      debug = this.props.debug;
    }

    var template = 1;
    if(this.props.template){
      template = this.props.template;
    }

    if(debug) {
      console.log("WpSite Props: ",this.props);
      console.log("WpSite State: ",this.state);      
    }

    return(
      <section id='wp-site'>
        <WpSiteHeader site={this.props.site} openMenu={this.openMenu} data={this.props.site_data} />
        <div className='wp-site-wrapper'>
          <WpSiteMenu site={this.props.site} />
          <WpSiteContent {...this.props} template={template} />
          <WpSiteSidebar site={this.props.site} />
        </div>
      </section>
    )
  }
}

export default WpSite;
