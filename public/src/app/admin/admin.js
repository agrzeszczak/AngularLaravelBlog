angular.module( 'ngBoilerplate.admin', [
  'ui.state',
  'placeholders',
  'ui.bootstrap',
  'titleService'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin/articles/:id/:method', {
    url: '/admin/articles/:id/:method',
    views: {
      "main": {
        controller: 'ArticlesAdminCtrl',
        templateUrl: 'admin/articles-detail.tpl.html'
      },
      "menu": {
        controller: 'AdminMenuCtrl',
        templateUrl: 'admin/adminmenu.tpl.html'
      }
    }
  });
})
.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin/articles/:id', {
    url: '/admin/articles/:id',
    views: {
      "main": {
        controller: 'ArticlesAdminCtrl',
        templateUrl: 'admin/articles-detail.tpl.html'
      },
      "menu": {
        controller: 'AdminMenuCtrl',
        templateUrl: 'admin/adminmenu.tpl.html'
      }
    }
  });
})
.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin/articles', {
    url: '/admin/articles',
    views: {
      "main": {
        controller: 'ArticlesListCtrl',
        templateUrl: 'admin/articleslist.tpl.html'
      },
      "menu": {
        controller: 'AdminMenuCtrl',
        templateUrl: 'admin/adminmenu.tpl.html'
      }
    }
  });
})
.config(function config( $stateProvider ) {
  $stateProvider.state( 'admin', {
    url: '/admin',
    views: {
      "main": {
        controller: 'AdminCtrl',
        templateUrl: 'admin/index.tpl.html'
      },
      "menu": {
        controller: 'AdminMenuCtrl',
        templateUrl: 'admin/adminmenu.tpl.html'
      }
    }
  });
})

.controller( 'AdminMenuCtrl', function AdminMenuCtrl($scope) {
    $scope.menu = [
      { title : "Articles", link: "#/admin/articles"} ,
      { title : "Users", link: "#/admin/users"}  
    ];
})
.controller( 'AdminCtrl', function AdminMenuCtrl($scope) {
})

.controller( 'ArticlesListCtrl', function ArticlesListCtrl($scope, $http) {
    $http.get('../api/articles').success(function(data) {
        var articles= data;
        $scope.articles = articles;
    });
})

.controller( 'ArticlesAdminCtrl', function ArticlesAdminCtrl($scope, $http, $state, titleService, $location, $timeout) {
    
    if($state.params.id === 'new'){
        $scope.edit = false;
        $scope.remove = false;
        $scope.header = "Add a New Article";
        $scope.article = function(){
        $http({
            method: 'POST',
            url: '../api/articles',
            data: $scope.input,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
            success(function(response) {
        
                if (response.message === 'Article Saved Correctly.'){
                    $scope.input = {};
                    $scope.messageClass = 'alert alert-success';
                    $scope.message = response.message;
                }
                else {
                }
            });
        };
    }
    else if($state.params.method === 'edit'){
        $scope.header = "Edit an Article";
        $scope.edit = true;
        $scope.remove = false;
        
        $http.get('../api/articles/'+$state.params.id).success(function(data) {
            $scope.input = data;
            titleService.setTitle( $scope.input.title );
        });
        
        $scope.article = function(){
        $http({
            method: 'PUT',
            url: '../api/articles/'+$state.params.id,
            data: $scope.input
        }).
            success(function(response) {
        
                if (response.message === 'Article Saved Correctly.'){
                    $scope.messageClass = 'alert alert-success';
                    $scope.message = 'Article Was Updated Successfully.';
                }
                else {
                }
            });
        };
        
    }
    
    else if($state.params.method === 'delete'){
        
        $scope.remove = true;
        
        $http.get('../api/articles/'+$state.params.id).success(function(data) {
            $scope.input = data;
        });
        $scope.redirect = function(){
            $location.path('/admin/articles');
        };
        
        $scope.article = function(){
        $http({
            method: 'DELETE',
            url: '../api/articles/'+$state.params.id
        }).
            success(function(response) {
        
                if (response.message === 'Article Removed Correctly.'){
                    $scope.messageClass = 'alert alert-success';
                    $scope.message = 'Article Was Removed Successfully.';
                    $timeout(function () {
                        $location.path('/admin/articles');
                    },3000);
                }
                else {
                }
            });
        };
        
    }
})
;