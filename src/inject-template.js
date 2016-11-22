angular.module('injectTemplate', []);

angular.module('injectTemplate').factory('injectTemplate', [
  '$compile', '$sce', '$templateRequest',
  function($compile, $sce, $templateRequest) {
    'use strict';
    return function (element, css, source, scope){
      var elements;

      elements = angular.element(document.querySelectorAll(css));

      if (typeof source === 'string') {
        source = { templateUrl: source };
      }

      function loadTemplate(template) {
        angular.forEach(elements, function(element){
          if (template) {
            angular.element(element).append(template);
          }

          if (source.attr) {
            angular.forEach(source.attr, function(value, key) {
              angular.element(element).attr(key, value);
            });
          }

          var childScope = typeof scope === 'function' ? scope() : scope;
          $compile(element)(childScope);
        });
      }

      if (source.templateUrl) {
        var templateUrl = $sce.getTrustedResourceUrl(source.templateUrl);
        $templateRequest(templateUrl).then(
            loadTemplate,
            function() {
              throw new Error('could not find template');
            }
        );
      } else {
        loadTemplate(source.template);
      }
    };
  }
]);
