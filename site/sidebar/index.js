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
<<<<<<< HEAD
            <div id='wp-site-sidebar' className={classSidebar}>
                <WpSidebar site={this.props.site} pos='cartelera-sidebar' />
=======
            <div id='wp-site-sidebar' className={this.props.openMenu !== undefined ? this.props.openMenu ? "open" : "close" : null }>
                <WpSidebar site={this.props.site}  pos='cartelera-sidebar' />
>>>>>>> refs/remotes/origin/master
            </div>
        )
    }
}

export default WpSiteSidebar;