var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var ItemImage = require('./item-image');

class MenuItem extends React.Component{

  constructor(props) {
    super(props)
  }

  render(){
    var site = this.props.path
    var item_link = '/';
    var item_text = this.props.item.title;
    var item_target = '_self';
    var click_action = null;
    if(this.props.action){
    click_action = this.props.action;
    }

    if(this.props.item.target != ""){
      item_target = this.props.item.target;
    }

    if(this.props.item.type == "custom"){
      item_link = this.props.item.url;
    } else if(this.props.item.type == "post_type") {
        if(this.props.item.object == "page") {
          item_link = site + 'pages/' + this.props.item.object_slug;
        } else if(this.props.item.object == "post") {
          item_link = site + 'posts/' + this.props.item.object_slug;
        }
    } else if(this.props.item.type == "taxonomy") {
      item_link = site + this.props.item.object_slug;
    }

    var showSubmenu = true;
    if(this.props.showSubmenu !== undefined && !this.props.showSubmenu){
      showSubmenu = false;
    }

    var nivel = 1;
    if(this.props.nivel)
      nivel = this.props.nivel;

    return(
      <li key={this.props.item.id} className={this.props.item.classes+" nivel-"+this.props.nivel}>
        <NavLink exact to={item_link} activeClassName="active" onClick={click_action}>
          {this.props.item.thumbnail_id &&
            <ItemImage src={this.props.item.thumbnail_url} title={item_text} alt={item_text} render='img' cls='image_container thumb' />
          }
          {this.props.item.thumbnail_hover_id &&
            <ItemImage src={this.props.item.thumbnail_hover_url} title={item_text} alt={item_text} render='img' cls='image_container thumb_hover' />
          }
          <span>{item_text}</span>
        </NavLink>
        { this.props.item.children && showSubmenu &&
          <SubMenu items={this.props.item.children} path={this.props.item.path} nivel={this.props.nivel+1} />
        }
      </li>
    )
  }
}

module.exports=MenuItem;

var SubMenu = require('./submenu');
