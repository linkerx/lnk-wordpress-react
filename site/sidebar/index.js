import React from 'react';
import WpSidebar from 'wp/sidebar';
import 'styles/wp/site-sidebar.scss';

class WpSiteSidebar extends React.Component {
    render(){
        return (
            <div id='wp-site-sidebar'>
                <WpSidebar site={this.props.site} pos='cartelera-sidebar' />
            </div>
        )
    }
}

export default WpSiteSidebar;