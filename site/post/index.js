import React from 'react';
import WpItem from '../../item';
import './styles.less';

function WpSitePost(props){
  return (
    <section id='site-post' className={props.site+"-"+props.type}>
      <WpItem site={props.site} ready={props.ready} type={props.type} slug={props.slug} img_size='full' debug={false} />
    </section>
  )
}

export default WpSitePost;
