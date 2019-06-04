import React from 'react';
import './styles.scss';

class WpSiteHeader extends React.Component {
    render(){
        return (
            <div id='wp-site-header'>
                {this.props.data.blog_name}
            </div>
        )
    }
}

export default WpSiteHeader;