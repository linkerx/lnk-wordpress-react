import React from 'react';
import WpApi from './api';
import MenuItem from './menu-item';
import { NavLink } from 'react-router-dom';

class WpMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      menu: null,
    }
    this.updateItems = this.updateItems.bind(this);
  }

  componentDidMount(){
      this.updateItems();
  }

  updateItems(){
    this.setState(function () {
      return {
        menu: null
      }
    });
    var opts = {
      url: this.props.url,
      site: this.props.site,
      location: this.props.location,
      debug: this.props.debug
    }

    WpApi.getMenuIdByLocation(opts)
      .then(function(menu) {
        this.setState(function () {
          return {
            menu: menu
          }
        });
      }.bind(this));
  }

  render() {

    //console.log(this.state.menu);
    var cls = 'menu';
    if(this.props.cls){
      cls = this.props.cls;
    }

    return (
      <nav className={cls}>
        {!this.state.menu
          ?
            this.props.children
          :
          <ul className='menu'>
          {
            this.state.menu.items.map(function (menuItem, index) {
                return (<MenuItem key={index} site={this.props.site} action={this.props.action} item={menuItem} path={this.props.path} nivel={1} />)
            }.bind(this))
          }
          {
            this.props.extraItems &&
              this.props.extraItems.map(function (item, index) {
                return (
                  <li key={100+index}>
                    <NavLink exact to={item.url} activeClassName="active" >{item.title}</NavLink>
                  </li>)
            })
          }
          </ul>
        }
      </nav>
    )
  }
}

export default WpMenu;
