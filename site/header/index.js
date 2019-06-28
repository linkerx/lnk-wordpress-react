import React from 'react';
import 'styles/wp/site-header.scss';

class WpSiteHeader extends React.Component {
    render(){
        console.log("Data Header Site:",this.props.data);
        return (
            <div id='wp-site-header'>
                <h1>{this.props.data.blog_name}</h1>
            </div>
        )
    }
}

export default WpSiteHeader;