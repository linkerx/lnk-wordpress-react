import React from 'react';
import WpMenu from '../../menu';

class WpSiteMenu extends React.Component {
    render(){
        return <div id='wp-site-menu'>
            <WpMenu site={this.props.site} location='main-menu-location' />
        </div>
    }
}

export default WpSiteMenu;