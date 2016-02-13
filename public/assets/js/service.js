myModuleName.factory('api', function($http) {
    return {
        getResumeJson: function(onSuccess, onError){
            $http.get('../resume.json').then(onSuccess, onError);
        }
    }
});