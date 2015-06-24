var FlickrController = angular.module('FlickrController', ['ngRoute']);

FlickrController.config(function($httpProvider){
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

FlickrController.controller('FlickrLoader', ['$scope', '$http', 
	function($scope, $http) {
		var apiKey = 'a879111332f525a4f6402cf59f39a8c2',
		apiSecret = 'ab414cafd8923ff8';
		$scope.updateImages = function(filter) {
			$http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json&callback=jsonFlickrFeed&api_key=' + apiKey + '&tags=' + filter).success(function(data){});
		}
		jsonFlickrFeed = function(data) {
			for(var key in data.items) {
				if(data.items.hasOwnProperty(key)) {
					var author = data.items[key].author
					data.items[key].author = author.substring(author.indexOf('(') + 1, author.length - 1);
				}
			}
			$scope.flickrJson = data;
		}
		$scope.filterImages = function(model) {
			var tagsArray = $scope.flickrSearch.split(', ');
			for(var i = 0; i < tagsArray.length; i++) {
				tagsArray[i] = tagsArray[i].split(' ').join(', ');
			}
			$scope.flickrSearch = tagsArray.join(', ');
			$scope.updateImages($scope.flickrSearch);
		}
		$scope.updateImages();
	}
]);