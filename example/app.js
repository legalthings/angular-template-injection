(function(){
  'use strict';
  var app = angular.module('app', [
    'injectTemplate'
  ]);

  app.controller('PageController', function PageController($scope, injectTemplate) {
    $scope.test = 'success';

    for (var i=0; i < 3; i++) {
      $('#container').append($('<div>').addClass('square'));
    }

    injectTemplate(angular.element('#container'), '.square', 'test.tpl.html', $scope);
  });
}());
