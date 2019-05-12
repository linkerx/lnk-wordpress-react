import React from 'react';
import MenuItem from './menu-item';

class SubMenu extends React.Component{

  render(){
    return (
      <ul className='submenu'>
      { this.props.items &&
        this.props.items.map(function(item,index){
          return(<MenuItem key={index} item={item} path={this.props.path} nivel={this.props.nivel} action={this.props.action} />);
        }.bind(this))
      }
      </ul>
    )
  }
}

export default SubMenu;
