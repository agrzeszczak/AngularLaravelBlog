angular.module( 'ngBoilerplate.menu', [
  'ui.state',
  'placeholders',
  'ui.bootstrap',
  'titleService'
])

.controller( 'MenuCtrl', function MenuCtrl($scope) {
    $scope.menu = [
      { title : "Home", link: "#/home"}
    ];
});
