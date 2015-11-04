# Inject Template

This Angular module provides a service to inject an Angular template into the DOM.
The template will be inserted into every child node of a given element that matches a given
CSS selector.

## Installation

     bower install angular-template-injection --save

### Usage
The function expects a normal DOM element or a jQuery element. In addition, the `scope` must be
specified that each child should use as the prototype for its scope.

The `source` argument should be an object with either a `template` property with the template as
string, or a `templateUrl` property. Additionaly it may have an `attr` property with attributes
that should be added to the element.

```
angular.module('app', ['injectTemplate']);

angular.module('app').controller('AppCtrl', function($scope, injectTemplate) {
    // with jquery
    injectTemplate(angular.element('#container'), '.child-class', { templateUrl: 'content.tpl.html' }, $scope);
    // or injectTemplate($('#container'), '.child-class', { templateUrl: 'content.tpl.html' }, $scope);

    // without jquery
    // injectTemplate(document.querySelector('#container'), '.child-class', { templateUrl: 'content.tpl.html' }, $scope);
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

