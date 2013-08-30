angular.module( 'ngBoilerplate.article', [
  'ui.state',
  'placeholders',
  'ui.bootstrap',
  'titleService'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'article/:slug', {
    url: '/article/:slug',
    views: {
      "main": {
        controller: 'ArticleCtrl',
        templateUrl: 'article/article.tpl.html'
      },
      "menu": {
        controller: 'MenuCtrl',
        templateUrl: 'menu/menu.tpl.html'
      }
    }
  });
})

.controller( 'ArticleCtrl', function AboutCtrl( $scope, titleService, $http, $state ) {
  
  $http.get('../api/articles/'+$state.params.slug).success(function(data) {
        $scope.article = data;
        titleService.setTitle( $scope.article.title );
    });

})

;
