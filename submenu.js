var React = require('react');
var MenuItem = require('./menu-item');

class SubMenu extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <ul className='submenu'>
      { this.props.items &&
        this.props.items.map(function(item,index){
          return(<MenuItem key={index} item={item} path={this.props.path} nivel={this.props.nivel} />);
        }.bind(this))
      }
      </ul>
    )
  }
}

module.exports = SubMenu;
