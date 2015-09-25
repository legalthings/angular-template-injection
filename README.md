# Inject Template

This Angular module provides a service to inject an Angular template into the DOM.
The template will be inserted into every child node of a given element that matches a given
CSS selector.

## Installation

     bower install git@github.com:legalthings/angular-template-injection.git --save

### Example usage
The function expects a normal element or a Jquery element. In addition, the `scope` must be specified
that each child should use as the prototype for its scope.

```
angular.module('app', ['injectTemplate']);

angular.module('app').controller('AppCtrl', function($scope, injectTemplate) {
    // with jquery
    injectTemplate(angular.element('#container'), '.child-class', 'content.tpl.html', $scope);
    // or injectTemplate($('#container'), '.child-class', 'content.tpl.html', $scope);

    // without jquery
    // injectTemplate(document.querySelector('#container'), '.child-class', 'content.tpl.html', $scope);
});
```
### Example

The example can be viewed by running a http server in the root of the folder, and navigating
to example/index.html. For example:

```
# node http server
http-server

# python 2.7 simple server
python -m SimpleHTTPServer
```
