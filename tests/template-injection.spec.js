describe('template injection', function(){
  'use strict';

  var numSquares = 3;
  var container;

  var injectTemplate;
  var $templateCache;
  var $rootScope;

  beforeAll(function(){
    angular.bootstrap(document.body);
    document.body.className = document.body.className + ' ng-app';

    container = document.createElement('div');
    container.id = 'container';
    document.body.appendChild(container);
  });

  beforeEach(module('injectTemplate'));

  beforeEach(inject(function(_injectTemplate_, _$templateCache_,_$rootScope_){
    injectTemplate = _injectTemplate_;
    $templateCache = _$templateCache_;
    $rootScope = _$rootScope_;

    $templateCache.put('test1', 'hello world');
    $templateCache.put('test2', '{{1 + 1}}');
    $templateCache.put('test3', '{{greeting}}');

    $rootScope.greeting = 'konichiwa';

    for (var i = 0; i < numSquares; i++) {
      var square = document.createElement('div');
      square.className = 'square';
      container.appendChild(square);
    }
  }));

  afterEach(function() {
    var squares = document.querySelectorAll('.square');

    angular.forEach(squares, function(square) {
      container.removeChild(square);
    });
  });

  it('should throw error when the template could not find', function() {
    var scope = $rootScope.$new();
    var error;
    injectTemplate(container, '.square', 'does not exists', scope);

    try {
      $rootScope.$apply();
    }
    catch (err) {
      error = err;
    }
    expect(function(){throw error;}).toThrow();
  });

  it('with simple html', function() {
    var scope = $rootScope.$new();
    injectTemplate(container, '.square', 'test1', scope);
    $rootScope.$apply();

    var elements = container.querySelectorAll('.square');
    expect(elements.length).toBe(numSquares);

    angular.forEach(elements, function(el) {
      expect(angular.element(el).text()).toBe('hello world');
    });
  });

  it('with angular expression', function() {
    var scope = $rootScope.$new();
    injectTemplate(container, '.square', 'test2', scope);
    $rootScope.$apply();

    var elements = container.querySelectorAll('.square');
    expect(elements.length).toBe(numSquares);

    angular.forEach(elements, function(el) {
      expect(angular.element(el).text()).toBe('2');
    });
  });

  it('with angular expression containing scope content', function() {
    var scope = $rootScope.$new();
    scope.greeting = 'hi!';
    injectTemplate(container, '.square', 'test3', scope);
    $rootScope.$apply();

    var elements = container.querySelectorAll('.square');
    expect(elements.length).toBe(numSquares);

    angular.forEach(elements, function(el) {
      expect(angular.element(el).text()).not.toBe('konichiwa');
      expect(angular.element(el).text()).toBe('hi!');
    });
  });
});
