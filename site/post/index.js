import React from 'react';
import WpItem from '../../item';
import './styles.less';

function WpSitePost(props){
  return (
    <section id='site-post' className={props.type}>
      <WpItem type={props.type} slug={props.slug} debug={false} />
    </section>
  )
}

export default WpSitePost;
