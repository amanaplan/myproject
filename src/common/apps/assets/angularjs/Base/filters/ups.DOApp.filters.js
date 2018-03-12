'use strict';

/**
 * @ angular module
 * @name upsDOApp.filters
 */
 
angular.module('upsDoApp.filters',[])

/**
* @filters
* @name lowerFirstLetter
* @description restricts the first letter to a lowercase character
*/

.filter('lowerFirstLetter', function() {
    return function(name) {
      if (name) {
        name = name.charAt(0).toLowerCase() + name.slice(1);
        return name.replace(' ', '');
      }
    };
  })
  
/**
* @filters
* @name capFirstLetter
* @description restricts the first letter to a uppercase character
*/

.filter('capFirstLetter', function() {
    return function(name) {
      if (name) {
       return (name.replace(/^(.)|(\s|\-)(.)/g,function (c) {
        return c.toUpperCase();
       }));
      }
    };
  })
  
/**
* @filters
* @name firstWord
*/

.filter('firstWord', function() {
    return function(name) {
      if (name) {
        return (name.substr(0,name.indexOf(' ')));
      }
    };
  })
  
/**
* @filters
* @name join
*/

.filter('join', function() {
    return function(name) {
        if (name) {
         name = name.replace(/ /g,'');
         return name.toLowerCase();
        }
      };
    })
	
/**
* @filters
* @name filterBy
*/

  .filter('filterBy', [function() {
    return function(list,filter) {
    	
     var selectedList = [], tempArr = [];
     var flag = false;
      angular.forEach(list, function (item) {
          angular.forEach(filter, function (filtervalue) {
            if(filtervalue.Selected === true && item.tagId.indexOf(filtervalue.name)!==-1){
                if(tempArr.indexOf(item.tagId)===-1){
                	tempArr.push(item.tagId);
                	selectedList.push(item);
            	}
            }
        });
      });
      angular.forEach(filter, function (filtervalue) {
          if(filtervalue.Selected){
        	  flag = true;
          }
      });
      if(!flag){
    	  selectedList = list;
      }
      return selectedList;
    };
  }]);
  