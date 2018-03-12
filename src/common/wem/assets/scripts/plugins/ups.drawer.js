/*(function () {
	'use strict';*/

	/*var upsDrawer = angular.module('upsDrawer', []);

	upsDrawer.directive('ups-drawer-btn', function () {
		return {
			restrict : 'C',
			link: function(scope, elem, attrs) {
				console.log(elem);
			}
		};
	});*/


/*})();*/

$(function () {
	'use strict';

    //add aria-expanded and aria-controls
    $('.ups-drawer .ups-drawer-btn').not('[ng-version] .ups-drawer .ups-drawer-btn').attr('aria-expanded', 'false');
	$('.ups-drawer .ups-drawer-btn').not('[ng-version] .ups-drawer .ups-drawer-btn').click(function () {
		var dContent = $(this).parent().children('.ups-drawer-content');

		if (dContent.is(':visible')) {
			$(this).attr('aria-expanded', 'false');

			$(this).focus();

			$('.icon', this)
				.removeClass('ups-icon-wedgeup')
				.addClass('ups-icon-wedgedown');

			dContent.hide();
		} else {
			$(this).attr('aria-expanded', 'true');

			$(this).focus();

			$('.icon', this)
				.removeClass('ups-icon-wedgedown')
				.addClass('ups-icon-wedgeup');

			dContent.show();
		}
	});
});
