// window.Instagram = {
//     /**
//      * Store application sesttings
//      */
//     config: {},

//     BASE_URL: 'https://api.instagram.com/v1',

//     init: function(opt) {
//         opt = opt || {};

//         this.config.client_id = opt.client_id;
//     },

//     /**
//      * Get a list of popular media.
//      */

//     popular: function(callback) {
//         var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
//         this.getJSON(endpoint, callback);
//     },

//     /**
//      *Get a list of recently tagged media.
//      */

//     tagsByName: function(name) {
//         var endpoint = this.BASE_URL + '/media/popular?client_id=' + this.config.client_id;
//         this.getJSON(endpoint, callback);
//     },

//     getJSON: function(url, callback) {
//         $.ajax({
//             type: 'GET',
//             url: url,
//             dataType: 'jsnop',
//             success: function(response) {
//                 if (typeof callback === 'function') callback(response);
//             }
            

//         });
//     }

// };

// Instagram.init({
//     client_id: '11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f'
// });

// $(document).ready(function() {

//     Instagram.popular(function(response) {
//         var $instagram = $('#instagram');
//         for (var i = 0; i < response.data.length; i++) {
//             image = response.data[i].images.low_resolution.url;
//             $instagram.append('<img src="' + imageUrl + '" />');
//         }
//     });

//     $('#form').on('submit', function(e) {
//         e.preventDefault();

//         var tagName = $('#search').val();
//         Instagram.tagsByName(tagName, function(response) {
//             var $instagram = $('#instagram');
//             $instagram.html('');

//             for (var i = 0; i < response.data.length; i++) {
//                 image = response.data[i].images.low_resolution.url;
//                 $instagram.append('<img src="' + imageUrl + '" />');
//             }
//         });
//     });
// });
