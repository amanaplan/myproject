'use strict';

/**
 * @ angular module
 * @name upsDOApp.directives
 */
 
//angular.module('upsDOApp.directives')

/**
* @directives
* @name progressCircle
* @description Initialize and controls the progress of the file uploaded
*/

// progressCircle
/*.directive('progressCircle', [
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
]);*/