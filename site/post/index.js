var React = require('react');
var WpItem = require('wp/item');
require('./styles.less');

function WpSitePost(props){
  return (
    <section id='site-post' className={props.type}>
      <WpItem ready={props.ready} type={props.type} slug={props.slug} debug={false} />
    </section>
  )
}

module.exports = WpSitePost;
