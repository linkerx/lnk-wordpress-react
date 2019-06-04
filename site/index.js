import React from 'react';
import WpSiteHeader from './header';
import WpSiteMenu from './menu';
import WpSiteContent from './content';
import WpSiteSidebar from './sidebar';

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
    var template = 1;
    if(this.props.template){
      template = this.props.template;
    }

    return(
      <section id='wpsite-route'>
        <WpSiteHeader site={this.props.site} openMenu={this.openMenu} data={this.props.site_data} />
        <WpSiteMenu site={this.props.site} />
        <WpSiteContent {...this.props} template={template} />
        <WpSiteSidebar site={this.props.site} />
      </section>
    )
  }
}

export default WpSite;
