import React from 'react';
import { NavLink } from 'react-router-dom';
import ItemImage from './item-image';
import SubMenu from './submenu';

class MenuItem extends React.Component{

  isExternal(url){
    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
    return r.test(url);
  }

  render(){
    var site = "/";
    if(this.props.site){
      site += this.props.site+"/";
    }

    //console.log(this.props.item);

    var item_link = '/';
    var item_text = this.props.item.title;
    var item_target = '_self';
    var click_action = null;
    if(this.props.action){
      click_action = this.props.action;
    }

    if(this.props.item.target !== ""){
      item_target = this.props.item.target;
    }

    if(this.props.item.type === "custom"){
      if(this.props.item.url === "#") {
        item_link = "javascript:void(0)";
      } else {
        item_link = this.props.item.url;
      }
    } else if(this.props.item.type === "post_type") {
        if(this.props.item.object === "page" || this.props.item.object === "pages") {
          item_link = site + this.props.item.object_slug;
        } else if(this.props.item.object === "post") {
          item_link = site + this.props.item.object_term + '/' + this.props.item.object_slug;
        }
    } else if(this.props.item.type === "taxonomy") {
      item_link = site + this.props.item.object_slug;
    }

    if(this.props.debug){
        console.log(item_link);
    }

    var showSubmenu = true;
    if(typeof(this.props.showSubmenu) !== undefined && !this.props.showSubmenu){
      showSubmenu = false;
    }

    var nivel = 1;
    if(this.props.nivel)
      nivel = this.props.nivel;

    var is_external = false;
    if((this.props.item.type === "custom" && this.isExternal(item_link)) || this.props.item.url === "#"){
      is_external = true;
    }

    var classes = this.props.item.classes;
    if (typeof(this.props.activeSubmenu) && this.props.activeSubmenu){
      classes = classes+' '+this.props.activeSubmenuClass;
    }

    return(
      <li key={this.props.item.id} className={classes+" nivel-"+this.props.nivel}>
      {is_external
        ?
        <a href={item_link} onClick={click_action} target={item_target}>
          {this.props.item.thumbnail_id &&
            <ItemImage src={this.props.item.thumbnail_url} title={item_text} alt={item_text} render='img' cls='image_container thumb' />
          }
          {this.props.item.thumbnail_hover_id &&
            <ItemImage src={this.props.item.thumbnail_hover_url} title={item_text} alt={item_text} render='img' cls='image_container thumb_hover' />
          }
          <span>{item_text}</span>
        </a>
        :
        <NavLink exact to={item_link} activeClassName="active" onClick={click_action}>
          {this.props.item.thumbnail_id &&
            <ItemImage src={this.props.item.thumbnail_url} title={item_text} alt={item_text} render='img' cls='image_container thumb' />
          }
          {this.props.item.thumbnail_hover_id &&
            <ItemImage src={this.props.item.thumbnail_hover_url} title={item_text} alt={item_text} render='img' cls='image_container thumb_hover' />
          }
          <span>{item_text}</span>
        </NavLink>
      }
        { this.props.item.children && showSubmenu &&
          <SubMenu site={this.props.site} items={this.props.item.children} action={click_action} path={this.props.path} nivel={nivel+1} />
        }
      </li>
    )
  }
}

export default MenuItem;
