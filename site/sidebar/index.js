import React from 'react';
import WpSidebar from 'wp/sidebar';
import 'styles/wp/site-sidebar.scss';

class WpSiteSidebar extends React.Component {
    render(){
        return (
            <div id='wp-site-sidebar' className={this.props.openMenu !== undefined ? this.props.openMenu ? "open" : "close" : null }>
                <WpSidebar site={this.props.site}  pos='cartelera-sidebar' />
            </div>
        )
    }
}

export default WpSiteSidebar;