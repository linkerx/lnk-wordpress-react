var React = require('react');
var WpApi = require('./api');
var ListItem = require('./list-item');

class WpSlider extends React.Component {

    constructor(props) {
    super(props);

    var options = {};
    if(props.options)
      options = props.options;

    this.state = {
      options: this.prepareOptions(options),
      items: null,
      current: null,
      timer: null,
    }
    this.updateItems = this.updateItems.bind(this);
    this.show = this.show.bind(this);
    this.start = this.start.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.backPage = this.backPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.validPage = this.validPage.bind(this);
    this.isActive = this.isActive.bind(this);
    this.getPageItems = this.getPageItems.bind(this);
  }

  prepareOptions(userOptions){

    var options = {
      autoListCount: true,
      listCount: 0,
      listImgSize: 'thumbnail',
      pageCount: 1,
      pageImgSize: 'large',
      time: 5000,
    }

    if(userOptions.autoListCount) {options.autoListCount = userOptions.autoListCount;}
    if(userOptions.listCount) {options.listCount = userOptions.listCount;}
    if(userOptions.listImgSize) {options.listImgSize = userOptions.listImgSize;}
    if(userOptions.pageCount) {options.pageCount = userOptions.pageCount;}
    if(userOptions.pageImgSize) {options.pageImgSize = userOptions.pageImgSize;}
    if(userOptions.time) {options.time = userOptions.time;}

    return options;
  }

  componentDidMount(){
      this.updateItems();
  }

  updateItems(){
    this.setState(function () {
      return {
        options: this.state.options,
        items: null,
        current:null,
        timer:null
      }
    });

    var opts = {
      url: this.props.url,
      type: this.props.type,
      queries: this.props.queries,
      debug: this.props.debug
    }

    WpApi.getList(opts)
      .then(function(items) {

        if(this.state.options.autoListCount)
          this.state.options.listCount = items.length;

        if(items.length >= this.state.options.listCount) {

          this.setState(function () {
            return {
              options: this.state.options,
              items: items.slice(0,this.state.options.listCount),
              current: null,
              timer: setTimeout(function(){this.start()}.bind(this),0)
            }
          }.bind(this));
        } else {
          console.log("Error: no hay suficientes items");
        }
      }.bind(this));
  }

  validPage(page){
    var valid = false;
    if (page > 0) {
      if (((page-1) * this.state.options.pageCount) < this.state.options.listCount)
        valid = true;
    }
    return valid;
  }

  getPageItems(page){
    if(this.validPage(page)){
      var first = (page-1) * this.state.options.pageCount;
      var last = first + this.state.options.pageCount;
      return this.state.items.slice(first,last);
    }
    return [];
  }

  isActive(id) {
    if(this.state.current){
      return this.state.current.items.find(function(item) {
          return item.id == id;
      })
    }
    return false;
  }

  show(page){
    this.setState(function() {
      return {
        options: this.state.options,
        items: this.state.items,
        current: {
          items: this.getPageItems(page),
          page: page
        }
      }
    }.bind(this));
  }

  start(){
    this.show(1);
    timer: setTimeout(function(){this.next()}.bind(this),10000);
  }

  next(){
    var page = this.nextPage();
    this.show(page);
    timer: setTimeout(function(){this.next()}.bind(this),10000);
  }

  back(){
    var page = this.backPage();
    this.show(page);
    timer: setTimeout(function(){this.next()}.bind(this),10000);
  }


  lastPage(){
    var response = Math.floor(this.state.options.listCount / this.state.options.pageCount);
    if(((this.state.options.listCount / this.state.options.pageCount) - response) == 0) {
      return response;
    } else {
      return response + 1;
    }
  }

  nextPage(){
    if(this.state.current.page == this.lastPage()) {
      return 1;
    } else {
      return this.state.current.page + 1;
    }
  }

  backPage(){
    if(this.state.current.page == 1) {
      return this.lastPage();
    } else {
      return this.state.current.page - 1;
    }
  }

  render() {
    return (
      <div className="slider">
        {this.props.list &&
          <div className='list'>
          {!this.state.items
            ?
            this.props.children
            :
            this.state.items.map(function (item, index) {
              var active = false;
              if(this.isActive(item.id)){
                active = true;
              }
              return (<ListItem key={item.id} item={item} debug={this.props.debug} active={active} imageRender='back' imageSize={this.state.options.listImgSize} />)
            }.bind(this))
          }
          </div>
        }

        <div className='page'>
          {!this.state.current
            ?
            this.props.children
            :
            this.state.current.items.map(function (item, index) {
              return (<ListItem key={item.id} item={item} debug={this.props.debug} active={true} imageRender='back' imageSize={this.state.options.pageImgSize} />)
            }.bind(this))
          }
        </div>
        <div className='navigation'>
          <div className='pages'>
          {
            Array.apply(null,{length: this.lastPage()}).map(Number.call,Number).map(function(item, index){
              var activeClass = 'inactive';
              if(this.state.current && this.state.current.page == item+1){
                activeClass = 'active';
              }

              return (<div key={index} className={["page-"+(item+1),activeClass].join(' ')} >{item+1}</div>)
            }.bind(this))
          }
          </div>

        </div>
      </div>
    )
  }
}

module.exports = WpSlider;
