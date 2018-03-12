'use strict';

/**
 * @ angular module
 * @name upsDOApp.directives
 */
angular
        .module('upsDOApp.directives')



/**
* @directives
* @name navbar
* @params $location
* @description Controls the Nav bar flow
*/

        .directive('navbar', [ '$location', function($location) {
	        return {
	            templateUrl : '/app_assets/templates/ups.Nav-bar.html',
	            restrict : 'EA',
	            transclude : true,
	            replace : true,
	            scope : {
		            navData : '=data'
	            },
	            link : function(scope) {
		            scope.toggleObject = {
			            item : -1
		            };
		            scope.toggleSwitch = function(index) {
			            $location.path(scope.navData[0].children[index].hash);
		            };
		            scope.isActive = function(route) {
			            var check = $location.path();
			            if (check.indexOf(route) === 1) {
				            return true;
			            } else {
				            return false;
			            }
			            return '/' + route === $location.path();
		            };
	            }
	        };
        } ])

        //Check screen size
        .directive('resize', ['$window', function ($window) {
        	return function (scope) {

            var w = angular.element($window);
            scope.$watch(function () {
                return {
                    'h': window.innerHeight,
                    'w': window.innerWidth
                };
            }, function (newValue) {
                scope.windowHeight = newValue.h;
                scope.windowWidth = newValue.w;
            }, true);

            w.bind('resize', function () {
                scope.$apply();
            });
        };
        }])


/**
* @directives
* @name accordionToggle
* @params $timeout
* @description Controls the toggling functionality of all the accordions
*/

        //Scroll top
        .directive('accordionToggle', ['$timeout',function($timeout) {
        	return {
                restrict: 'C',
                link: function(scope, $elm) {

                    var tHeight = $elm.parents('uib-accordion').data('total-height');

                    if (!tHeight) {
                        $elm.parents('uib-accordion').data('total-height', '0');
                        tHeight = 0;
                    }

                    $elm.attr('data-height-pos', $elm.outerHeight() + tHeight);

                    $elm.parents('uib-accordion').data('total-height', tHeight + $elm.outerHeight());

                    /*$elm.on('keydown', function (e) {
                        //prevent scrolling on spacebar press
                        if (e.keyCode && e.keyCode === 32) {
                            e.preventDefault();
                            $elm.click();
                        }
                    });*/

                    $elm.on('click', function(e) {
                        var _self= $(this);

                        var position = (_self.data('height-pos') + _self.parent().parent().offset().top);

                        $timeout(function(){
                            $('body, html').animate({
                                scrollTop: position - 165
                            });
                        }, 0);
                    });
                }
            };
        }])
        // Social

