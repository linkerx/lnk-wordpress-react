import React from 'react';
import WpApi from '../../api';
import WpSiteArchive from './archive';
import WpSitePost from './post';
import WpSiteHome from './home';
import Cargando from 'components/utils/cargando';
import 'styles/wp/site-content.scss';

class WpSiteContent extends React.Component {
    constructor(props){
        super(props);
    
        var site = "";
        if(props.site){
          site = props.site;
        }
    
        this.state = {
          site: site,
          check: false,
          lvl: 0,
          home: false,
          type: null,
          category: null,
          post: null
        }
        this.checkURL = this.checkURL.bind(this);
    }

    componentDidMount(){
        this.checkURL();
        if (this.props.show && typeof this.props.show === "function") {
          setTimeout(function(){this.props.show()}.bind(this), 2000);
        }
      }
    
      componentWillReceiveProps(nextProps){
        if(nextProps.location.pathname !== this.props.location.pathname) {
          this.checkURL();
        }
      }
    
      checkURL(){
        var debugOnCheck = true;
        if(this.props.debugOnCheck){
          debugOnCheck = this.props.debugOnCheck;
        }
    
        this.setState(function(){
          return {
            site: this.state.site,
            check: false,
            lvl: 0,
            home: false,
            type: null,
            category: null,
            post: null
          }
        });
    
        if(typeof(this.props.match.params.slug1) === 'undefined') {
          this.setState({
            site: this.state.site,
            check:true,
            home:true
          });
        } else {
          var opts_type = {
            site: this.state.site,
            type: this.props.match.params.slug1,
            debug: true
          };
    
          if(debugOnCheck) console.log(opts_type);
    
          if(debugOnCheck) console.log('the params are: ',this.props.match.params);
          if(debugOnCheck) console.log('serching for type... ',this.props.match.params.slug1);
          WpApi.getType(opts_type)
            .then(function(type){
              if(type){
                if(debugOnCheck) console.log('type OK',type);
                if(this.props.match.params.slug2 === 'undefined'){
                  this.setState(function(){
                    /* TYPE ARCHIVE */
                    return {
                      check:true,
                      type: type,
                    }
                  });
                } else {
                  if(debugOnCheck) console.log('has slug2');
                  this.setState(function(){
                    /* TYPE/POST ITEM */
                    return {
                      check: true,
                      type: type,
                      post: this.props.match.params.slug2
                    }
                  }.bind(this));
                }
              } else {
                if(debugOnCheck) console.log('not type',this.props.match.params.slug1);
                var opts_term = {
                  site: this.props.site,
                  type: 'post',
                  term: this.props.match.params.slug1,
                  debug: false
                };
                if(debugOnCheck) console.log('searching for post category... ',this.props.match.params.slug1);
                WpApi.getCategory(opts_term)
                  .then(function(category){
                    if(category){
                      if(debugOnCheck) console.log('category OK');
                      if(this.props.match.params.slug2 === undefined || this.props.match.params.slug2 === 'page'){
                        if(debugOnCheck) console.log('show category archive');
                        this.setState(function(){
                          /* POST/CATEGORY ARCHIVE */
                          return {
                            check: true,
                            type: 'posts',
                            category: category.id,
                            category_name: category.name
                          }
                        })
                      } else {
                        if(debugOnCheck) console.log('is a post!',this.props.match.params.slug2);
                        this.setState(function(){
                          /* POST/CATEGORY/POST ITEM */
                          return {
                            check: true,
                            type: 'posts',
                            category: category.id,
                            category_name: category.name,
                            post: this.props.match.params.slug2
                          }
                        })
                      }
                    } else {
                      this.setState(function(){
                        /* PAGE/POST ITEM */
                        return {
                          check: true,
                          type: 'page',
                          post: this.props.match.params.slug1
                        }
                      })
                    }
                  }.bind(this));
              }
            }.bind(this));
          }
    }
    
    render(){
        
        var template = 1;
        if(this.props.template){
          template = this.props.template;
        }

        return (
            <div id='wp-site-content'>
                <div>
                {this.state.check 
                ?
                    <div>
                        {this.state.home 
                            ?
                            <div className='wpsite-home'>
                            <WpSiteHome ready={this.props.ready} site={this.state.site} />
                            </div>
                            :
                            <div className='wpsite-content'>
                            {this.state.type !== 'posts'
                            ?
                                <div className={'type-'+this.state.type}>
                                {this.state.post
                                ?
                                    <WpSitePost ready={this.props.ready} site={this.props.site} type={this.state.type} slug={this.state.post} template={template}/>
                                :
                                    <WpSiteArchive ready={this.props.ready} site={this.props.site} type={this.state.type} template={template} />
                                }
                                </div>
                            :
                                <div className='not-typed'>
                                {this.state.category && !this.state.post
                                ?
                                    <WpSiteArchive ready={this.props.ready} site={this.props.site} type={this.state.type} category={this.state.category} category_name={this.state.category_name} template={template} />
                                :
                                    <WpSitePost ready={this.props.ready} site={this.props.site} type={this.state.type} slug={this.state.post} template={template} />
                                }
                                </div>
                            }
                        </div>
                        }
                    </div>
                :
                    <Cargando />
                }
                </div>
            </div>
        )
    }
}

export default WpSiteContent;