import React from 'react';
import MenuItem from './menu-item';

class SubMenu extends React.Component{

  render(){

    var submenuClass = 'submenu closed';
    if (typeof(this.props.submenuClass) !== 'undefined') {
      submenuClass = this.props.submenuClass;
    }

    var showIcon = true;
    if (typeof(this.props.showIcon) !== 'undefined') {
      showIcon = this.props.showIcon;
    }

    return (
      <ul className={submenuClass}>
      { this.props.items &&
        this.props.items.map(function(item,index){
          return(<MenuItem site={this.props.site} key={index} item={item} path={this.props.path} nivel={this.props.nivel} action={this.props.action} />);
        }.bind(this))
      }
      { this.props.showIcon &&
        <i className="fas fa-plus"></i>
      }
      </ul>
    )
  }
}

export default SubMenu;