/**
* @directives
* @name social
* @params $rootScope, UtilService, notification,UserService
* @description Controls the login functionality in the app through various social networking accounts
*/
        .directive(
                'social',
                [
                        '$rootScope',
                        'UtilService',
                        'NotificationService','UserService',
                        function($rootScope, UtilService, notification,UserService) {
	                        var Social = {
	                            url : '',
	                            successurl : 'ups.doa-success-social.json',
	                            failurl : 'ups.doa-fail-social.json',
	                            getSocialURL : function() {
		                            var urlString = this.successurl;
		                            if ($rootScope.socialFail === true) {
			                            urlString = this.failurl;
		                            }
		                            return urlString;
	                            },
	                            getSocialData : function(type, userInfo, scope) {
		                            /*
									 * @type can be type of social networking
									 * site
									 */
		                            UtilService.mockServiceCalls({
			                            urlString : this.getSocialURL()
		                            }, function(response) {
			                            var obj = response.data;
			                            if (obj.errorCode) {
				                            notification.handleError(obj);
			                            } else {
				                            var temp = {};
				                            temp.first_name = obj.user_fName;
				                            temp.last_name = obj.user_lName;
				                            temp.name_suffix = obj.name_suffix;
				                            temp.phone = obj.phone;
				                            temp.email = obj.user_email;
				                            temp.userId = obj.user_fName;
				                            temp.password = 'Social123$';
				                            temp.type = type.network;
											temp.type = type.readerTxt;

				                            scope.$emit('socialDataLoaded',
				                                    temp);
				                            scope.$emit('hideSocial');
				                            notification.handleError();
			                            }
		                            });
	                            },
	                            getUser:function(type){
	                            	UserService.setLoggedUser(type);
	                            }
	                        };

                            //Control the DOA Social Icon Group
                            //@template: src/common/apps/assets/angularjs/Base/_templates/ups.component-social.html
	                        return {
	                            templateUrl : '/app_assets/templates/ups.component-social.html',
	                            restrict : 'EA',
	                            replace : false,
	                            link : function(scope) {
		                            scope.hideSocial = false;
		                            scope.list = [ {
		                                'class' : 'ups-icon-facebook',
		                                'network' : 'Facebook'
		                            }, {
		                                'class' : 'ups-icon-twitter',
		                                'network' : 'Twitter'
		                            }, {
		                                'class' : 'ups-icon-google',
										'readerTxt' : 'Google'
		                            }, {
		                                'class' : 'ups-icon-amazon',
		                                'network' : 'Amazon'
		                            } ];
		                            scope.socialClick = function(type, userInfo) {
			                            //console.log(type,userInfo);
			                            Social.getSocialData(type, userInfo,
			                                    scope);
			                            /**
			                            	@purpose: Demo call for retriving various type of user depend upon social icon
			                            **/
			                            Social.getUser(type.network);
			                            Social.getUser(type.readerTxt);
			                            scope.hideSocial = true;
		                            };

		                            scope.$watch('modalValue', function() {
			                            scope.hideSocial = false;
		                            });
	                            }
	                        };
                        } ])

/**
* @directives
* @name validateEmail
* @description validate the entered value against the allowed email address
*/
        .directive(
                'validateEmail',
                function() {
	                var EMAIL_REGEXP = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

	                return {
	                    require : 'ngModel',
	                    restrict : '',
	                    link : function(scope, elm, attrs, ctrl) {
		                    // only apply the validator if ngModel is present
							// and Angular has added the email validator
		                    if (ctrl && ctrl.$validators.email) {

			                    // this will overwrite the default Angular email
								// validator
			                    ctrl.$validators.email = function(modelValue) {
				                    return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
			                    };
		                    }
	                    }
	                };
                })
/**
* @directives
* @name scrolly
* @description check offset height and height from the top and then scrolls accordingly
*/
        .directive(
                'scrolly',
                function() {
	                return {
	                    restrict : 'A',
	                    link : function(scope, element, attrs) {
		                    var raw = element[0];
		                    element
		                            .bind(
		                                    'scroll',
		                                    function() {
			                                    if (raw.scrollTop + raw.offsetHeight > raw.scrollHeight) {
				                                    scope.$apply(attrs.scrolly);
			                                    }

		                                    });
	                    }
	                };
                })

/**
* @directives
* @name selectOnClick
* @description toggles the selectFocus class on select dropdown for visible outline
*/
       /* .directive(
                'selectOnClick',
                function() {
	                return {
	                    restrict : 'A',
	                    link : function(scope, element) {
		                    element.on('focus', function() {
			                    if (event.currentTarget.tagName === 'SELECT') {
				                    event.currentTarget.parentElement.classList
				                            .add('selectFocus');
			                    }
		                    });
		                    element.on('blur', function() {
			                    $('.ups-dropdown_wrapper.ups-input_wrapper')
			                            .removeClass('selectFocus');
		                    });
	                    }
	                };
                })*/
