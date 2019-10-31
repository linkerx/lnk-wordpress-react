import React from 'react';
import WpMenu from '../../menu';
import 'styles/wp/site-menu.scss';

class WpSiteMenu extends React.Component {
    render(){
        var classMenu = 'closed';
        if(this.props.opened) {
            classMenu = 'opened';
        }
        return <div id='wp-site-menu' className={classMenu}>
            <WpMenu site={this.props.site} location='site-menu-location' />
        </div>
    }
}

export default WpSiteMenu;