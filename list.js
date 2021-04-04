import React from 'react';
import WpApi from './api';
import Pagination from './pagination';
import ListItem from './list-item';

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

  componentDidUpdate(prevProps) {
    if(this.props.debug) {
      console.log('props wpList: ', JSON.stringify(this.props.queries))
      console.log('prevProps wpList: ', JSON.stringify(prevProps.queries));
    }

    if (JSON.stringify(this.props.queries) !== JSON.stringify(prevProps.queries)) {
      this.updateItems(1);
    }
  } 

  updateItems(currentPage){

    if(this.props.debug) {
      console.log('wpList actualizando...');
    }

    this.setState(function () {
      return {
        items: null,
        totalItems: null,
        totalPages: null,
        page: this.state.page
      }
    });

    var queries = ['_embed'];
    if(typeof(this.props.queries) !== 'undefined'){
      queries = queries.concat(this.props.queries);
    }
    if(this.props.debug) {
      console.log("QUERIES:",queries);
    }

    var itemsPerPage = 12;
    if(this.props.itemsPerPage){
      itemsPerPage = this.props.itemsPerPage;
    }
    queries = queries.concat(['per_page='+itemsPerPage,'page='+currentPage]);

    var type = 'posts';
    if(typeof(this.props.type) !== 'undefined') {
      type = this.props.type;
    }

    var opts = {
      url: this.props.url,
      site: this.props.site,
      type: type,
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
    if(this.props.debug){
      console.log(data.selected);
    }
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

    var videoAsFeaturedImage = false;
    if(typeof(this.props.videoAsFeaturedImage) !== 'undefined') {
      videoAsFeaturedImage = this.props.videoAsFeaturedImage;
    }

    var showFeaturedAudio = false;
    if(typeof(this.props.showFeaturedAudio) !== 'undefined') {
      showFeaturedAudio = this.props.showFeaturedAudio;
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

    if(this.props.debug){
      console.log(this.state.items,this.state.totalItems,this.state.totalPages,this.state.page-1,this.handlePaginationClick);
    }

    return (
      <div className="list-container">
        {!this.state.items
          ?
          this.props.children
          :
          <div>
            {showPagination &&
              <div className="list-pagination list-pagination-top">
                <Pagination totalItems={this.state.totalItems} totalPages={this.state.totalPages} currentPage={this.state.page-1} itemsPerPage={itemsPerPage} handleClick={this.handlePaginationClick}  />
              </div>
            }

            <div className='list'>
              {
                this.state.items.map(function (item, index) {
                  return (<ListItem key={item.id} item={item} imageRender={imageRender} imageSize={imageSize} defaultImg={defaultImg} imageLink={imageLink} template={template} heading={heading} site={this.props.site} videoAsFeaturedImage={videoAsFeaturedImage} showFeaturedAudio = {showFeaturedAudio}/>)
                }.bind(this))
              }
            </div>

            {showPagination &&
              <div className="list-pagination list-pagination-bottom">
                <Pagination totalItems={this.state.totalItems} totalPages={this.state.totalPages} currentPage={this.state.page-1} itemsPerPage={itemsPerPage} handleClick={this.handlePaginationClick} />
              </div>
            }
          </div>
        }
      </div>
    )
  }
}

export default WpList;