/**
* @directives
* @name numberMask
* @description Checks and restricts the entered value to a numeric value only
*/
        .directive(
                'numberMask',
                function() {
	                return {
	                    restrict : 'A',
	                    link : function(scope, element, attrs) {
		                    var maxVal = (attrs.maxValue) ? attrs.maxValue : 57;
		                    var minVal = (attrs.minValue) ? attrs.minValue : 48;
		                    element
		                            .on(
		                                    'keydown',
		                                    function(e) {
			                                    -1 !== [ 46, 8, 9, 27, 13 ].indexOf(e.keyCode) || /65|67|86|88/.test(e.keyCode) && (1 === e.ctrlKey || 1 === e.metaKey)|| 35 <= e.keyCode && 40 >= e.keyCode || (e.shiftKey || minVal > e.keyCode || maxVal < e.keyCode)&& ((minVal + 48) > e.keyCode || (maxVal + 48) < e.keyCode)&& e.preventDefault();
		                                    });
	                    }
	                };
                })

/**
* @directives
* @name noSpecialChar
* @description Checks and restricts the entered value agaisnt the set of valid special characters
*/
.directive(
                'noSpecialChar',
                function() {
	                return {
	                    require : 'ngModel',
	                    restrict : 'A',
	                    link : function(scope, element, attrs, modelCtrl) {
		                    modelCtrl.$parsers.push(function(inputValue) {
			                    if (inputValue === undefined){
				                    return '';
			                    }
			                    var cleanInputValue = inputValue.replace(
			                            /[^\w\s]/gi, '');
			                    if (cleanInputValue !== inputValue) {
				                    modelCtrl.$setViewValue(cleanInputValue);
				                    modelCtrl.$render();
			                    }
			                    return cleanInputValue;
		                    });
	                    }
	                };
                })
/**
* @directives
* @name slick
* @description Controls the carousel functionality and the slides to display at various breakpoints
*/

			.directive('slick', function() {
	        return {
	            restrict : 'A',
	            link : function(scope, element) {
					element.on('init', function(){
					element.find('.slick-track .slick-slide .ups-profile-slider').attr('tabindex',0);
					element.find('.slick-track .slick-slide').addClass('slick-active');
					element.find('.slick-track .slick-slide').attr('aria-hidden','false');
					element.find('.slick-track').attr('aria-label','Recommendations Carousel');
				});

		            element.slick({
		                // normal options...
		                infinite : true,
		                accessibility : true,
		                autoplay : false,
		                dots : true,
						prevArrow: '<span data-role="none" tabindex="-1" class="slick-prev" aria-label="Previous"><span class="icon ups-icon-chevronleft" aria-hidden="true"></span><span class="ups-readerTxt">Previous</span></span>',
						nextArrow: '<span data-role="none" tabindex="-1" class="slick-next" aria-label="Next"><span class="icon ups-icon-chevronright" aria-hidden="true"></span><span class="ups-readerTxt">Next</span></span>',
						customPaging: function(slider, i) {
						return '<span data-role="none" tabindex="-1" aria-required="false">' + (i + 1) + '</span>';
						},
		                rtl: $('html').hasClass('ups-rtl'),
		                slidesToShow: 4,
		                slidesToScroll: 4,
		                // the magic
		                responsive : [ {

		                    breakpoint : 992,
		                    settings : {
		                        slidesToShow : 2,
				                slidesToScroll: 2,
				                rtl: $('html').hasClass('ups-rtl'),
		                        dots : true
		                    }

		                }, {

		                    breakpoint : 769,
		                    settings : {
		                        slidesToShow : 1,
				                slidesToScroll: 1,
				                rtl: $('html').hasClass('ups-rtl'),
		                        dots : true
		                    }

		                } ]
		            });

	            }
	        };
        })
