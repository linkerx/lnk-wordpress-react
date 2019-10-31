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
      menu_opened: false,
      sidebar_opened: false,
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }


  toggleMenu(){
    this.setState({
      menu_opened: !this.state.menu_opened
    })
  }

  toggleSidebar(){
    this.setState({
      sidebar_opened: !this.state.sidebar_opened
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
        <WpSiteHeader 
          site={this.props.site} 
          toggleMenu={this.toggleMenu} 
          toggleSidebar={this.toggleSidebar} 
          menuOpened={this.state.menu_opened} 
          sidebarOpened={this.state.sidebar_opened} 
          debug={false} 
          data={this.props.site_data} 
        />
       <div className='wp-site-wrapper'>
          <WpSiteMenu site={this.props.site} opened={this.state.menu_opened} />
          <WpSiteContent {...this.props} template={template} />
          <WpSiteSidebar site={this.props.site} oopened={this.state.sidebar_opened} />
        </div>
      </section>
    )
  }
}

export default WpSite;
