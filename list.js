var React = require('react');
var WpApi = require('./api');
var ListItem = require('./list-item');

class WpList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: null,
    }
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount(){
      this.updateItems();
  }

  updateItems(){
    this.setState(function () {
      return {
        items: null
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
        this.setState(function () {
          return {
            items: items
          }
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="list">
        {!this.state.items
          ?
          this.props.children
          :
          this.state.items.map(function (item, index) {
            return (<ListItem key={item.id} item={item} />)
          })
        }
      </div>
    )
  }
}

// TODO: propTypes

module.exports = WpList;
