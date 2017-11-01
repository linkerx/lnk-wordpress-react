var axios = require('axios');

/**
 * Api Variables
 */
var WpUrl = lnk_api_host;
var WpApiDir = lnk_api_dir;

var WpRoute = '/wp/v2';
var LnkRoute = '/lnk/v1';
var MenuRoute = '/wp-api-menus/v2';
var CF7Route = '/contact-form-7/v1'

var LnkSitesEndpoint = '/sites';
var LnkSitesPostsEndpoint = '/sites-posts';
var MenuLocationsEndpoint = '/menu-locations';
var MenusEndpoint = '/menus';
var ContactFormEndpoint = '/contact-forms';

var AddQuery = '?_embed';

module.exports = {
  /**
   * Lista de Posts
   */
  getList: function(options){

    var url = WpUrl

    if(options.url)
      url = options.url;
    if(options.site)
      url += '/'+options.site;

    url += WpApiDir + WpRoute + '/';

    if(options.debug)
      console.log('getList InitialUrl: '+url);

    return this.getTypes(url)
       .then(function(types){

          if(options.debug){
            console.log('type: ',options.type);
            console.log('allTypes:',types);
          }

          var found = Object.keys(types).indexOf(options.type);
          if(found == -1){
            var found = Object.keys(types).indexOf(options.type.slice(0,-1));
          }

          if(options.type == 'media') {
            found = 1;
          }

          if(found != -1) {
            url += options.type;
          } else {
            url += 'posts/';

            if(!options.queries) {
              options.queries = [];
            }

            options.queries.push('filter[cat]='+options.type);
          }

          if(options.queries){
            url += '?' + options.queries.map(function(query,index) {
              return (query)
            }).join('&');
          }

          if(options.debug)
            console.log('getList finalUrl: '+url);

          return axios.get(url)
            .then(function (response) {
              return response.data;
            });
      }.bind(this));
  },

  /**
   * Un Item en particular
   */
  getItem: function(options){

    var url = WpUrl

    if(options.url)
      url = options.url;
    if(options.site)
      url += '/'+options.site;



    if(options.debug){
      console.log(url,options);
    }
    /**
     * si type es un tipo de dato va enla url,
     * sino busca solo el slug
     */

    return this.getTypes(url)
       .then(function(types){
          var url = WpUrl + WpApiDir + WpRoute + '/';
          var found = Object.keys(types).indexOf(options.type);
          if(found == -1){
            found = Object.keys(types).indexOf(options.type.slice(0,-1));
          }

          if(options.type == 'media') {
            found = 1;
          }

          /**
            POST & PAGES
           */
           if(options.type == 'page') {
             options.type = 'pages';
           }
           if(options.type == 'post') {
             options.type = 'posts';
           }

          if(found != -1) {
            url += options.type;
          } else {
            url += 'posts';
          }

          if(options.id){
            url += '/'+options.id+'/?opt=1'
          }

          if(options.slug){
            url += '/?slug=' + options.slug;
          }

          if(options.queries){
              url += '&' + options.queries.map(function(query,index) {
                return (query)
              }).join('&');
          }

          if(options.debug){
            console.log(url);
          }

          return axios.get(url)
            .then(function (response) {
              return response.data;
            });

      });
  },

  /* lista de tipos */
  getTypes: function(options){
    var url = WpUrl

    if(options.url)
      url = options.url;
    if(options.site)
      url += '/'+options.site;

    url += WpApiDir + WpRoute + '/types';

    return axios.get(url)
      .then(function (response){
        return response.data;
      });
  },

  /* obtiene un tipo */
  getType: function(options){
    var url = WpUrl;
    if(options.url)
      url = options.url;

    return this.getTypes(url)
      .then(function(types){
         var found = Object.keys(types).indexOf(options.type);
         if(found == -1){
           found = Object.keys(types).indexOf(options.type.slice(0,-1));
           options.type = options.type.slice(0,-1)
         }

         if(options.type == 'media') {
           found = 1;
         }

         if(found != -1) {
           return options.type;
         } else {
           return false;
         }
      })
  },

  /* lista de tipos */
  getCategories: function(options){
    var url = WpUrl

    if(options.url)
      url = options.url;

    if(options.site)
      url += '/'+options.site;

    url += WpApiDir + WpRoute + '/categories?per_page=100';

    if(options.debug)
      console.log(url);

    return axios.get(url)
      .then(function (response){
        return response.data;
      });
  },


  getCategory: function(options){
      return this.getCategories(options)
        .then(function(terms){
          return terms.find(function(item){
            return item.slug === options.term
          });
        });
  },

  getTerm: function(){
    return false;
  },

  /**
   * Menu por Posicion
   */
  getMenuItemsByLocation: function(options){

    var url = WpUrl
    if(options.url)
      url = options.url;

    url += WpApiDir + MenuRoute + MenuLocationsEndpoint + '/' + options.location;

    if(options.debug){
      console.log(url);
    }

    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  /**
   * Menu ID por Posicion
   */
   getMenuIdByLocation: function(options){

     var url = WpUrl;
     var url2 = WpUrl;
     if(options.url){
       url = options.url;
       url2 = options.url;
     }

     url += WpApiDir + MenuRoute + MenuLocationsEndpoint;
     url2 += WpApiDir + MenuRoute + MenusEndpoint;

     if(options.debug){
       console.log(url);
     }

     return axios.get(url)
       .then(function(response){
         if(response.data[options.location]) {
           var url3 = url2 + '/' + response.data[options.location].ID;
           return axios.get(url3)
            .then(function(response){
              return response.data;
            });
         }
       });
   },

  /**
   * Sitio unico
   */
  getSite: function(options){
    var url = WpUrl + WpApiDir + LnkRoute + LnkSitesEndpoint + '/' + options.name;
    if(options.debug){
      console.log(url);
    }
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  /**
   * Lista de Sitios de la Red (Wordpress Multisite)
   */
  getSitesList: function(){
    var url = WpUrl + WpApiDir + LnkRoute + LnkSitesEndpoint;
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

  /**
   * Lista de Post de todos los Sitios
   */
  getSitesPosts: function(){
    var url = WpUrl + WpApiDir + LnkRoute + LnkSitesPostsEndpoint
    return axios.get(url)
      .then(function(response){
        return response.data;
      });
  },

   /**
    * Postear en un formulario de Contact Form 7
    */
   postContactForm: function(form,data,options){
     var url = WpUrl + WpApiDir + CF7Route + ContactFormEndpoint + '/' +form + '/feedback';

     if(options.debug){
       console.log(url);
     }

     var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
     return axios.post(url,data,headers)
      .then(function(response){
        return response.data;
      });
   }
}
