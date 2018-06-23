var React = require('react');
var WpItem = require('wp/item');
require('./styles.less');

function WpSitePost(props){
  return (
    <section id='site-post' className={props.site+"-"+props.type}>
      <WpItem site={props.site} ready={props.ready} type={props.type} slug={props.slug} img_size='full' debug={false} />
    </section>
  )
}

module.exports = WpSitePost;
