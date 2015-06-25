var FlickrController = angular.module('FlickrController', []);

FlickrController.controller('FlickrLoader', ['$scope', '$http', '$log',
	function($scope, $http, $log) {
		var apiKey = 'a879111332f525a4f6402cf59f39a8c2';
		$scope.updateImages = function(filter) {
			if(typeof(Storage) !== "undefined") {
				filter = sessionStorage.queryTerm;
				$scope.flickrSearch = sessionStorage.queryTerm;
			}
			$log.log(sessionStorage);
			$http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json&callback=jsonFlickrFeed&api_key=' + apiKey + '&tags=' + filter).success(function(data){});
		};
		jsonFlickrFeed = function(data) {
			for(var key in data.items) {
				if(data.items.hasOwnProperty(key)) {
					var author = data.items[key].author
					data.items[key].author = author.substring(author.indexOf('(') + 1, author.length - 1);
				}
			}
			$scope.flickrJson = data;
		};
		$scope.filterImages = function(model) {
			var tagsArray = $scope.flickrSearch.split(', ');
			for(var i = 0; i < tagsArray.length; i++) {
				tagsArray[i] = tagsArray[i].split(' ').join(', ');
			}
			$scope.flickrSearch = tagsArray.join(', ');
			if(typeof(Storage) !== "undefined") {
				sessionStorage.queryTerm = $scope.flickrSearch;
			}
			$scope.updateImages($scope.flickrSearch);
		};
		$scope.updateImages();
	}
]);