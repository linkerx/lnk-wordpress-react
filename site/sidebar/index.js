import React from 'react';
import WpSidebar from 'wp/sidebar';
import 'styles/wp/site-sidebar.scss';

class WpSiteSidebar extends React.Component {
    render(){
        var classSidebar = 'closed';
        if(this.props.opened) {
            classSidebar = 'opened';
        }
        return (
            <div id='wp-site-sidebar' className={classSidebar}>
                <WpSidebar site={this.props.site} pos='cartelera-sidebar' />
            </div>
        )
    }
}

export default WpSiteSidebar;