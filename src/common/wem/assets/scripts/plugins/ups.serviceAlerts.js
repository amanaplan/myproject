(function( $ ) {
    'use strict';
    var PLUGIN_NS = 'upsServiceAlerts';

    var Plugin = function( target, options ) {
		var plugin = this;
        plugin.$T = $(target);
        /** #### OPTIONS #### */
        this.options = $.extend(
            true, // deep extend
            {
                DEBUG: false,
                defaultOptionA: 'defaultValue'
            },
            options
        );

        plugin.$csvJson = options.zipAffected || {};

        plugin.$wrap=plugin.$T.find('.ups-wrap_inner');
        plugin.$header= plugin.$T.find('.ups-header_panel');
        plugin.$listContainer= plugin.$T.find('.ups-service-carousel');
        plugin.$zipContainer=plugin.$T.find('.ups-zip-lookup');
        plugin.init();
	};

	Plugin.prototype.init=function(){
		var plugin= this;
		plugin.replicateHeader();
		plugin.bindEvents();
		plugin.bindPlugin();
        plugin.removeAria();
        plugin.removeDuplicate();
	};

	Plugin.prototype.replicateHeader=function(){
		var plugin=this;
		plugin.$wrap.append(plugin.$header.clone().addClass(UPS.configs.activeClass));
	};

    Plugin.prototype.removeDuplicate = function(){
        var plugin = this;
        plugin.$T.find('.slick-cloned .ups-check-affected').each(function(i,v){
                var label = $(this).find('label'),
                inputEl = $(this).find('input');
                $(label).attr('for','ups-cloned-'+i);
                $(inputEl).attr('id','ups-cloned-'+i);
        });
    };
    Plugin.prototype.removeAria=function(){
        var plugin = this;
        plugin.$T.find('.ups-service-slick.slick-slide').each(function(){
                $(this).removeAttr("aria-describedby");
        });
    };

	Plugin.prototype.bindEvents = function(){
		var plugin= this;
		if(plugin.$zipContainer.length>0){
			plugin.$zipContainer.find('.ups-display-states').on('click',function(e){
				e.preventDefault();
				var _self= $(this);
				var $_zipCodes=_self.parent().find('.ups-zip_codes');				
				var $_icons= _self.find('span:not(.ups-readerTxt)');
				if($_icons.hasClass('ups-icon-chevrondown')){
					_self.find('span.ups-readerTxt').text(_self.find('span.ups-readerTxt').attr('data-hide-show'));
					_self.attr('aria-expanded',true).attr('aria-selected',true);

				}else{
					_self.attr('aria-expanded',false).attr('aria-selected',false);
					_self.find('span.ups-readerTxt').text(_self.find('span.ups-readerTxt').attr('data-show-show'));
				}
				$_icons.toggleClass('ups-icon-chevrondown').toggleClass('ups-icon-chevronup');

				$_zipCodes.toggleClass(UPS.configs.activeClass).attr('aria-hidden',!$_zipCodes.hasClass(UPS.configs.activeClass));
				var $_selfSibling=_self.parent().siblings();
				$_selfSibling.find('.ups-zip_codes').removeClass('ups-zip-show');
				$_selfSibling.find('.ups-readerTxt').text($_selfSibling.find('.ups-readerTxt').attr('data-lang-show'));
			});

			plugin.$zipContainer.find('.ups-showstates').on('click',function(e){
				e.preventDefault();
				var _self= $(this);
				_self.find('span.icon').toggleClass('ups-icon-chevrondown').toggleClass('ups-icon-chevronup');
				var $siblings=_self.parent().siblings();
				
				$.each($siblings,function(){
					var _selfSibling=$(this);
					if(_self.find('span:not(.ups-readerTxt)').hasClass('ups-icon-chevronup')){
						_selfSibling.find('.ups-display-states > span:not(.ups-readerTxt)').addClass('ups-icon-chevronup').removeClass('ups-icon-chevrondown');
						_selfSibling.find('.ups-zip_codes').addClass(UPS.configs.activeClass);
						_selfSibling.find('span.ups-readerTxt').text(_self.find('span.ups-readerTxt').attr('data-hide-show'));
						_selfSibling.attr('aria-expanded',true).attr('aria-selected',true);
					}else{
						_selfSibling.find('.ups-display-states > span:not(.ups-readerTxt)').addClass('ups-icon-chevrondown').removeClass('ups-icon-chevronup');
						_selfSibling.find('.ups-zip_codes').removeClass(UPS.configs.activeClass);
						_selfSibling.find('span.ups-readerTxt').text(_self.find('span.ups-readerTxt').attr('data-hide-show'));
						_selfSibling.attr('aria-expanded',true).attr('aria-selected',true);
					}
				});
				//.find('.ups-display-states').toggleClass(UPS.configs.activeClass);
				
				if(_self.find('span.icon').hasClass('ups-icon-chevrondown')){
					_self.find('span:not(.icon)').text(_self.attr('data-show'));
				}else{
					_self.find('span:not(.icon)').text(_self.attr('data-hide'));
				}
			});

			plugin.$zipContainer.find('.ups-zip-search').on('click',function(e){
				e.preventDefault();
				var _self= $(this);
				var zip = $.trim(_self.siblings('input').val());
				var zipSearch= _self.parents('.ups-states-block').find('.ups-zip_codes').find('p:contains("'+zip+'")');
				var parentAffected = _self.parents('.ups-check-affected');
				parentAffected.find('.ups-zip_lookUp_alert,.ups-zip_lookUp_message').removeClass(UPS.configs.activeClass);
				if(zip!=='' && zipSearch.length>0){
					parentAffected.find('.ups-zip_lookUp_alert').addClass(UPS.configs.activeClass);
		        } else {
		            parentAffected.find('.ups-zip_lookUp_message').addClass(UPS.configs.activeClass);
				}
			});

			plugin.$zipContainer.find('.ups-download-csv a').on('click',function(){
				var _self=$(this);
				if(plugin.$csvJson && plugin.$csvJson.length>0){
					var zipId= _self.attr('data-affected');
					var requiredJson;
					for(var i=0; i < plugin.$csvJson.length; i++ ){
						if(plugin.$csvJson[i].id===zipId){
							requiredJson= plugin.$csvJson[i].affected;
							break;
						}
					}
					if(requiredJson && requiredJson.length>0){
					 	plugin.JSONToCSVConvertor(requiredJson,'Zip Affected Areas',true);
					}
				}else{
					return ;
				}
			});

		}

	};

	Plugin.prototype.bindPlugin=function(){
		var plugin=this;
		plugin.$listContainer.find('.ups-service-slick').css('height','auto');
		plugin.slick=plugin.$listContainer.css({
                    width: 'auto',
                    left: 'auto',
                    right: 'auto'
                }).slick({
            slide: '.ups-service-slick',
            slidesToShow: 1,
            speed: 600,
            infinite:true,
            swipe:false,
            arrows: true,
            nextArrow:plugin.$T.find('button.slick-next') ,
            prevArrow: plugin.$T.find('button.slick-prev') ,
            autoplaySpeed: 7000,
            /*appendArrows: $('.ups-news:not(.ups-expand) .ups-news_nav'),*/
            rtl: UPS.configs.isRTL,
		}).on('afterChange',function(slick,currentSlide){
            setTimeout(function(){
                    plugin.removeAria();
            },1000);
            
        });

		plugin.$header.find('button').on('click',function(){
			var _self=$(this);
			_self.parents('.ups-wrap_inner').find('.count').text((Number(plugin.slick.slick('getCurrent'))+1));
		});

		if(window.location.search!=='' && window.location.search.indexOf('id=')>0){
			if(window.location.search.split('id=').length >1 &&  window.location.search.split('id=')[1].split("&")[0]!==""){
				plugin.setSlick(window.location.search.split('id=')[1].split("&")[0]);
			}else{
				plugin.setSlick(window.location.search.split('id=')[1]);
			}
		}

	};
	Plugin.prototype.setSlick=function(data){
		var plugin=this;
		var $index=1;
		
		if(plugin.$listContainer.find(".ups-service-slick").length>1){
			$.each(plugin.$listContainer.find(".ups-service-slick"),function(i){
				if($(this).attr("id")===data){
					$index=i;
				}
			});
		//	$index++;
		}

		plugin.slick.slick("slickGoTo",($index-1),false);
		plugin.$wrap.find(".count").text($index);	
	};

	Plugin.prototype.JSONToCSVConvertor= function(JSONData, ReportTitle, ShowLabel) {
	    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	    var arrData = typeof JSONData !== 'object' ? JSON.parse(JSONData) : JSONData;

	    var CSV = '';
	    //Set Report title in first row or line

	    CSV += ReportTitle + '\r\n\n';

	    //This condition will generate the Label/Header
	    if (ShowLabel) {
	        var row = '';

	        //This loop will extract the label from 1st index of on array
	        for (var index in arrData) {

	            //Now convert each value to string and comma-seprated
	            row += arrData[index].state + ',';
	        }


	        row = row.slice(0, -1);

	        //append Label row with line break
	        CSV += row + '\r\n';
	    }

	    //1st loop is to extract each row
        var maxLenthArr= [];
        //row = '';
	    for (var i = 0; i < arrData.length; i++) {
	    	maxLenthArr.push(arrData[i].zip.length);
	    }
	    if(maxLenthArr.length>0){
	    	maxLenthArr.sort(function(a, b){return a - b;});
	    	var highestIndex = maxLenthArr[maxLenthArr.length-1];//6
	    	if(highestIndex && highestIndex>0){
		    	for(var k=0; k < highestIndex;k++){
	    			var column='';
		    		for(i =0;i < arrData.length; i ++ ){
		    			column+= (arrData[i].zip[k]?arrData[i].zip[k]:"")+",";
					}
					column.slice(0, column.length - 1);

			        //add a line break after each row
			        CSV += column + '\r\n';
				}
			}
	    }

	    if (CSV === '') {
	        alert('Invalid data');
	        return;
	    }

	    //Generate a file name
	    var fileName = 'ZipAffectedAreas';
	    //this will remove the blank-spaces from the title and replace it with an underscore
	    fileName += ReportTitle.replace(/ /g,'_');

	    //Initialize file format you want csv or xls
	    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
	    
	    // Now the little tricky part.
	    // you can use either>> window.open(uri);
	    // but this will not work in some browsers
	    // or you will not get the correct file extension

	    //this trick will generate a temp <a /> tag
	    var link = document.createElement('a');
	    link.href = uri;

	    //set the visibility hidden so it will not effect on your web-layout
	    link.style.cssText = 'visibility:hidden';
	    link.download = fileName + '.csv';

	    //this part will append the anchor tag and remove it after automatic click
	    document.body.appendChild(link);
	    if (navigator.msSaveBlob) { // IE 10+ 
		navigator.msSaveBlob(new Blob([CSV], { type: 'text/csv;charset=utf-8;' }), fileName + '.csv'); 
		} else {
			link.click();
		}
	    document.body.removeChild(link);
	};

	$.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        if (!$(this).length) {
            return $(this);
        }
        var instance = $(this).data(PLUGIN_NS);
        if ( instance && methodOrOptions!==undefined && (methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0) && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
            return instance[ methodOrOptions ]( Array.prototype.slice.call( arguments, 1 ) );
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            instance = new Plugin( $(this), methodOrOptions );
            $(this).data( PLUGIN_NS, instance );
            return $(this);
        } else if ( !instance ) {
            $.error( 'Plugin must be initialised before using method: ' + methodOrOptions );
        } else if ( methodOrOptions.indexOf('_') === 0 ) {
            $.error( 'Method ' +  methodOrOptions + ' is private!' );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist.' );
        }
    };
})(jQuery);