/**
* @directives
* @name checkVerify
* @description Restricts the selecting on a checkbox on pressing spacebar key only
*/
		.directive('checkVerify', function() {
    return {
      restrict: 'A',
      link: function(scope, elm, attr) {
        if (attr.type === 'checkbox') {
          elm.on('keypress', function(event) {
            var keyCode = (event.keyCode ? event.keyCode : event.which);
            if (keyCode === 32) {
              event.preventDefault();
              elm.trigger('click');
            }
          });
        }
      }
    };
  }
)
/**
* @directives
* @name checkMax
* @params $filter,$timeout
* @description Controls the maximum count of various payment methods
*/
.directive('checkMax',['$filter','$timeout', function ($filter,$timeout) {
        return {
      		restrict: 'A',
            link: function (scope) {
            	function Disabled(){
            		var el = $('.ups-check-max');
            		 if(scope.paymentCount>=10){
  					 	el.find('option[label="Add Payment Card"]').prop('disabled',true);
  					 }else{
  					 	el.find('option[label="Add Payment Card"]').removeAttr('disabled');
  					 }
  					  if(scope.accountCount>=99){
  					 	el.find('option[label="Add New Account"]').prop('disabled',true);
  					 }else{
  					 	el.find('option[label="Add New Account"]').removeAttr('disabled');
  					 }
  					  if(scope.paypalCount>=1){
  					 	el.find('option[label="Add PayPal"]').prop('disabled',true);

  					 }else{
  					 	el.find('option[label="Add PayPal"]').removeAttr('disabled');
  					 }
            	}
            	function timeSpan(callBack){
	            	$timeout(function() {
	            		callBack();
	  				}, 1000);
            	}
            	scope.$watch('payementData.paymentMethods',function(){
            		var data = scope.payementData.paymentMethods;
            		 scope.accountCount = $filter('filter')(data, { accountType: 'Account' }).length;
  					 scope.paymentCount = $filter('filter')(data, { accountType: 'Payment Card' }).length;
  					 scope.paypalCount = $filter('filter')(data, { accountType: 'PayPal' }).length;
  					 timeSpan(Disabled);
            	}, true);

            }
        };
    }])

/**
* @directives
* @name errorOnBlur
* @description Shows the error on blur if the field is empty
*/
	.directive(
                'errorOnBlur',
                function() {
                     return {
                         restrict : 'A',
						 require: '^form',
                         link : function(scope, element,attrs,formCtrl) {
                              element.on('blur', function() {
                                    if(!formCtrl[attrs.name].$modelValue){
                                        formCtrl[attrs.name].$valid=false;
                                        formCtrl[attrs.name].$error.required=true;
                                        formCtrl[attrs.name].$pristine=false;
                                        formCtrl[attrs.name].$setDirty();
                                  }

                                    /*if(formCtrl[attrs.name].$modelValue === 'Select One'){
                                        formCtrl[attrs.name].$valid=false;
                                        formCtrl[attrs.name].$error.required=true;
                                        formCtrl[attrs.name].$pristine=false;
                                        formCtrl[attrs.name].$setDirty();
                                  }*/

                              });
                         }
                     };
                })

				/**
* @directives
* @name errorOnSubmit
* @description Shows and focus on the 1st error message upon form submit
*/
	.directive('errorOnSubmit', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {

            // set up event handler on the form element
            elem.on('submit', function () {

                // find the first invalid element
                var firstInvalid = elem.find('.ups-invalid_color:first');

                // if we find one, set focus
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            });
        }
    };
})
/**
* @directives
* @name errorOnSubmitAnchor
* @description Shows and focus on the error message element upon form submit
*/
.directive('errorOnSubmitAnchor', function () {
    return {
        restrict: 'A',
        link: function (scope, elem) {

            // set up event handler on the form element
            elem.on('click', function () {

                var firstInvalidID = elem.attr('focus-attr');
                var firstInvalidDiv = elem.parents('form').find('#'+firstInvalidID);
                	firstInvalidDiv.focus();
            });
        }
    };
})
/* @directives
* @name errorOnBirth
* @description Shows and focus on the 1st error message upon form submit
*/
	.directive('errorOnBlurBirth', function () {
    return {
        restrict : 'A',
	 	require: '^form',
        link: function (scope, element,attrs,formCtrl) {

            // set up event handler on the form element
            element.on('blur', function() {
            	//console.log(formCtrl[attrs.name].$modelValue);
                if(formCtrl[attrs.name].$modelValue==='DD' || formCtrl[attrs.name].$modelValue==='MM' || formCtrl[attrs.name].$modelValue==='YYYY'){
                    formCtrl[attrs.name].$valid=false;
                    formCtrl[attrs.name].$error.required=true;
                    formCtrl[attrs.name].$pristine=false;
                    formCtrl[attrs.name].$setDirty();
              	}

          	});
        }
    };
})
    .directive('upsQuantumView', function () {
        var inputID = 0;
        return {
            restrict: 'E',
            templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView.html',
            link : function(scope, element, attr){
                //console.log(attr);
                scope.inputID = inputID;
                inputID++;
                if(attr.inbound) {
                    scope.consolidateEmail = true;
                    //scope.emailConsolidationTable = false;
                } else if (attr.outbound) {
                    scope.emailConsolidationTable = true;

                } else if (attr.thirdparty) {
                    scope.emailConsolidationTable = true;

                }
            }
        };
    }
)
/**
* @directives
* @name backButton
* @description navigates to the previous URL when placed on an anchor link
*/
    .directive('backButton', function () {
        return {
            restrict: 'A',
            link : function(scope, element, attr){
                element.on('click', function() {
                    history.back();
                    scope.$apply();
                })
            }
        };
    }
)

