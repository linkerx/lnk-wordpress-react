import React from 'react';
import { Link } from 'react-router-dom';
import 'styles/wp/site-header.scss';

class WpSiteHeader extends React.Component {
    render(){
        if (this.props.debug) 
            console.log("Data Header Site:",this.props.data);
        
        return (
            <div id='wp-site-header'>
                <Link to={this.props.data.path}><h1 title={'Volver a '+this.props.data.blog_name}>{this.props.data.blog_name}</h1></Link>
            </div>
        )
    }
}

export default WpSiteHeader;