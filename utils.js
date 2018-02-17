
module.exports = {
    generateItemLinkUrl: function(item){
        var site = "";
        var type = "";
        var cat = "";
        var slug = "";

        if(item.blog_data){
            site = item.blog_data.path.slice(1,-1)+"/";
        }

        if(item.type == 'post') {
          if(item._embedded && item._embedded['wp:term']){
            if(item._embedded['wp:term'][0][0].taxonomy == 'category')
              cat = item._embedded['wp:term'][0][0].slug+"/";
          }
        } else {
          type = item.type+"/";
        }

        slug = item.slug;

        return "/"+site+type+cat+slug;


    },
    generateCatLinkUrl: function(cat){

    }
}
