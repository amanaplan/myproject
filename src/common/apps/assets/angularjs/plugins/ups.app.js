(function () {

'use strict';

var upsApp = angular.module('upsApp', [
    'ui.bootstrap'
]);

upsApp.controller('formsCtrl', ['$scope', function (scope) {
    scope.tags = {
        templateUrl : 'forms_wizard_popover.html',
        position : 'top'
    };
}]);

upsApp.directive('progressCircle', [
    function () {
        var createSvgElement = function (elementName) {
          return document.createElementNS('http://www.w3.org/2000/svg', elementName);
        };

        var degToRad = function (degrees) {
          return degrees * (Math.PI / 180);
        };

        var path = null;
        var thickness = 10;
        var size = 100;
        var value = 0;
        var min = 0;
        var max = 100;
        var offset = 270;


        function updatePath () {
          var percent = (value - min) / (max - min);
          var radius = Math.floor(size / 2);
          if (percent === 0) {
            path.setAttribute('d', 'M0,0');
            return;
          }
          if (percent === 1) {
            path.setAttribute('d',  'M0' + ',' + radius + 'A' + radius + ',' + radius + ' 0 1,0 ' + size +','+ radius+ 'A' + radius + ',' + radius + ' 0 1,0 0,' + radius+ 'M' + thickness + ',' + radius+ 'A' + (radius / 2) + ',' + (radius / 2) + ' 0 0,1 ' + (size - thickness) + ',' + radius+ 'A' + (radius / 2) + ',' + (radius / 2) + ' 0 0,1 ' + thickness + ',' + radius);
            return;
          }
          var endDeg = percent * 360;

          var outer = {
            radius: Math.floor(size / 2),
            start: {
              x: Math.cos(degToRad(offset)) * radius + radius,
              y: Math.sin(degToRad(offset)) * radius + radius
            },
            end: {
              x: Math.cos(degToRad(offset + endDeg)) * radius + radius,
              y: Math.sin(degToRad(offset + endDeg)) * radius + radius
            },
            arc: endDeg > 180 ? 1 : 0
          };

          var inner = {
            radius: Math.floor(size / 2) - thickness,
            start: {
              x: Math.cos(degToRad(offset + endDeg)) * (radius - thickness) + radius,
              y: Math.sin(degToRad(offset + endDeg)) * (radius - thickness) + radius
            },
            end: {
              x: Math.cos(degToRad(offset)) * (radius - thickness) + radius,
              y: Math.sin(degToRad(offset)) * (radius - thickness) + radius
            },
            arc: outer.arc === 0 ? 1 : 0
          };
          path.setAttribute('d','M' + outer.start.x + ',' + outer.start.y + ' '+ 'A' + outer.radius + ',' + outer.radius + ' 0 ' + outer.arc + ',1 ' + outer.end.x + ',' + outer.end.y + ' '+ 'L' + inner.start.x + ',' + inner.start.y + ' '+ 'A' + inner.radius + ',' + inner.radius + ' 0 ' + outer.arc + ',0 ' + inner.end.x + ',' + inner.end.y + 'Z');
          }

        return function ($scope, element, attrs) {
          var svg = createSvgElement('svg');
          svg.setAttribute('class', 'progress-circle');
          svg.style.width = size + 'px';
          svg.style.height = size + 'px';

          var circle = createSvgElement('circle');
          circle.setAttribute('cx', 100);
          circle.setAttribute('cy', 100);
          circle.setAttribute('r',  95);
          circle.setAttribute('fill', 'none');
          circle.setAttribute('stroke','#e9efec');
          circle.setAttribute('stroke-width',10);
          svg.appendChild(circle);

          path = createSvgElement('path');
          path.setAttribute('fill','#ffb500');
          updatePath();
          svg.appendChild(path);
          element.replaceWith(svg);

          $scope.$watch(attrs.ngModel, function (newValue) {
              value = newValue || 0;
              updatePath();
          });
          $scope.$watch(attrs.size, function (sizeValue) {
              size = sizeValue || 100;
              svg.style.width = size + 'px';
              svg.style.height = size + 'px';
              updatePath();
          });
          $scope.$watch(attrs.min, function (minValue) {
              min = minValue || 0;
              updatePath();
          });
          $scope.$watch(attrs.max, function (maxValue) {
              max = maxValue || 1;
              updatePath();
          });
          $scope.$watch(attrs.thickness, function (thicknessValue) {
              thickness = thicknessValue || 10;
              updatePath();
          });
          $scope.$watch(attrs.offset, function (offsetValue) {
              offset = offsetValue || 90;
              updatePath();
          });
        };
    }
]);


/**
* @directives
* @name errorAlertSr
* @description Alerts screen reader of an error
*/
upsApp.directive('errorAlertSr', function () {
    return {
        restrict: 'A',
        link: function(scope, elem, attr) {
            /*if ($(elem).children('span.ups-error-readerTxt').length === 0) {
                $('body').prepend('<span class="ups-error-readerTxt ups-readerTxt">You tabbed to the next field, but the previous field has the following error: </span>');
            }*/

            /*scope.$watch(function (oldVal, newVal) {
                if (oldVal !== newVal) {
                    console.log(oldVal);
                    console.log(newVal);
                }
            });*/

            /*var DOMTreeModify = function () {
                var alertHTML = $('#upsSRAlertArea').clone();

                $('#upsSRAlertAreaLabel', alertHTML).text(elem.parents('.ups-form_group').children('label').text());
                $('#upsSRAlertAreaError', alertHTML).text(elem.children('span:not(.ups-error_exclamation):not(.ng-hide):not(.ups-readerTxt)').text());

                console.log(alertHTML.html());

                if (alertHTML.html() !==  $('#upsSRAlertArea').html()) {
                    $('#upsSRAlertArea').html(alertHTML.html());
                }
            };

            if (elem.children('span:not(.ups-readerTxt)').length < 3) {
                new DOMTreeModify();
            }

            elem.on('DOMSubtreeModified', DOMTreeModify);

            elem.on('$destroy', function() {
                elem.off('DOMSubtreeModified', DOMTreeModify);
            });*/
        }
    };
});

$(function () {
    //$('body').prepend('<div aria-live="assertive" id="upsSRAlertArea" class="ups-readerTxt"></div>');
});

$(function () {
    $('button.ups-alert_collapse ~ .alert-content').hide();

    $('button.ups-alert_collapse').click(function () {
        var contentBox = $('~ .alert-content', this);
        if (contentBox.is(':visible')) {
            $(this).attr('aria-expanded', false);
            $('.ups-readerTxt', this).text('Click to expand');
            $(this).removeClass('ups-alert_expanded');
            /*$('.icon', this)
				.removeClass('ups-icon-wedgeup')
				.addClass('ups-icon-wedgedown');*/
            contentBox.slideUp(300);
        } else {
            $(this).attr('aria-expanded', true);
            $('.ups-readerTxt', this).text('Click to Collapse');
            $(this).addClass('ups-alert_expanded');
            /*$('.icon', this)
				.removeClass('ups-icon-wedgedown')
				.addClass('ups-icon-wedgeup');*/
            contentBox.slideDown(300);
        }
    });
});


/**
* @directives
* @name upsHelp
* @description Opens and closes a Help Button on an Input/Checkbox/SelectBox/Etc.
*/
upsApp.directive('upsHelp', function() {
    return {
        restrict: 'A',
       link: function(scope, element, attrs) {

			//Closes Help button
			element.parent().find('.ups-help_close').click(function () {
				element.parent().children('.ups-help_tooltip').hide();
			});
			//Opens Help Button
			element.click(function () {
				element.parent().children('.ups-help_tooltip').show();
			});
        }
    };
});
/******************************TESTING*******************************/
/**
* @directives
* @name upsHelpHover
* @description Opens and closes a Help Button using hover functionality on an Input/Checkbox/SelectBox/Etc.
*/
upsApp.directive('upsHelpHover', function() {
    return {
        restrict: 'A',
       link: function(scope, element, attrs) {

			//Closes Help button
			element.parent().find('.ups-help_close').click(function () {
				element.parent().children('.ups-help_tooltip').hide();
			});
			//Opens Help Button
			element.hover(function () {
				element.parent().children('.ups-help_tooltip').show();
			});
        }
    };
});
/******************************TESTING*******************************/

})();
