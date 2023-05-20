
module.exports = {
    generateItemLinkUrl: function(item,the_site){
        
        var site = "";
        var type = "";
        var cat = "";
        var slug = "";

        if(typeof(the_site) !== 'undefined' && the_site !== '/') {
          site = the_site+"/";
        } else if(item.blog_data) {
          site = item.blog_data.path.slice(1,-1)+"/";
        }

        //console.log('SITE GENERADO:',site)

        if(item.type === 'post') {
          if(item._embedded && item._embedded['wp:term']){
            if(item._embedded['wp:term'][0][0].taxonomy === 'category')
              cat = item._embedded['wp:term'][0][0].slug+"/";
          }
        } else {
          type = item.type+"/";
        }

        slug = item.slug;

        var url = "/"+site+type+cat+slug;

        //console.log('URL GENERADO:',url)

        return url
    },
    generateGetPostUrl: function(item){
      var type = "";
      var cat = "";
      var slug = "";
      var site = "";

      if(item.blog){
          site = item.blog.blog_url.slice(1,-1)+"/";
      }

      if(item.post_type === 'post') {
        cat = item.the_term+"/";
      } else {
        type = item.post_type+"/";
      }

      slug = item.post_name;

      var url = site+type+cat+slug;

      //console.log("LINK FEATURED CREATED: ",url);

      return url;

    },
    generateCatLinkUrl: function(cat){

    }
}
