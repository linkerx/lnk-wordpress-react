import React from 'react';
import WpApi from '../../api';
import WpSiteArchive from './archive';
import WpSitePost from './post';
import WpSiteHome from './home';
import WpSearchResults from './search';
import Cargando from 'components/utils/cargando';
import 'styles/wp/site-content.scss';

class WpSiteContent extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
          site: "",
          check: false,
          lvl: 0,
          home: false,
          type: null,
          category: null,
          post: null,
          query: ''
        }
        this.checkURL = this.checkURL.bind(this);
    }

    componentDidMount(){

        //console.log("CHILDREN:",this.props.children);

        if(typeof(this.props.children) === 'undefined') {
          this.checkURL();
        }
        if (this.props.show && typeof this.props.show === "function") {
          setTimeout(function(){this.props.show()}.bind(this), 2000);
        }
      }
    
      componentDidUpdate(prevProps){
        if(typeof(this.props.children) === 'undefined') {
          if(prevProps.location.pathname !== this.props.location.pathname) {
            this.checkURL();
          }
        }
      }
    
      checkURL(){
        var debugOnCheck = false;
        if(this.props.debugOnCheck){
          debugOnCheck = this.props.debugOnCheck;
        }

        if(debugOnCheck) console.log("Viene pedido con sitio:",this.props.site);
        if(debugOnCheck) console.log("Viene pedido con sitio:",this.props.path);
        
    
        var site = "";
        if(typeof(this.props.site)!=='undefined'){
          site = this.props.site;
        }
    
        this.setState(function(){
          return {
            site: site,
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
            check:true,
            home:true
          });
        } else if(this.props.match.params.slug1 == 's') {
          console.log('search: ',this.props.match.params.slug2);

          this.setState(function(){
            /* SEARCH RESULTS */
            return {
              check:true,
              type: 'search',
              home: false,
              query: 'search='+this.props.match.params.slug2
            }
          });          

        } else {
          var opts_type = {
            site: site,
            type: this.props.match.params.slug1,
            debug: true
          };
    
          if(debugOnCheck) console.log(opts_type);
          if(debugOnCheck) console.log('the params are: ',this.props.match.params);
          if(debugOnCheck) console.log('serching for type... ',this.props.match.params.slug1, this.props);
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
                      home: false
                    }
                  });
                } else {
                  if(debugOnCheck) console.log('has slug2');
                  this.setState(function(){
                    /* TYPE/POST ITEM */
                    return {
                      check: true,
                      type: type,
                      post: this.props.match.params.slug2,
                      home: false
                    }
                  }.bind(this));
                }
              } else {
                if(debugOnCheck) console.log('not type',this.props.match.params.slug1, this.props);
                var opts_term = {
                  site: this.state.site,
                  type: 'post',
                  term: this.props.match.params.slug1,
                  debug: false
                };
                if(debugOnCheck) console.log('searching for post category... ',this.props.match.params.slug1);
                if(debugOnCheck) console.log('with params:',opts_term);

                WpApi.getCategory(opts_term)
                  .then(function(category){
                    if(debugOnCheck) console.log("Respuesta de Cat:",category);
                    if(category){
                      if(debugOnCheck) console.log('category OK');
                      if(this.props.match.params.slug2 === undefined || this.props.match.params.slug2 === 'page'){
                        if(debugOnCheck) console.log('show category archive');
                        this.setState(function(){
                          /* POST/CATEGORY ARCHIVE */
                          return {
                            check: true,
                            home: false,
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
                            home: false,
                            type: 'posts',
                            category: category.id,
                            category_name: category.name,
                            post: this.props.match.params.slug2
                          }
                        })
                      }
                    } else {
                      if(debugOnCheck) console.log('is a page!',this.props.match.params.slug1);
                      this.setState(function(){
                        /* PAGE/POST ITEM */
                        return {
                          check: true,
                          home: false,
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
        
        let postTemplate = 1;
        if(this.props.postTemplate){
          postTemplate = this.props.postTemplate;
        }
        let archiveTemplate = 1;
        if(this.props.archiveTemplate){
          archiveTemplate = this.props.archiveTemplate;
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
                            <div>
                            {this.state.type !== 'search' 
                            ?
                                <div className='wpsite-content'>
                                {this.state.type !== 'posts'
                                ?
                                    <div className={'type-'+this.state.type}>
                                    {this.state.post
                                    ?
                                        <WpSitePost ready={this.props.ready} site={this.props.site} type={this.state.type} slug={this.state.post} template={postTemplate}/>
                                    :
                                        <WpSiteArchive ready={this.props.ready} site={this.props.site} type={this.state.type} template={archiveTemplate} />
                                    }
                                    </div>
                                :
                                    <div className='not-typed'>
                                    {this.state.category && !this.state.post
                                    ?
                                        <WpSiteArchive ready={this.props.ready} site={this.props.site} type={this.state.type} category={this.state.category} category_name={this.state.category_name} template={archiveTemplate} />
                                    :
                                        <WpSitePost ready={this.props.ready} site={this.props.site} type={this.state.type} slug={this.state.post} template={postTemplate} />
                                    }
                                    </div>
                                }
                                </div>
                            :
                                <div className='wpsite-content'>
                                    <WpSearchResults ready={this.props.ready} site={this.props.site} template={archiveTemplate} query={this.state.query} />
                                </div>
                            }
                            </div>
                        }
                    </div>
                :
                <div>
                  { !this.props.children &&
                    <Cargando />
                  }
                </div>
                }
                </div>
                <div className='children'>
                  {this.props.children}
                </div>
            </div>
        )
    }
}

export default WpSiteContent;