/**
* @directives
* @name pointFocus
* @description focus on prevoius page element which is clicked element while returning from another template
*/
	.directive('pointFocus',[ '$location','$timeout','$rootScope', function ($location,$timeout,$rootScope) {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                var pointCls = $rootScope.pointClass;
                // set up event handler on the form element
                scope.pointClass = function(elemCls,index){
                    $rootScope.pointClass = elemCls;
                    $rootScope.indexPointFocus= index+1;
                };
                scope.$watch('$location.path()', function() {
                $timeout(function() {
                    elem.on('click', function () {
                       $rootScope.pointFocus = true;
                });
                    if($rootScope.pointFocus){
                        if($rootScope.indexPointFocus){
                            elem.parents('table').find('.'+pointCls).eq($rootScope.indexPointFocus-1).focus();
                        }else{
                            elem.parent().find('.'+pointCls).eq(0).focus();
                        }
                    }
                    }, 10);
                });
            }
        };
    }])


    /*.directive('ups-accordion_item', function () {
        return {
            restrict: 'C',
            link: function (scope, elem) {
                scope.children('
            }
        };
    })*/


/**
* @directives
* @name pageTitle
* @description Update the page title and H1 whenever the route updates
*/
	.directive('pageTitle', function () {
        return {
            restrict: 'A',
            link: function(scope, elem, attr) {
                document.title = attr.pageTitle.replace(/(<([^>]+)>)/ig, '') + ' | UPS';
                $('h1').html('<span>' + attr.pageTitle + '</span>').attr('tabindex', '-1');
                $('h1').focus();
            }
        };

    })


    .directive('focusOnLoad', ['$timeout', function (timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem) {
                //console.log(elem[0]);
                //$(elem[0]).focus();
                //elem.focus();
                timeout(function () {
                    elem.focus();
                });
            }
        };
    }]);



	/*.directive('syncFocusWith', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attr) {
				scope[attr.addFocusFunction] = function () {
					element[0].focus();
				};
			}
		};
	});*/

/* @directives
* @name errorOnBirth
* @description Shows and focus on the 1st error message upon form submit

	.directive('tableDimension', ['$timeout',function ($timeout) {
	     return {
	        restrict: 'A',
	        link: function (scope,elem,attrs) {
	        	//var table=elem[0];
	            // set up event handler on the form element
	            scope.$watch(attrs.tablength,function(value){
	            	if(value>9){
		            	var height=0;
		            	$.each($(elem).find('tr'),function(i){
		            		var _selfInstance=$(this);
		            		console.log(i,_selfInstance.height(),_selfInstance);
		            		if(i>10){
		            			return;
		            		}else{
		            			$timeout(function(){
			            			height= height + _selfInstance.height();
			            			console.log(100,height);
		            				elem.css('max-height',height+'px');
		            			},150);
		            		}
		            	});
	            	}
	            	//if(value===10){
	            	//	elem.css('max-height',table.offsetHeight+'px');
	            		//table.style.maxHeight=table.offsetHeight+'px';
	            	//}
	            });
	        }
	    };
	}]);*/
