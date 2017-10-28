var React = require('react');
var WpList = require('wp/list');
require('./styles.less');

function WpSiteArchive(props){

  var site = "/";
  if(props.site){
    site = '/'+props.site;
  }

  console.log(props);

  var queries = [
    '_embed'
  ];

  if(props.category){
      queries.push('categories='+props.category)
  }

  var archiveName = props.type+'s';

  if(props.type == 'posts'){
    archiveName = 'sarasa';
    if(props.category){
      archiveName = props.category_name;
    }
  }

  var imageRender = 'back';
  if(props.imageRender){
    imageRender = props.imageRender;
  }

  var imageSize = 'thumbnail';
  if(props.imageSize){
    imageSize = props.imageSize;
  }

  var heading = 2;
  if(props.heading){
    heading = props.heading;
  }

  return (
    <section id='site-archive' className={props.type}>
      <h1>{archiveName}</h1>
      <WpList site={props.site} type={props.type} ready={props.ready} queries={queries} debug={true} imageRender={imageRender} imageSize={imageSize} heading={2} />
    </section>
  )
}

module.exports = WpSiteArchive;
