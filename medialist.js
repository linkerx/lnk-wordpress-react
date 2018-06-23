var React = require('react');
var WpApi = require('./api');
var ListImage = require('./list-item');
var ItemImage = require('./item-image')

class WpMediaList extends React.Component {

  constructor(props) {
    super();
    this.state = {
      items: null,
      size: props.size,
      render: props.render
    }
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount(){
      this.updateItems();
  }

  updateItems(){
    this.setState(function () {
      return {
        items: null,
        size: this.state.size,
        render: this.state.render
      }
    });

    var opts = {
      url: this.props.url,
      type: 'media',
      queries: this.props.queries,
      debug: true
    }

    WpApi.getList(opts)
      .then(function(items) {
        this.setState(function () {
          return {
            items: items,
            size: this.state.size,
            render: this.state.render
          }
        });
      }.bind(this));
  }

  render() {
    return (
      <ul className="list">
        {!this.state.items
          ?
          this.props.children
          :
          this.state.items.map(function (item, index) {
            var img_src = item.media_details.sizes[this.state.size].source_url;
            return (
              <li key={index}>
                <ItemImage src={img_src} title={item.title.rendered} alt={item.alt_text} render={this.state.render} />
              </li>
            )
          }.bind(this))
        }
      </ul>
    )
  }
}

// TODO: propTypes

module.exports = WpMediaList;
