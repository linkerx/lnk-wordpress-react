import React from 'react';
import WpApi from '../../../api';
import WpList from '../../../list';
import renderHTML from 'react-render-html';
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

        WpApi.getSite(opts).then(function(site){
            WpApi.getSitePosts(opts).then(function(posts){
                if(typeof(this.props.show) != 'undefined'){
                    setTimeout(function(){this.props.show()}.bind(this), 2000);
                }
                this.setState(function(){
                    return {
                        site:site
                    }
                });
            }.bind(this))
        }.bind(this))
    }
    
    render (){
        return(
            <section id='site-home' className={this.props.site}>
            { this.state.site !== null &&
                <div className='site-home-content'>
                    <div id='site-post' className='page'>
                    { this.state.site.frontpage > 0 &&
                        <div>
                            <h2>{renderHTML(this.state.site.page.post_title)}</h2>
                            <div className='content'>
                            {renderHTML(this.state.site.page.post_content)}
                            </div>
                        </div>
                    } 
                    </div>
                    <div id='site-posts'>
                    {
                        <div>
                            <h2>Novedades de {this.state.site.blog_name}</h2>
                            <WpList site={this.props.site} type='posts' heading={3}/>
                        </div>
                    }   
                    </div>
                </div>
            }
            </section>  
        )
    }
}

export default WpSiteHome;
