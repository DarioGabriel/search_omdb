var movies = angular.module('appOmdb', []);

movies.controller('appOmdbCtrl', function($scope, $http, Movies)
{
    $scope.searchmovie = 'no';
    $scope.showloader = "no";
    $scope.search = function()
    {
        $scope.showloader = "yes";
        
        Movies.get(document.getElementById('movie-title').value).success(function(data) {
           console.log(data);
            
            $scope.searchmovie = 'yes';

            $scope.title = data['Title'];
            $scope.runtime = data['Runtime'];
            $scope.plot = data['Plot'];
            $scope.poster = data['Poster'];
            $scope.response = data['Response'];   

            if(data['Response'] == 'False')
            {   
                $scope.error = data['Error'];
            }
            
            $scope.showloader = "no";
       }); 
    }
});

movies.factory('Movies', function($http) {
    return {
        get: function(title) {
            return $http({
                url: "http://www.omdbapi.com?t="+title+"&y=&plot=full&r=json",
                method: "GET"
            }); 
        }
    }
});