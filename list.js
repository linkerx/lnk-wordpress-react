var React = require('react');
var WpApi = require('./api');
var Pagination = require('./pagination');
var ListItem = require('./list-item');

class WpList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
      totalItems: null,
      totalPages: null,
      page: 1,
    }
    this.updateItems = this.updateItems.bind(this);
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentDidMount(){

    var currentPage = 1;
    if(this.props.currentPage){
      currentPage = this.props.currentPage;
    }

    this.updateItems(currentPage);
  }

  updateItems(currentPage){
    this.setState(function () {
      return {
        items: null,
        totalItems: null,
        totalPages: null,
        page: this.state.page
      }
    });

    var queries = ['_embed'];
    if(this.props.queries){
      queries = this.props.queries
    }

    if(typeof this.props.queries == 'undefined') {
      var itemsPerPage = 12;
      if(this.props.itemsPerPage){
        itemsPerPage = this.props.itemsPerPage;
      }
      queries.push('per_page='+itemsPerPage);
    }
    queries.push('page='+currentPage);

    var opts = {
      url: this.props.url,
      site: this.props.site,
      type: this.props.type,
      queries: queries,
      debug: this.props.debug
    }

    WpApi.getList(opts)
      .then(function(response) {

        var items = response.data;
        var total = response.headers["x-wp-total"];
        var pages = response.headers["x-wp-totalpages"];

        if(this.props.ready){
          setTimeout(function(){this.props.ready()}.bind(this), 1000);
        }
        if(this.props.debug)
          console.log("trae lista:",items);
        this.setState(function () {
          return {
            items: items,
            totalItems: total,
            totalPages: pages,
            page: currentPage
          }
        });
      }.bind(this));
  }

  handlePaginationClick(data){
    console.log(data.selected);
    this.updateItems(data.selected + 1)
  }

  render() {

    if(this.props.debug){
      console.log(this.state.items);
    }

    var template = 1
    if(this.props.template){
        template = this.props.template;
    }

    var imageRender = 'img';
    if(this.props.imageRender){
      imageRender = this.props.imageRender;
    }

    var imageSize = 'thumbnail';
    if(this.props.imageSize){
      imageSize = this.props.imageSize;
    }

    var imageLink = false;
    if(this.props.imageLink){
      imageLink = this.props.imageLink;
    }

    var defaultImg = null;
    if(this.props.defaultImg){
      defaultImg = this.props.defaultImg;
    }

    var heading = 2;
    if(this.props.heading){
      heading = this.props.heading;
    }

    var showPagination = false
    if(this.props.showPagination){
      showPagination = this.props.showPagination;
    }

    var itemsPerPage = 12;
    if(this.props.itemsPerPage){
      itemsPerPage = this.props.itemsPerPage;
    }

    console.log(this.state.items,this.state.totalItems,this.state.totalPages,this.state.page-1,this.handlePaginationClick);

    return (
      <div className="list-container">
        {!this.state.items
          ?
          this.props.children
          :
          <div>
            {showPagination &&
              <div className="list-pagination-top">
                <Pagination totalItems={this.state.totalItems} totalPages={this.state.totalPages} currentPage={this.state.page-1} itemsPerPage={itemsPerPage} handleClick={this.handlePaginationClick}  />
              </div>
            }

            <div className='list'>
              {
                this.state.items.map(function (item, index) {
                  return (<ListItem key={item.id} item={item} imageRender={imageRender} imageSize={imageSize} defaultImg={defaultImg} imageLink={imageLink} template={template}  />)
                })
              }
            </div>

            {showPagination &&
              <div className="list-pagination-bottom">
                <Pagination totalItems={this.state.totalItems} totalPages={this.state.totalPages} currentPage={this.state.page-1} itemsPerPage={itemsPerPage} handleClick={this.handlePaginationClick} />
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

module.exports = WpList;
