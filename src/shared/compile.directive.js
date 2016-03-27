export default function ($compile) {
  return {
    restrict: 'M',
    link: function (scope, element, attrs) {
      scope.$watch(function () {
        return scope.$eval(attrs.bindHtmlCompile);
      }, function (value) {
        element.next().replaceWith($compile(value && value.toString())(scope));
      });
    }
  };
}