(function( $ ) {
    'use strict';

    var PLUGIN_NS = 'upsSearchSupport';

    var Plugin = function( target, options ) {
        var plugin = this;
        plugin.$T = $(target);

        plugin.options = $.extend(
            true, // deep extend
            {},
            options
        );

        //plugin.locUrl = 'ajax/shipping.json';
        //'UPSSecurity':UPSSecurity,
        plugin.$data= {
            'SearchRequest':options.jsonRequest
        };
        plugin.$lang=options.lingual;
        plugin.locUrl = options.URL;
        plugin.$maxDataDisplay=Number(plugin.$data.SearchRequest.MaxResult) || 10;
        plugin.$hasPageMove=false;
        plugin.$startPagination=1;
        plugin.$paginationPositioning= 6;
        plugin._init( target, options );
        window.addEventListener('popstate', function(event) {
            if(event.state!==null && event.state.currPage!==undefined){
                plugin._paginations((event.state.currPage),false);
                plugin._getResults();
            }
        });  

        window.onbeforeunload = function(){ window.scrollTo(0,0); };
        
        return plugin;
    };

    Plugin.prototype._init = function () {
        var plugin = this;

        plugin.$results = plugin.$T.find('.ups-search_results');
        plugin.$searchBtn = plugin.$T.find('.ups-search_inputs .search_btn');
        plugin.$input = plugin.$T.find('.ups-search_inputs .ups-form_input');
        plugin.$dropdown = plugin.$T.find('.ups-search_inputs .ups-dropdown');
        plugin.$dropdownWs = plugin.$T.find('.ups-search_inputs .ups-dropdown option[value="WorldShip"]');
        plugin.$dropdownAll = plugin.$T.find('.ups-search_inputs .ups-dropdown option[value="All"]');
        // Search Keys stored in persistant variable.
        plugin.$IndexType=plugin.$data.SearchRequest.IndexType;
        if(plugin.options.isLoggedIn){
            plugin.$UserId=plugin.$data.SearchRequest.UserId;
            plugin.$Islogged=plugin.$data.SearchRequest.IsLoggedInIndicator;
        }
        
        
        
        /* 511423 - Enable Search on load of Javascript */
        
        
        var isSearchDisabled = plugin.$input.prop('disabled'),
    	isSearchButtonDisabled = plugin.$searchBtn.prop('disabled'),
        isSearchDropDownDisabled = plugin.$dropdown.prop('disabled');
        
        
    	if(isSearchDisabled){
    		plugin.$input.removeAttr('disabled');
    	}
    	if(isSearchButtonDisabled){
    		plugin.$searchBtn.removeAttr('disabled');
    	}
    	if(isSearchDropDownDisabled){
    		plugin.$dropdown.removeAttr('disabled');
    	}
        
        	
        
        
        /*if(UPS.configs.viewport.size === 'small'){
            plugin.$searchBtn = plugin.$T.find('.ups-search_inputsMobile .search_btn');
            plugin.$input = plugin.$T.find('.ups-search_inputsMobile .ups-form_input');
            plugin.$dropdown = plugin.$T.find('.ups-search_inputsMobile .ups-dropdown');
            plugin.$dropdownWs = plugin.$T.find('.ups-search_inputsMobile .ups-dropdown option[value="WorldShip"]');
            plugin.$dropdownAll = plugin.$T.find('.ups-search_inputsMobile .ups-dropdown option[value="All"]');
        }*/

        plugin.$resultsSearchType = plugin.$results.find('.results-header .search-type');
        plugin.$resultsSearchHead = plugin.$results.find('.results-header');
        plugin.$resultsSearchText = plugin.$results.find('.search-text');
        plugin.$resultsSearchCategory = plugin.$results.find('.search-category');

        plugin.$resultsNumContainer = plugin.$results.find('.results-num-container');

        plugin.$resultsContainer = plugin.$results.find('.results-container');

        plugin.$resultsFooter = plugin.$results.find('.results-footer');
        plugin.$pagBar = plugin.$results.find('.results-footer .footer-container');
        plugin.$resultsPag = plugin.$results.find('.pagination-container');
        plugin.$pagBtn = null;

        plugin.$firstBtn = plugin.$results.find('.results-footer .first');
        plugin.$lastBtn = plugin.$results.find('.results-footer .last');
        plugin.$prevBtn = plugin.$results.find('.results-footer .prev');
        plugin.$nextBtn = plugin.$results.find('.results-footer .next');
        plugin.$srMsgBox = plugin.$results.find('.ups-srMessage');
        
        var processSearchResponse=function(response){
            if (response.data.isError) {
                plugin._setNoResults();
                plugin._dataError();
                //plugin.processAddressNetError(response.data.statusText);
                //plugin.checkView=false;
                //plugin._loggedInFailedView();
            } else {
                if (response.data.responseJSON.hasOwnProperty("Fault")){
                    plugin._setNoResults();
                    plugin._dataError();
                    //plugin.checkView=false;
                    //plugin._loggedInFailedView();
                    //plugin.processAddressErrorResp(response);
                } else {
                    //plugin._loggedInSuccessView();
                    //plugin.checkView=true;
                    plugin.processSearchSuccessResp(response);
                }
            }
        };
        $.Topic("Search").subscribe(processSearchResponse);

        // Allows user to hit the enter on mobile devices
        plugin.$input.keypress(function(e){
            if((e.keyCode ? e.keyCode : e.which) === 13){
                e.preventDefault();
                plugin.$searchBtn.trigger('click');
            }
        });

        plugin.$searchBtn.on('click', function (e,data) {
            e.preventDefault();
            //console.log(data);
            if(plugin.$input.val() && plugin.$input.val().trim()!=='' && (plugin.$input.val().toLowerCase()).trim()!=='search'){
                plugin.tempLoc = (plugin.$input.val()).trim();
                if((plugin.$input.val().toLowerCase()).trim().indexOf('1z')===0 ){
                    plugin.redirectTracking();
                    return;
                }
            }else {
                plugin.tempLoc = '';
                return;
                //plugin.tempLoc = plugin.$input.attr('placeholder').toLowerCase();
            }
            // plugin.locUrl = '/assets/resources/ajax/search_support_result.json';
            $(this).attr("data-link-name","search").attr("data-on-site-search-term",plugin.tempLoc).attr("data-event-id",22).attr("data-content-block-id",'M27');
            var isHistory=true,currPage=0;
            if(data){
                if(data.history){
                    isHistory=false;
                }
                if(data.currPage){
                    currPage=data.currPage;
                }
            }
            plugin._paginations(currPage,isHistory);
            plugin._getResults(); // get results
        });

        if(plugin.$input.val()!=='') {

            var queryParam = window.location.search, startPage=0;
            if(queryParam.indexOf('index=')>-1){
                var indexArr = queryParam.split('index=');
                startPage= indexArr[1];
                if(isNaN(startPage)){
                    indexArr = startPage.split('&');
                    startPage = indexArr[0];
                }
            }
            plugin.$searchBtn.trigger('click',{history:true,currPage:startPage});
        }
        plugin._bindDelegateEvent();
        return plugin;
    };

    Plugin.prototype._paginations=function  (value,isHistory) {
        // body...
        var plugin= this;
        plugin.$startPagination =value;
        //console.log(value,window.location.href);

        if(!isNaN(value)){
            plugin.$data.SearchRequest.StrOffSet=(Number(value)-1)+'';
        }

        if(plugin.$startPagination<=0){
            plugin.$data.SearchRequest.StrOffSet='0';
            plugin.$startPagination =1;
        }

        if(isHistory){
            var host=window.location.origin + window.location.pathname;
            host= host+'?q='+encodeURIComponent(plugin.tempLoc)+'&index='+plugin.$startPagination;
            window.history.pushState({currPage : plugin.$startPagination,Keywords:plugin.tempLoc}, document.title, host);
        }

        //console.log(1,plugin.$startPagination);
    };

    //read Worldship version from URL and set it in the request
    Plugin.prototype.GetQueryStringParams = function(sParam) {
        var plugin = this;
    var sPageURL = window.location.search.substring(1);
    //console.log(sPageURL);
    var sURLVariables = sPageURL.split('&');
    //console.log(sURLVariables);
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];            
        }
      }
      return plugin;
    };

    Plugin.prototype.manupulateDataJson = function(){
        var plugin = this;
        var wsVersion = plugin.GetQueryStringParams('ws_ver');
        plugin.$data.SearchRequest.Keywords = encodeURIComponent(plugin.tempLoc);
        if(plugin.$IndexType==='3'){
            plugin.$data.SearchRequest.SearchWithIn = encodeURIComponent(plugin.$dropdown.val());
        }else if(plugin.$IndexType==='2'){
            if (typeof wsVersion !== 'object') {
            plugin.$data.SearchRequest.WorldShipVersion = wsVersion;
            plugin.$dropdown.val('WorldShip').attr('selected','selected');
            plugin.$data.SearchRequest.Category = encodeURIComponent(plugin.$dropdown.val());
            plugin.$dropdownAll.hide();
            } else {
            plugin.$data.SearchRequest.Category = encodeURIComponent(plugin.$dropdown.val());
            //plugin.$dropdown.children().val('WorldShip').hide();
            plugin.$dropdownWs.hide();
            }
        }else{
            if(plugin.$dropdown.val()==='2'){
                plugin.$data.SearchRequest.IndexType='2';
                plugin.$data.SearchRequest.Category='All';
                if(plugin.options.isLoggedIn){
                    plugin.$data.SearchRequest.UserId = plugin.$UserId;
                    plugin.$data.SearchRequest.IsLoggedInIndicator=plugin.$Islogged;
                }
                delete plugin.$data.SearchRequest.Industry;
                delete plugin.$data.SearchRequest.SearchWithIn;
                delete plugin.$data.SearchRequest.CallToAction;
            }else if(plugin.$dropdown.val()==='3'){
                plugin.$data.SearchRequest.IndexType='3';
                plugin.$data.SearchRequest.Industry='all';
                plugin.$data.SearchRequest.SearchWithIn='all';
                plugin.$data.SearchRequest.CallToAction='all';
                delete plugin.$data.SearchRequest.Category;
                delete plugin.$data.SearchRequest.UserId;
                delete plugin.$data.SearchRequest.IsLoggedInIndicator;
            }else{
                plugin.$data.SearchRequest.IndexType='1';
                delete plugin.$data.SearchRequest.Category;
                delete plugin.$data.SearchRequest.Industry;
                delete plugin.$data.SearchRequest.SearchWithIn;
                delete plugin.$data.SearchRequest.CallToAction;
                delete plugin.$data.SearchRequest.UserId;
                delete plugin.$data.SearchRequest.IsLoggedInIndicator;
            }
        }
        //window.sessionStorage.setItem('search._index', plugin.$startPagination);
    };
    
    Plugin.prototype._srMessage = function(dataattr,state){
    	var plugin = this;
    	var finalResult = plugin.$resultsSearchHead.text();
    	var msg = plugin.$srMsgBox.attr(dataattr);
    	plugin.$srMsgBox.empty();
        if(state === "beforesend"){
            plugin.$srMsgBox.append('<p>'+ msg +'</p>');
        }else if(state === "complete"){
            plugin.$srMsgBox.append('<p>'+ msg + finalResult +'</p>');
        }
    	
    	plugin.$srMsgBox.attr('aria-live','polite').attr('role','alert');
    };
    
    Plugin.prototype._removeSrMessage = function(){
    	var plugin = this;
    	setTimeout(function(){
            plugin.$srMsgBox.removeAttr('role');
            plugin.$srMsgBox.empty();
    		plugin.$srMsgBox.attr('aria-live','off');
    	},3000);
    };
    
   

    Plugin.prototype._getResults = function() {
        var plugin = this;
        plugin.$searchBtn.attr("data-on-site-search-result",0);
        plugin.manupulateDataJson();

        plugin.$results.removeClass(UPS.configs.activeClass);
        //set ajax options
        //console.log(plugin.$data);
        var container = plugin.$resultsContainer;
        //console.log(2,plugin.$startPagination,plugin.$data);
        $.Topic("Ajax").publish({
            ajaxOptions: {
                id: plugin.$T.data("widget-source"),
                url: plugin.$T.data("ajax-source"),
                data:  JSON.stringify(plugin.$data),
                dataType:"json",
                beforeSend:function(){
                    container.empty();
                    plugin._srMessage('data-loadingtxt','beforesend');
                    plugin._removeSrMessage();
                    plugin.$results.addClass(UPS.configs.activeClass);
                    container.append('<div class="ups-loaderImg"></div>');
                    $('html, body').animate({
                        scrollTop: (plugin.$T.offset().top -100)
                    }, 300, 'easeOutExpo');
                    plugin.$resultsSearchHead.addClass(UPS.configs.inActiveClass);
                    plugin.$resultsFooter.addClass(UPS.configs.inActiveClass);
                },
                complete:function(){
                	plugin._srMessage('data-loadedtxt','complete');
                    container.find('.ups-loaderImg').remove();
                    plugin.$resultsSearchHead.removeClass(UPS.configs.inActiveClass);
                    plugin.$resultsFooter.removeClass(UPS.configs.inActiveClass);
                    plugin._removeSrMessage();
                    //if (UPS.configs.viewport.size === 'small') {
                    // $('html, body').animate({
                    //     scrollTop: (plugin.$results.offset().top+100)
                    // }, 300, 'easeOutExpo');
                    //}
                }
            }
        });

        return plugin;
    };

    Plugin.prototype.processSearchSuccessResp=function(response){
        var plugin=this;
        if(response.data.responseJSON.SearchResponse!==undefined && response.data.responseJSON.SearchResponse.Response.ResponseStatus.Code==='1'){
            plugin._setResults(response.data.responseJSON);
        }else{
            plugin._setNoResults();
            plugin._dataError();
        }
    };

    Plugin.prototype._setResults = function (data) {
        var plugin = this;

        plugin.$resultsSearchType.text(plugin.$lang.resultsFor);
        if(plugin.$input.val()) {
            plugin.$resultsSearchText.text(plugin.$input.val());
        } else {
            plugin.$resultsSearchText.text(plugin.$input.attr('placeholder'));
        }
        plugin.$searchBtn.attr("data-on-site-search-result",data.SearchResponse.TotalNumResults);
        var pageNumber= (Number(plugin.$data.SearchRequest.StrOffSet) * Number(plugin.$maxDataDisplay));
        plugin.$resultsNumContainer.text( (pageNumber +1) + " - " + (data.SearchResponse.TotalNumResults < (pageNumber+plugin.$maxDataDisplay)?data.SearchResponse.TotalNumResults: (pageNumber+plugin.$maxDataDisplay)) + " "+plugin.$lang.of+" " + data.SearchResponse.TotalNumResults + " "+plugin.$lang.results);
        plugin.$resultsFooter.removeClass('footer-hidden');

        //console.log(3,plugin.$startPagination);
        //plugin.$resultsContainer.empty();
        if(data.SearchResponse.Summaries){
            if(!$.isArray(data.SearchResponse.Summaries)){
                data.SearchResponse.Summaries = $.makeArray(data.SearchResponse.Summaries);
            }
            if(data.SearchResponse.Summaries.length>0){

                $(data.SearchResponse.Summaries).each(function (index) {
                    plugin.$resultsContainer.append(
                        "<div class='result'>"+(this.Title!==undefined?"<h4><a class='ups-analytics' data-on-site-search-result-position='"+plugin.$startPagination+":"+(index+1)+"' data-on-site-search-term='"+plugin.$input.val()+"' data-link-name='search:"+this.Title+"' href='"+this.URL+"' data-content-block-id='M27' data-event-id='21'>"+this.Title+"</a></h4>":'')+this.Summary+"<div><a href='"+this.URL+"' class='ups-link ups-analytics' data-link-name='search:"+this.URL+"' data-on-site-search-result-position='"+plugin.$startPagination+":"+(index+1)+"' data-on-site-search-term='"+plugin.$input.val()+"' data-content-block-id='M27' data-event-id='21' >"+this.URL+"</a></div></div>"
                    );
                });
                plugin.$resultsPag.removeClass("ups-pageHide");
                plugin.$resultsPag.empty();
                var numberOfPages = Math.ceil(data.SearchResponse.TotalNumResults / plugin.$maxDataDisplay);

                for (var i = 1; i < numberOfPages+1; i++) {
                    plugin.$resultsPag.append("<button class='pag'>"+i+"</button>");
                }
                $(plugin.$resultsPag.children().get(plugin.$startPagination-1)).addClass('active');
                $(plugin.$resultsPag.children().get(plugin.$startPagination)).attr('data-prev-selected', 'true');
                plugin.$pagBtn = plugin.$resultsPag.find('button.pag');

                if(numberOfPages===1){
                    $(".first,.prev,.last,.next").addClass("ups-pageHide");
                }else if(Number(plugin.$startPagination)===1 ){
                    $(".first,.prev").addClass("ups-pageHide");
                    $(".last,.next").removeClass("ups-pageHide");
                }else if(Number(plugin.$startPagination)===plugin.$resultsPag.find("button.pag").length){
                    $(".first,.prev").removeClass("ups-pageHide");
                    $(".last,.next").addClass("ups-pageHide");
                }else{
                    $(".first,.prev,.last,.next").removeClass("ups-pageHide");
                }

                if(Number(plugin.$startPagination) > plugin.$paginationPositioning ){       //  8 > 6
                    if(numberOfPages> plugin.$maxDataDisplay){                      // 12 > 10
                        plugin.$hasPageMove=true;
                        var endFrom=plugin.$maxDataDisplay;
                        var startFrom= Number(plugin.$startPagination)-plugin.$paginationPositioning;

                        if(Number(plugin.$startPagination) < (numberOfPages-3) ){
                            endFrom= (Number(plugin.$startPagination)+3);
                        }else{
                            startFrom=(numberOfPages-endFrom);
                            endFrom= numberOfPages;
                        }
                        $(plugin.$resultsPag.children().get(startFrom)).prevAll().addClass("ups-inactive");
                        $(plugin.$resultsPag.children().get(endFrom)).nextAll().addClass("ups-inactive");
                    }else{

                    }
                }else{
                    $(plugin.$resultsPag.children().get(plugin.$maxDataDisplay-1)).nextAll().addClass("ups-inactive");
                }
                plugin._addClickEvent();
            }
        }else if(data.SearchResponse.Suggestion) {
            plugin.$resultsContainer.append("<div class='did-you-mean'><button class='ups-link'>"+plugin.$lang.didYouMean+" &quot;<span class='help-search'>"+data.SearchResponse.Suggestion+"</span>&quot;?</button></div>");

            plugin.$resultsContainer.find('.did-you-mean button').on('click', function (e) {
                //plugin.locUrl = 'ajax/'+$(e.currentTarget).find('.help-search').text()+'.json';
                plugin.$input.val($(e.currentTarget).find('.help-search').text());
                plugin.tempLoc = plugin.$input.val();
                plugin._getResults();
            });
            plugin.$resultsNumContainer.empty();
            plugin.$resultsFooter.addClass("footer-hidden");
        }else {
            plugin.$resultsSearchType.text(plugin.$lang.noResults);
            plugin.$resultsNumContainer.empty();
            plugin.$resultsFooter.addClass("footer-hidden");
        }

        plugin._setAnalytics(plugin.$searchBtn);
        //plugin.$results.addClass(UPS.configs.activeClass);

        // $('html, body').animate({
        //     scrollTop: (plugin.$T.offset().top -100)
        // }, 300, 'easeOutExpo');

        return plugin;
    };

    Plugin.prototype._setAnalytics=function(_self){
        var plugin=this;
        var component={};
        var onSiteSearchNoResults='';
        var onSiteSearchResults='';
        if (_self.attr("data-on-site-search-term") !== undefined) {
            component.on_site_search_term = _self.attr("data-on-site-search-term");
        }
        component.on_site_search_type_super_category=plugin.$dropdown.find(":selected").text();
        if (_self.attr("data-on-site-search-result") !== undefined) {
            onSiteSearchResults = _self.attr("data-on-site-search-result");
            if (_self.attr("data-on-site-search-result") > 0) {
                onSiteSearchNoResults = "0";
            } else {
                onSiteSearchNoResults = "1";
            }
        }
        if (_self.attr("data-event-id") !== undefined) {
            component.event_id = _self.attr("data-event-id");
        }
        if (_self.attr("data-content-block-id") !== undefined) {
            component.content_block_id = _self.attr("data-content-block-id");
        }
        component.link_page_name =document.title;
        component.link_name = _self.text();
        if(typeof utag_data!=='undefined' && utag_data!==undefined){
            component.user_type=utag_data.user_type;
            component.site_indicator=utag_data.site_indicator;
            component.page_country_code=utag_data.page_country_code;
            component.state=utag_data.state;
            component.city=utag_data.city;
            component.myups_login_state=utag_data.myups_login_state;
            component.page_language=utag_data.page_language;
            component.page_id= utag_data.page_id;
        }
        //console.log("search button",component);
        if(typeof utag !=='undefined' && utag!==undefined){
            utag.track("link", component);
        }
        //add inb utag_data
        /*var utag_data={};
         utag_data.on_site_search_term = component.on_site_search_term;
         utag_data.on_site_search_results = onSiteSearchResults;
         utag_data.on_site_search_noresults = onSiteSearchNoResults;

         console.log("page Load search result",utag_data);*/
        /*console.log("View Track search result",{
         event_id:"0",
         on_site_search_term:component.on_site_search_term,
         on_site_search_results:onSiteSearchResults,
         on_site_search_noresults:onSiteSearchNoResults,
         on_site_search_type_super_category:component.on_site_search_type_super_category,
         user_type:component.user_type,
         site_indicator:component.site_indicator,
         page_country_code:component.page_country_code,
         state:component.state,
         city:component.city,
         myups_login_state:component.myups_login_state,
         page_language:component.page_language
         });*/
        console.log("Search On Load",{
            event_id:"0",
            on_site_search_term:component.on_site_search_term,
            on_site_search_results:onSiteSearchResults,
            on_site_search_noresults:onSiteSearchNoResults,
            on_site_search_type_super_category:component.on_site_search_type_super_category,
            user_type:component.user_type,
            site_indicator:component.site_indicator,
            page_country_code:component.page_country_code,
            state:component.state,
            city:component.city,
            myups_login_state:component.myups_login_state,
            page_language:component.page_language,
            page_id:utag_data.page_id
        });
        if(typeof utag !=='undefined' && utag!==undefined){
            utag.track("view", {
                event_id:"0",
                on_site_search_term:component.on_site_search_term,
                on_site_search_results:onSiteSearchResults,
                on_site_search_noresults:onSiteSearchNoResults,
                on_site_search_type_super_category:component.on_site_search_type_super_category,
                user_type:component.user_type,
                site_indicator:component.site_indicator,
                page_country_code:component.page_country_code,
                state:component.state,
                city:component.city,
                myups_login_state:component.myups_login_state,
                page_language:component.page_language,
                page_id:utag_data.page_id
            });
        }

    };

    Plugin.prototype._setNoResults = function() {
        var plugin = this;

        plugin.$searchBtn.attr("data-on-site-search-result",0);
        plugin.$resultsSearchType.text(plugin.$lang.noResults);
        if(plugin.$input.val()) {
            plugin.$resultsSearchText.text(plugin.$input.val());
        } else {
            plugin.$resultsSearchText.text(plugin.$input.attr('placeholder'));
        }
        plugin.$resultsNumContainer.addClass('ups-pageHide').empty();
        plugin.$resultsFooter.addClass('footer-hidden');

        //plugin.$resultsContainer.empty();

        plugin._setAnalytics(plugin.$searchBtn);
        //plugin.$results.addClass(UPS.configs.activeClass);
        // $('html, body').animate({
        //     scrollTop: (plugin.$T.offset().top -100)
        // }, 300, 'easeOutExpo');
        return plugin;
    };

    Plugin.prototype._bindDelegateEvent=function(){

        var plugin= this;

        plugin.$firstBtn.on('click', function (e) { // First Button
            e.preventDefault();
            plugin._paginations(0,true);
            plugin._getResults();
        });

        plugin.$prevBtn.on('click', function (e) { // previous Button
            e.preventDefault();
            //var _self=$(this);
            var tempBtn = plugin.$resultsPag.find('.active');

            if(tempBtn.index()>0){
                plugin._paginations(tempBtn.index(),true);
                plugin._getResults();
            }

            // if (UPS.configs.viewport.size === 'small') {
            //     $('html, body').animate({
            //         scrollTop: plugin.$results.offset().top
            //     }, 300, 'easeOutExpo');
            // }
        });

        plugin.$lastBtn.on('click', function (e) {  // Last Button
            e.preventDefault();
            plugin._paginations(plugin.$resultsPag.find("button").length,true);
            plugin._getResults();
        });

        plugin.$nextBtn.on('click', function (e) {  // Next button
            e.preventDefault();
            var tempBtn = plugin.$resultsPag.find('.active');
            if((tempBtn.index()+1)<plugin.$resultsPag.find("button").length){
                plugin._paginations(tempBtn.index()+2,true);
                plugin._getResults();
            }
            // if (UPS.configs.viewport.size === 'small') {
            //     $('html, body').animate({
            //         scrollTop: plugin.$results.offset().top
            //     }, 300, 'easeOutExpo');
            // }
        });

        return plugin;
    };

    Plugin.prototype._addClickEvent = function() {
        var plugin = this;

        plugin.$pagBtn.on('click', function (e) {  // Pagination Number
            e.preventDefault();
            var _self=$(this);
            plugin.$pagBtn.removeClass('active');
            plugin.$pagBtn.attr('data-prev-selected', 'false');

            $(e.currentTarget).addClass('active');
            $(e.currentTarget).next().attr('data-prev-selected', 'true');
            plugin._paginations(_self.text(),true);
            plugin._getResults();
        });
        return plugin;
    };

    Plugin.prototype._dataError = function() {
        var plugin = this;

        if(!plugin.$infoCopy) {
            plugin.$infoCopy = $('<div class="ups-locFinder_copy"/>').appendTo(plugin.$info);
        }

        //console.log(  jqXHR  );
        plugin.$infoCopy.empty()
            .append('<p class="ups-error">'+plugin.$lang.noResults+'</p>');

        return plugin;
    };

    Plugin.prototype.redirectTracking = function() {
        var plugin=this;
        var trackForm=plugin.$T.find('.ups-searchTrack_form');
        trackForm.find('.ups-trackSearch').val(plugin.tempLoc);
        trackForm.submit();
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
