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
      header_fixed: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.checkSidebars = this.checkSidebars.bind(this);
    this.bindHeaderChecker = this.bindHeaderChecker.bind(this);
    this.unbindHeaderChecker = this.unbindHeaderChecker.bind(this);
    this.checkHeader = this.checkHeader.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth > 800) {
      this.checkSidebars();
    }
    this.bindHeaderChecker();
  }

  componentWillUnmount() {
    this.unbindHeaderChecker();
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

  checkSidebars(){
    var menuOpened = true;
    var sidebarOpened = true;
    if(this.props.site_data.barra_izq === 1) {
      menuOpened = true;
    }
    if(this.props.site_data.barra_der === 1) {
      sidebarOpened = true;
    }
    
    console.log("barras: ",menuOpened,sidebarOpened);

    this.setState({
      menu_opened: menuOpened,
      sidebar_opened: sidebarOpened
    });
  }
  
  bindHeaderChecker(){
    window.addEventListener('scroll', this.checkHeader);
  }

  unbindHeaderChecker() {
    window.removeEventListener('scroll', this.checkHeader);  
  }

  checkHeader() {
    if(window.scrollY > 120){
      this.setState({
        header_fixed: true
      });    
    } else {
      this.setState({
        header_fixed: false
      })
    }
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
          fixed={this.state.header_fixed}
          toggleMenu={this.toggleMenu} 
          toggleSidebar={this.toggleSidebar} 
          menuOpened={this.state.menu_opened} 
          sidebarOpened={this.state.sidebar_opened} 
          debug={false} 
          data={this.props.site_data} 
        />
       <div className='wp-site-wrapper'>
          <WpSiteMenu site={this.props.site} opened={this.state.menu_opened} />
          <WpSiteContent {...this.props} template={template} >{this.props.children}</WpSiteContent>
          <WpSiteSidebar site={this.props.site} opened={this.state.sidebar_opened} />
        </div>
      </section>
    )
  }
}

export default WpSite;
