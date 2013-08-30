describe('article view', function() {
   var $httpBackend, $rootScope, createController;
   
   beforeEach( module( 'ngBoilerplate.article' ) );
   beforeEach(inject(function($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        $httpBackend.when('GET', '../api/articles/undefined').respond({title: 'title'}, {content: 'content'});

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        var $controller = $injector.get('$controller');

        createController = function() {
          return $controller('ArticleCtrl', {'$scope' : $rootScope });
        };
        
      }));
   var $scope = {};
   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });
   
//   it('should get article', function() {
//     $httpBackend.expectGET('../api/articles/undefined');
//     var controller = createController();
//     console.log($scope);
//     expect($rootScope.article.title).toBe('title');
//     expect($rootScope.article.content).toBe('content');
//     console.log($rootScope);
//     $httpBackend.flush();
//   });
   
   
});


