import React from 'react';
import WpList from '../../../list';
import './styles.scss';

function WpSearchResults(props){

  var site = "/";
  if(props.site){
    site = props.site;
  }

  //console.log(props);

  var queries = [
    '_embed',
  ].concat(props.queries);

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

  var page = 1;
  if(props.page){
    page = props.page;
  }

  return (
    <section id='search-results' className={props.type}>
      <h1>{archiveName}</h1>
      <WpList
        site={site}
        type='posts'
        ready={props.ready}
        heading={heading}
        queries={queries}
        debug={false}
        imageRender={imageRender}
        imageSize={imageSize}
        imageLink={true}
        showPagination={true}
        itemsPerPage={12}
        page={page}
      />
    </section>
  )
}

export default WpSearchResults;
