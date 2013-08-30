angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.article',
  'ngBoilerplate.menu',
  'ngBoilerplate.login',
  'ui.state',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run ( titleService ) {
  titleService.setSuffix( ' | AngularLaravelBlog' );
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
    return true;
})

;

