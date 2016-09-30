angular.module('itunes').service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your methods you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
  this.makeRequest = function(artist) {
    var deferred = $q.defer();
    $http.jsonp('https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK')
    .then(function(result) {
    var musicData = result.data.results;
    var passedData = [];
    musicData.forEach(function(songData) {
      var songObject = {
        AlbumArt: songData.artworkUrl100,
        Artist: songData.artistName,
        Collection: songData.collectionName,
        CollectionPrice: songData.collectionPrice,
        Play: songData.previewUrl,
        Type: songData.trackName
      };
    passedData.push(songObject);

    });
    deferred.resolve(passedData);
    // console.log(result);
  });
  return deferred.promise;
};
});
