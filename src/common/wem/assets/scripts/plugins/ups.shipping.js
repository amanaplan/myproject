(function( $ ){
    'use strict';
    //alert("Plugin");
    var PLUGIN_NS = 'upsShipping';
    var processShipResponse ='';

    var Plugin = function ( target, options ) {
        var plugin = this;
        plugin.$T = $(target);
        this.options = $.extend(
            true, // deep extend
            {
                DEBUG: false,
                defaultOptionA: 'defaultValue'
            },
            options
        );
        plugin._init( target );
        if (!$('.ups-shipping').is(":visible")){
            return;
        }
        if (plugin.isLogged) {
            plugin.initShipAddress();
        }
        
        return plugin;
    };


    Plugin.prototype.bindDestination = function(obj, elClass) {
      var plugin = this;
              obj.DestAddress.AddressLine1 = $(this.currentForm).find(".select-shipTo option:selected").attr("data-dest-addressline1");
              obj.DestAddress.City = $(this.currentForm).find(".select-shipTo option:selected").text();
              obj.DestAddress.StateProvince = $(this.currentForm).find(".select-shipTo option:selected").attr("data-dest-stateprovince");
                if (plugin.isLogged) {
                  obj.DestAddress.PostalCode = $(this.currentForm).find(".select-shipTo option:selected").attr("data-dest-postalcode");
                } else {
                  obj.DestAddress.PostalCode = $(this.currentForm).find(".shipTo-zipcode" + elClass).val();
                }         
              obj.DestAddress.CountryCode = $(this.currentForm).find(".select-shipTo option:selected").attr("data-dest-countrycode");
          };

    Plugin.prototype.bindOrigin = function (obj, elClass) {
          var plugin = this;
              obj.OriginAddress.AddressLine1 = $(this.currentForm).find(".select-shipFrom option:selected").attr("data-orig-addressline1");
              obj.OriginAddress.City = $(this.currentForm).find(".select-shipFrom option:selected").text();
              obj.OriginAddress.StateProvince = $(this.currentForm).find(".select-shipFrom option:selected").attr("data-orig-stateprovince");
                if (plugin.isLogged) {
                   obj.OriginAddress.PostalCode = $(this.currentForm).find(".select-shipFrom option:selected").attr("data-orig-postalcode");
                   } else {
                    obj.OriginAddress.PostalCode = $(this.currentForm).find(".shipFrom-zipcode" + elClass).val();
                  }
              obj.OriginAddress.CountryCode = $(this.currentForm).find(".select-shipFrom option:selected").attr("data-orig-countrycode");
          };

    Plugin.prototype._init = function() {
        var plugin = this;
        
        var $shippingType = plugin.$T.find('#shipping_type_select');
        if($shippingType.length === 0) {
          $shippingType = plugin.$T.find('#shipping_type_select--qs');
        }
        
        if($shippingType.length){
            plugin._changeForm($shippingType);
            var currentServiceSpeed = $(".select-serviceSpeed--qs, .select-serviceSpeed");
            plugin.shipRequest = '';
            plugin.ajaxShipOptions = '';
            plugin.packageType = '';
            plugin.isLogged = plugin.options.isLoggedIn;
            plugin.sourceInfo = '';
            plugin.isShipChanged = true;
            plugin.currentForm = '';
            plugin.isQuickStartForm ='';
            plugin.locale = $('html').attr('lang');
            plugin.loader = $(plugin.$T).find('.ups-loader');
         
            /***************Process Response**********************/

            processShipResponse = function(response) {
              if (response.data.isError) {
            	  $(plugin.loader).hide();
            	  $(currentServiceSpeed).removeAttr('disabled');
            	 // plugin.processShipNetworkError(response.data.statusText);
              } else {
                if (response.data.responseJSON.hasOwnProperty("Fault")){
                  plugin.processShipErrorResponse();
                } else {
                 plugin.processShipSuccessResponse(response);
               }

             }
           };

        //Listen to Shipping widget ID. When published to this topic, initiate call 'processUserInfoServicesResponse'
            
            $.Topic("ship-1").subscribe(processShipResponse);
            $.Topic("ship-2").subscribe(processShipResponse);
            $.Topic("ship-3").subscribe(processShipResponse);
            $.Topic("ship-4").subscribe(processShipResponse);

            

              // set authentication information
            plugin.authenticationShipInfo = { 
              "UPSSecurity": {
                "UsernameToken": {
                  "Username": authentication.uname,
                  "Password": authentication.upwd,
                },
                "ServiceAccessToken": {
                    "AccessLicenseNumber": authentication.akey
                }
              }
            };

              //user info

              plugin.getShippingUserInfo = {
                "ProfileRetrieveUserInfoRequest": {
                  "Request": {
                    "TransactionReference": {
                      "CustomerContext": "",
                      "TransactionIdentifier": "x"
                    }
                  },
                  //"UserID": "PamPrice"
                }
              };

              // Profile Retrieve Shipping Preferences Request

              plugin.methodInfoRetrieveShippingPref = {
                "ProfileRetrieveShippingPreferencesRequest": {
                  "Request": {
                    "RequestOption": "?",
                    "TransactionReference": {
                      "CustomerContext": "?",
                      "TransactionIdentifier": "?"
                    }
                  }
                }
              };

             // set default request JSON Available Address
             plugin.methodShippingInfoAddress = {
               "AddressBookRetrieveRequest": 
               {
                "Request": "",
                "DetailAddressListIndicator": "Y"
              }
            };

            // set default request JSON for Available services
            plugin.methodShipInfoService = {
             "AvailableServicesRequest": {
              "Request": {
                "TransactionReference": {
                  "CustomerContext": "ShipmentType field is blank. Test will return default of Small Package services"
                }
              },
              "OriginAddress": {
                "AddressLine1": "",
                  "City": "",
                  "StateProvince": "",
                  "PostalCode": "",
                  "CountryCode": ""
              },
              "DestAddress": {
                "AddressLine1": "",
                  "City": "",
                  "StateProvince": "",
                  "PostalCode": "",
                  "CountryCode": ""
              }
            }
          };


            // set default request JSON for Available Freight services
            plugin.methodShipInfoFreightService = {
              "AvlFreightServiceRequest": {
                "Request": {
                  "TransactionReference": {
                    "CustomerContext": "Return ALL freight services valid for US origin and destination addresses provided address includes LTL AM Guaranteed"
                  }
                },
                "FreightType": "BOTH",
                "OriginAddress": {
                  "AddressLine1": "",
                  "City": "",
                  "StateProvince": "",
                  "PostalCode": "",
                  "CountryCode": ""
                },
                "DestAddress": {
                  "AddressLine1": "",
                  "City": "",
                  "StateProvince": "",
                  "PostalCode": "",
                  "CountryCode": ""
                }
              }
            };

          /***********Generate AJAX request**************/

          Plugin.prototype.generateAjaxRequestShip = function(info1, info2) {   
            var plugin = this;
            plugin.shipRequest = '';
            plugin.shipRequest = $.extend(plugin.shipRequest, info1, info2);
          }; 

          /***********Set Ajax options**************/

          Plugin.prototype.setAjaxOptionsShip = function(dataSrcTarget) {
            var plugin = this;
            var ajaxSource = $(".ups-shipping_panel").data("ajax-source-" + dataSrcTarget);
            var widgetID = $(".ups-shipping_panel").data("widget-source-" + dataSrcTarget);

            plugin.ajaxShipOptions = {
              id: widgetID,
              url: ajaxSource,        
              data:  JSON.stringify(plugin.shipRequest),
              dataType:"json"
            };  
          };

          /**************Publishto AJAX topic to initiate the call*******************/

          Plugin.prototype.publishShipAjaxCall = function(ajaxShipOptions) {
            $.Topic("Ajax").publish({
              ajaxOptions: ajaxShipOptions      
            }); 
          };  


            $shippingType.on('change', function() {
                plugin._changeForm(this);
            });
            plugin.bindEvents();
        }
    };
    
    Plugin.prototype._changeForm = function(select) {
        
        var plugin = this;
        
        var selectedType = $(select).val();

        var formElements = plugin.$T.find('.ups-form_group:not(.ups-shipping_type), .ups-form_ctaGroup, .ups-cta_primary');

        formElements.hide();

        formElements.find('textarea, input').val('');
        formElements.find('select').prop('selectedIndex',0);
        formElements.find('.ups-checkbox-custom').prop('checked', false);
        formElements.find('textarea, input, select').prop('disabled', true);
        
        
        //reset error states
        formElements.removeClass('ups-error');
        plugin.$T.find('.ups-form_errorWrap').remove();
        plugin.$T.find('.ups-error_exclaim').remove();

        switch(selectedType) {
            case 'package_letter':
                plugin.$T.find('.ups-shipping_package').show().find('textarea, input, select').prop('disabled', false);
                plugin.$T.find('.ups-cta_primary').show();
                break;
            case 'returns':
                if(plugin.$T.hasClass('ups-authenticated')) {
                    plugin.$T.find('.ups-shipping_returns').show().find('textarea, input, select').prop('disabled', false);
                    plugin.$T.find('.ups-cta_primary').show();
                } else {
                    //plugin.$T.find('.ups-shipping_returns').show().find('textarea, input, select').prop('disabled', false);
                    //plugin.$T.find('.ups-cta_primary').hide();
                	formElements.find('textarea, input, select').prop('disabled', true);
                	plugin.$T.find('.ups-shipping_returnsNA').show();
                }
                break;
            case 'freight':
                if(plugin.$T.hasClass('ups-authenticated')) {
                    plugin.$T.find('.ups-shipping_freight').show().find('textarea, input, select').prop('disabled', false);
                    plugin.$T.find('.ups-cta_primary').show();
                } else {
                    formElements.find('textarea, input, select').prop('disabled', true);
                    plugin.$T.find('.ups-shipping_freightNA').show();
                }
                break;
        }
    };
    
    Plugin.prototype._validateForm = function() {
        var plugin = this;
        
        var formGroups = plugin.$T.find('.ups-form_group.ups-form_required');
        
        var submit = true;
        
        
        for(var i = 0; i<formGroups.length; i++) {
            var inputs = $(formGroups[i]).find('.ups-input_wrapper');        
            var completed = true;
            
            if(inputs.hasClass('ups-text_wrapper')) {
                if(inputs.find('.ups-form_input').val() === '') {
                    completed = false;
                }
            } else if(inputs.hasClass('ups-dropdown_wrapper')) {
                if(inputs.find('.ups-dropdown').val() === '') {
                    completed = false;
                }
            } else if(inputs.hasClass('ups-textArea_wrapper')) {
                if(inputs.find('.ups-textArea').val() === '') {
                    completed = false;
                }
            } else if(inputs.hasClass('ups-buttonList_wrapper')) {
                if(inputs.parent().find('.ups-radio-custom:checked').length === 0) {
                    completed = false;
                }
            } else if(inputs.hasClass('ups-checkbox')) {
                if(inputs.parent().find('.ups-checkbox-custom:checked').length === 0) {
                    completed = false;
                }
            }
            
            if(completed === false) {
                submit = false;
                if(!$(formGroups[i]).hasClass('ups-error')) {
                    $(formGroups[i]).find('label').prepend('<span class = "ups-error_exclaim">[ ! ]</span>');
                    $(formGroups[i]).addClass('ups-error');
                }
            } else {
                $(formGroups[i]).removeClass('ups-error');
                $(formGroups[i]).find('.ups-error_exclaim').remove();
            }
        }
        
        if(!submit){
            plugin.$T.addClass('ups-error_show');
        }
        
        return submit;
    };
    
    
    /** #### JQUERY HOOK #### */
    $.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        var plugin = this;
        if (!$(plugin).length) {
            return $(plugin);
        }
        var instance = $(plugin).data(PLUGIN_NS);

        if ( instance && methodOrOptions.indexOf('_') !== 0 && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
            return instance[ methodOrOptions ]( Array.prototype.slice.call( arguments, 1 ) );
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            instance = new Plugin( $(plugin), methodOrOptions );
            $(plugin).data( PLUGIN_NS, instance );
            return $(plugin);
        } else if ( !instance ) {
            $.error( 'Plugin must be initialised before using method: ' + methodOrOptions );
        } else if ( methodOrOptions.indexOf('_') === 0 ) {
            $.error( 'Method ' +  methodOrOptions + ' is private!' );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist.' );
        }
    };
    
      /***************Process Success Response**********************/

       Plugin.prototype.processShipSuccessResponse = function(resp) {
        var plugin = this;
        //loaderImage = $(plugin.$T).find('.ups-loader');
        var result = resp.data.responseJSON;
        if (result.AddressBookRetrieveResponse) {
          plugin.renderShippingAddress(result.AddressBookRetrieveResponse.DetailAddressList.DetailAddressListElement);
        } else if (result.AvailableServicesResponse) {
          plugin.renderShipServices(result.AvailableServicesResponse.AvailableServices);
         //  plugin.currentServiceSpeed.attr("disabled", false);
         //  $(loaderImage).hide();
        } else if (result.AvlFreightServiceResponse) {
          plugin.renderFreightServices(result.AvlFreightServiceResponse.AvlFreightServices);
           plugin.currentServiceSpeed.attr("disabled", false);
           // $(loaderImage).hide();
        } else if (result.ProfileRetrieveShippingPreferencesResponse) {
          plugin.renderShippingPrefServices(result.ProfileRetrieveShippingPreferencesResponse.ShippingPreferences);
        } else if (result.ProfileRetrieveUserInfoResponse) {
          plugin.renderUserInfoServices(result.ProfileRetrieveUserInfoResponse.UserInformation.PhysicalAddress);
        }
      };

      /***************Process Error Response**********************/

      Plugin.prototype.processShipErrorResponse = function() {
    	  var plugin = this;
    	  plugin.$T.find(".ups-shipping .ups-widget_panel .ups-widget_errors").show();
      };

      /***************Network Error Response*********************

      Plugin.prototype.processShipNetworkError = function(status) {
        //var errorMessage = status;
      };

      /***************Bind the Response to drop downs**********************/

      Plugin.prototype.bindToDropDown = function(items, dataOptions) {
        $.each(items,function(){
          //if($(this).attr("data-isLogged") === "false")
            $(this).html(dataOptions);
        });
      };

      Plugin.prototype.renderShippingAddress = function(data) {
        var plugin = this;
        //var options, index, selectTo, option; Comment 1 
        var options, index, selectTo, option = "<option value=''>"+plugin.options.pageContent.shipTo+"</option>";
        selectTo = $(".select-shipTo");
      //  selectTo = $("#ups-shipping_to_select--qs, #ups-shipping_to_select");
        options = data; 
        for (index = 0; index < options.length; ++index) {
          var result = options[index];
          option += "'<option value= '"+result.PhysicalAddress.City+ 
                    "'data-dest-addressid= '"+result.AddressID+ 
                    "'data-dest-name= '"+result.Name+ "' data-dest-contactname= '"+result.ContactName+"' data-dest-countrycode='"+result.PhysicalAddress.Country+
                    "' data-dest-stateprovince = '"+result.PhysicalAddress.StateProvince+
                    "' data-dest-postalcode = '"+result.PhysicalAddress.PostalCode+
                    "' data-dest-phnumber = '"+result.Phone.Number+
                    "' data-dest-extension = '"+result.Phone.Extension+
                    "' data-dest-addressline1 ='"+result.PhysicalAddress.AddressLine1+
                    "' data-dest-addressline2 ='"+result.PhysicalAddress.AddressLine2+ 
                    "' data-dest-addressline3 ='"+result.PhysicalAddress.AddressLine3+ 
                    "' data-dest-email ='"+result.EmailAddress + 
                    "'>" + result.PhysicalAddress.City + " </option>";
        }

       plugin.bindToDropDown(selectTo, option);

      };

      Plugin.prototype.renderShipServices = function(data) {
        var plugin = this;
        var options, index, selectService, option = "<option value=''>"+plugin.options.pageContent.shipService+"</option>"; // Comment 2 : Select a service type
        // selectService = $("#ups-shipping_type--qs, #ups-shipping_type");
        selectService = $(".select-serviceSpeed" + plugin.isQuickStartForm);
        options = data; 
        if (!$.isArray(data)){
          option += "<option value= "+data.ServiceType+">" + data.ServiceName + "</option>";
        }

        else {
          for (index = 0; index < options.length; ++index) {
            var result = options[index];
            option += "<option value= "+result.ServiceType+">" + result.ServiceName + "</option>";
          }
       }
        plugin.bindToDropDown(selectService, option);
        //selectService.innerHTML = option;
        plugin.isShipChanged = false;
      
      };


      Plugin.prototype.renderFreightServices = function(data) {
        var plugin = this;
        var options, index, selectFreight, option;
        selectFreight = plugin.currentServiceSpeed;
        plugin.isShipChanged = false;
        options = data; 
        for (index = 0; index < options.length; ++index) {
          var result = options[index];
          option += "<option value= "+result.FreightServicesType+">" + result.FreightServiceName + "</option>";
        }

        plugin.bindToDropDown(selectFreight, option);
      };

      Plugin.prototype.renderShippingPrefServices = function(data) {
        var plugin = this;
        if(data.PreferredShipFromAddress){
         plugin.methodShipInfoService.AvailableServicesRequest.OriginAddress = data.PreferredShipFromAddress;
         plugin.methodShipInfoService.AvailableServicesRequest.OriginAddress.CountryCode = plugin.methodShipInfoService.AvailableServicesRequest.OriginAddress.Country;
         plugin.initShipServices();
        } else {
          plugin.initUserInfoShipServices();
        } 

      };

      Plugin.prototype.renderUserInfoServices = function(data) {
          var plugin = this;
          plugin.methodShipInfoService.AvailableServicesRequest.OriginAddress = data.PhysicalAddress;
          if(plugin.packageType === "freight"){
            plugin.methodShipInfoFreightService.AvlFreightServiceRequest.OriginAddress = data;
            plugin.methodShipInfoFreightService.AvlFreightServiceRequest.OriginAddress.CountryCode = data.Country;
            plugin.initShipFreightServices();
          } else {
           plugin.initShipServices();
          }
      };

      Plugin.prototype.initShipAddress = function(){
           var plugin = this;
           $.Topic("ship").subscribe(processShipResponse);
           var req1, req2;
            req1 = plugin.authenticationShipInfo;
            req2 = plugin.methodShippingInfoAddress;
            plugin.generateAjaxRequestShip(req2);
            plugin.setAjaxOptionsShip("address");
            plugin.publishShipAjaxCall(plugin.ajaxShipOptions);
          };


          Plugin.prototype.initShipServices = function(){
            var plugin = this;
            var req1, req2;
            req1 = plugin.authenticationShipInfo;
            req2 = plugin.methodShipInfoService;
            plugin.generateAjaxRequestShip(req2);
            plugin.setAjaxOptionsShip("services");
            plugin.publishShipAjaxCall(plugin.ajaxShipOptions);
          };

          
          Plugin.prototype.initShipFreightServices = function(){
            var plugin = this;
            var req1, req2;
            req1 = plugin.authenticationShipInfo;
            req2 = plugin.methodShipInfoFreightService;
            plugin.generateAjaxRequestShip(req2);
            plugin.setAjaxOptionsShip("freightservices");
            plugin.publishShipAjaxCall(plugin.ajaxShipOptions);
          };


          Plugin.prototype.initProfileShippingPrefServices = function(){
            var plugin = this;
            var req1, req2;
            req1 = plugin.authenticationShipInfo;
            req2 = plugin.methodInfoRetrieveShippingPref;
            plugin.generateAjaxRequestShip(req2);
            plugin.setAjaxOptionsShip("shippingpreference");
            plugin.publishShipAjaxCall(plugin.ajaxShipOptions);
          };

          Plugin.prototype.initUserInfoShipServices = function(){
            var plugin = this;
             var req1, req2;
            req1 = plugin.authenticationShipInfo;
            req2 = plugin.getShippingUserInfo;
            plugin.generateAjaxRequestShip(req2);
            plugin.setAjaxOptionsShip("userinfo");
            plugin.publishShipAjaxCall(plugin.ajaxShipOptions);
        };

        Plugin.prototype._setAnalytics=function(_selfInstance){
          //var plugin=this;
          var component={
              link_page_name: document.title
          };
          if (_selfInstance.attr('data-event-id') !== undefined) {
              component.event_id = _selfInstance.attr('data-event-id');
          }
          if (_selfInstance.attr('data-content-block-id') !== undefined && _selfInstance.attr('data-content-block-id') !== '') {
              component.content_block_id = _selfInstance.attr('data-content-block-id');
          }
          component.link_name = _selfInstance.text().trim() || _selfInstance.val().trim();
          if(typeof utag_data!=='undefined' && utag_data!==undefined){
              component.user_type=utag_data.user_type;
              component.site_indicator=utag_data.site_indicator;
              component.page_country_code=utag_data.page_country_code;
              component.state=utag_data.state;
              component.city=utag_data.city;
              component.myups_login_state=utag_data.myups_login_state;
              component.page_language=utag_data.page_language;
          }
          if(typeof utag!=='undefined' && utag!==undefined){
              utag.track('link',component);  
          }
      };
    
        Plugin.prototype.bindEvents = function() {
            var plugin = this;
            if (plugin.isLogged) {
                plugin.initShipAddress();
            }
        
                  function getServiceSpeed(curEl) { 
               if ($(curEl).val() !== ""){
                // if (plugin.isShipChanged){
                // $(this).attr("disabled", true);
                 $('#loading-image').show();
                plugin.currentServiceSpeed = $(curEl);
                plugin.currentForm = $(curEl).closest( "form" );
                var shippingSelect = $(plugin.currentForm).find(".shipping-type-select[name=shipping_type_select"+plugin.isQuickStartForm+"]").val();   
                plugin.packageType = shippingSelect;
                plugin.bindDestination(plugin.methodShipInfoService.AvailableServicesRequest, plugin.isQuickStartForm);
                if(shippingSelect !== "freight"){  
                    if(!plugin.isLogged){
                      plugin.bindOrigin(plugin.methodShipInfoService.AvailableServicesRequest, plugin.isQuickStartForm);
                      plugin.initShipServices();
                    } else {
                      plugin.initProfileShippingPrefServices();
                    }

                } else {
                  if(plugin.isLogged){
                    plugin.bindDestination(plugin.methodShipInfoFreightService.AvlFreightServiceRequest, plugin.isQuickStartForm);
                    plugin.initUserInfoShipServices();
                  }    
                }
            } 
          }

            if($("#ups-shipping_to_select--qs").length>0){
                plugin.isQuickStartForm = $("#ups-shipping_to_select--qs").attr("data-qs");  
                getServiceSpeed("#ups-shipping_to_select--qs");
            }    
        
          //Submitting form to Shipping application
            $(".ups-start-shipping-btn").click(function() {
                var _selfInstance=$(this),
                //currentEl = _selfInstance.attr('name'),
                parentEl = $(_selfInstance).parents('.mainPageForm'),
                result = $(parentEl).find(".shipping_type_select").val();

                /*$(parentEl).find("input[name='name']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-name"));
                $(parentEl).find("input[name='contactName']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-contactname"));
                $(parentEl).find("input[name='city']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-city"));
                $(parentEl).find("input[name='state']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-stateprovince"));
                $(parentEl).find("input[name='telephone']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-postalcode"));
                $(parentEl).find("input[name='extension']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-phnumber"));
                $(parentEl).find("input[name='street']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-extension"));
                $(parentEl).find("input[name='addr1']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-addressline1"));
                $(parentEl).find("input[name='addr2']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-addressline2"));
                $(parentEl).find("input[name='addr3']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-addressline3"));
                $(parentEl).find("input[name='email']").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-email"));*/
                
                $(parentEl).find("input[name=shipToAddressId]").val($(parentEl).find(".select-shipTo option:selected").attr("data-dest-addressid"));
                
                if ( result === "package_letter") {
                	$(parentEl).attr("action", 'https://www.ups.com/uis/create?ActionOriginPair=ReviewShipmentFromWS___StartSession&loc='+plugin.options.locale);
                } else if (result === "returns") {
                    $(parentEl).attr("action",'https://www.ups.com/uis/create?loc='+plugin.options.locale+'&ActionOriginPair=CreateAReturn___StartSession');
                } else {
                    $(parentEl).attr("action",'https://www.ups.com/uifs/create?client=UIS&nav=UISFreightTab&WBPM_lid=homepage/ct1.html_pnl_shi&loc='+plugin.options.locale);
                }
                plugin._setAnalytics(_selfInstance);
                $(parentEl).submit(); 
            });  

            $('.ups-cta-sign-in').click(function() {
                var _selfInstance=$(this);
                plugin._setAnalytics(_selfInstance);
                window.location='https://www.ups.com/one-to-one/login?sysid=myups&loc='+plugin.options.locale+'&returnto=https://www.ups.com/content/us/en/index.jsx?openModule=Shipping';
               
            });
        
	   
	   
	    /************ Posting Non-logged in form elements to Shipping guest application ****************/  
  
	      $('.ups-cta-ship-guest').click(function(e) {
          e.preventDefault();
          var _selfInstance=$(this);
          var url = "https://www.ups.com/uis/create?ActionOriginPair=ReviewShipmentFromWS___StartSession&WBPM_lid=wgadget/ct1.html_pnl_shi";

          $.each($("form input"), function(){
	          url+=$(this).attr("name") + "=" + $(this).val() + "&";
	        });
        
	        console.log(url);
		      plugin._setAnalytics(_selfInstance);
	        $("form").attr("action", url).submit();
	      });


      // Rendering options in Service speed drop down 
      $(".select-shipTo--qs, .select-shipTo, .select-shipFrom, .select-shipFrom--qs").on("change", function(e){ 
          plugin.isQuickStartForm = $(this).attr("data-qs");
          getServiceSpeed(this);
          e.preventDefault();
          e.stopImmediatePropagation();
      });



     //trigger the change 
    plugin.$T.find('select').on('change', function(){
      var result = $(this).attr("data-change");
      if(result === "shipping"){
        plugin.isShipChanged = true;
      }
    });
    plugin.$T.find('.shipTo-input, .shipFrom-input').on('keyup', function(){
          plugin.isShipChanged = true;
      });
    /*plugin.isQuickStartForm = $("#ups-shipping_to_select--qs").attr("data-qs");
    getServiceSpeed("#ups-shipping_to_select--qs");*/
  };
  
  })(jQuery);