import React from 'react';
import { Link } from 'react-router-dom';
import 'styles/wp/site-header.scss';

class WpSiteHeader extends React.Component {
    render(){
        //console.log("Data Header Site:",this.props.data);
        return (
            <div id='wp-site-header'>
                <div className='fondo'></div>
                <div className={this.props.menuOpened ? "button-site button-menu active" : "button-site button-menu"}  onClick={this.props.toggleMenu}>
                    <span>Menú</span>
                    <i className={this.props.menuOpened ? "fas fa-chevron-left" : "fas fa-chevron-right" }></i>
                </div>
                <div className={this.props.sidebarOpened ? "button-site button-sidebar active" : "button-site button-sidebar"}  onClick={this.props.toggleSidebar}>
                    <span>Menú</span>
                    <i className={this.props.sidebarOpened ? "fas fa-chevron-right" : "fas fa-chevron-left" }></i>
                </div>
                <Link to={this.props.data.path}><h1 title={'Volver a '+this.props.data.blog_name}>{this.props.data.blog_name}</h1></Link>
            </div>
        )
    }
}

export default WpSiteHeader;