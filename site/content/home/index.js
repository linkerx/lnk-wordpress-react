import React from 'react';
import WpApi from '../../../api';
import './styles.scss';

class WpSiteHome extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
          site: null,
          root: false
        }
        this.getSite = this.getSite.bind(this);
    }

    componentDidMount(){
        this.getSite();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.site !== this.props.site) {
            this.getSite(this.props.site);
        }
    }

    getSite(site_name = null){
        this.setState(function(){
            return {
                site:null,
                root:false
            }
        });

        var opts = {
            name: this.props.site,
        }

        if(site_name){
            opts.name = site_name;
        }

        WpApi.getSite(opts)
            .then(function(site){
            if(typeof(this.props.show) != 'undefined'){
                setTimeout(function(){this.props.show()}.bind(this), 2000);
            }
            this.setState(function(){
                return {
                site:site
                }
            })
        }.bind(this))
    }
    
    render (){
        return(
            <section id='site-home' className={this.props.site}>
            
            </section>  
        )
    }
}

export default WpSiteHome;
