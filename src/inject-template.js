var injectTemplate = angular.module('injectTemplate', []);
injectTemplate.factory('injectTemplate', function($compile, $sce, $templateRequest) {
  'use strict';
  return function injectTemplate(element, css, templateName, scope){
    var elements;

    if ('querySelectorAll' in element) {
      elements = element.querySelectorAll(css);
    }
    else {
      elements = element.find(css);
    }

    var templateUrl = $sce.getTrustedResourceUrl(templateName);
    $templateRequest(templateUrl).then(function(template) {
      angular.forEach(elements, function(element){
        angular.element(element).append(template);
        $compile(element)(scope);
      });
    }, function() {
      throw new Error('could not find template');
    });

  };
});
