import React from 'react';
import { Link } from 'react-router-dom';
import ItemImage from '../item-image';

class WpNetworkItem extends React.Component {

  render(){
    var objFecha = new Date(this.props.item.post_date);
    var fecha = objFecha.getDate() + '/' + (objFecha.getMonth() + 1) + '/' + objFecha.getFullYear();

    var template = 1;
    if(this.props.template){
      template = this.props.template;
    }

    switch(template) {
      case 1:
          return (
            <article className='novedad'>
                <div className='wrapper'>
                  <header>
                    <div className='fecha'>{fecha}</div>
                    <div className='area'><Link to={this.props.item.blog.blog_url}>{this.props.item.blog.blog_name}</Link></div>
                  </header>
                  <div className='titulo'>
                    <Link to={this.props.item.blog.blog_url+this.props.item.the_term+'/'+this.props.item.post_name}>
                      <h2>{this.props.item.post_title}</h2>
                    </Link></div>
                  {this.props.item.thumbnail ?
                    <ItemImage src={this.props.item.thumbnail} endLoading={this.props.endLoading} render={this.props.imageRender} /> : <div></div>
                  }
                  <div className='resumen'>{this.props.item.post_excerpt}</div>
                  <div style={{'clear':'both'}}></div>
                </div>
          </article>
          )
          case 2:
            return (
              <article className='novedad'>
                  <div className='wrapper'>
                    <header>
                      <div className='fecha'>{fecha}</div>
                      <div className='area'><Link to={this.props.item.blog.blog_url}>{this.props.item.blog.blog_name}</Link></div>
                    </header>
                   {this.props.item.thumbnail ?
                      <ItemImage src={this.props.item.thumbnail} endLoading={this.props.endLoading} render={this.props.imageRender} /> : <div></div>
                    }
                    <div className='titulo'>
                      <Link to={this.props.item.blog.blog_url+this.props.item.the_term+'/'+this.props.item.post_name}>
                        <h2>{this.props.item.post_title}</h2>
                      </Link></div>
                     <div className='resumen'>{this.props.item.post_excerpt}</div>
                    <div style={{'clear':'both'}}></div>
                  </div>
            </article>
          )
          case 3:
            return (
              <article className='novedad'>
                  <div className='wrapper'>
                    <header>
                      <div className='fecha'>{this.props.item.lnk_agenda}</div>
                      <div className='area'><Link to={this.props.item.blog.blog_url}>{this.props.item.blog.blog_name}</Link></div>
                    </header>
                   {this.props.item.thumbnail ?
                      <ItemImage src={this.props.item.thumbnail} endLoading={this.props.endLoading} render={this.props.imageRender} /> : <div></div>
                    }
                    <div className='titulo'>
                      <Link to={this.props.item.blog.blog_url+this.props.item.the_term+'/'+this.props.item.post_name}>
                        <h2>{this.props.item.post_title}</h2>
                      </Link></div>
                    <div style={{'clear':'both'}}></div>
                  </div>
            </article>
          )
            default:
    }
  }
}

export default WpNetworkItem;
