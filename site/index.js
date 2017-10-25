var React = require('react');
var ReactRouter = require('react-router-dom');
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var WpApi = require('wp/api');
var WpSiteArchive = require('./archive');
var WpSitePost = require('./post');
var WpItem = require('wp/item');
var Cargando = require('utils/cargando');

class WpSite extends React.Component {

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
    if(nextProps.location.pathname != this.props.location.pathname) {
      this.checkURL();
    }
  }

  checkURL(){
    var debugOnCheck = true;

    this.setState(function(){
      return {
        site: this.state.site,
        check: false,
        lvl: 0,
        type: null,
        category: null,
        post: null
      }
    });

    var opts_type = {
      site: this.state.site,
      type: this.props.match.params.slug1,
      debug: false
    };

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
            site: this.state.site,
            type: 'post',
            term: this.props.match.params.slug1,
            debug: true
          };
          if(debugOnCheck) console.log('searching for post category... ',this.props.match.params.slug1);
          WpApi.getCategory(opts_term)
            .then(function(category){
              if(category){
                if(debugOnCheck) console.log('category OK');
                if(this.props.match.params.slug2 === 'undefined'){
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

  render() {

    console.log(this.state);

    return(
      <section id='wpsite-route'>
          {this.state.check
            ?
              <div className='wpsite-content'>
              {this.state.type != 'posts'
              ?
                <div className={'type-'+this.state.type}>
                {this.state.post
                  ?
                    <WpSitePost site={this.state.site} type={this.state.type} slug={this.state.post} />
                  :
                    <WpSiteArchive site={this.state.site} type={this.state.type} />
                }
                </div>
              :
                <div className='not-typed'>
                {this.state.category
                  ?
                    <WpSiteArchive site={this.state.site} type={this.state.type} category={this.state.category} category_name={this.state.category_name} />
                  :
                    <WpSitePost site={this.state.site} type={this.state.type} slug={this.state.post} />
                }
                </div>
            }
            </div>
          :
            <Cargando />
        }
      </section>
    )
  }
}

module.exports = WpSite;
