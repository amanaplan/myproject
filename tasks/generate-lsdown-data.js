'use strict';

module.exports = function (grunt) {

	var fs = require('fs-extra');

	grunt.registerTask('generateLSDownData', 'Generate JSON data for parsing LS Down pages in CClamp', function (e) {

		var task = e, // server or dist
			config = grunt.config('generateLSDownData').options,
			templates = config.templates,
			pages = config.pages,
			dest = config.dest,
			rtl = "-rtl",
			ifErrors = false;

		var idx = 0;

        var lsDownAppStart = "<!--LSDownAppCSSStart-->",
            lsDownAppEnd = "<!--LSDownAppCSSEnd-->";


        // Additional Tracking Assets (LTR)
		var trackingStartLTR = "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/master.css\"> \n" +
		                       "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/app/com.ups.trackWeb.css\"> \n" +
		                       "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/print.css\"> \n";

        var trackingEndLTR = "<link rel=\"stylesheet\" href=\"/assets/resources/styles/appCSS/ups.legacy_override_global.css\"> \n" +
                             "<link rel=\"stylesheet\" href=\"/assets/resources/styles/appCSS/ups.legacy_overrideWebTrkApp.css\"> \n";



        // Additional Tracking Assets (RTL)
        var trackingStartRTL = "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/master.css\"> \n" +
                               "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/app/com.ups.trackWeb.css\"> \n" +
                               "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/print.css\"> \n" +
                               "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/rtl.css\"> \n";

        var trackingEndRTL = "<link rel=\"stylesheet\" href=\"/assets/resources/styles/appCSS/ups.legacy_override_global-rtl.css\"> \n" +
                             "<link rel=\"stylesheet\" href=\"/assets/resources/styles/appCSS/ups.legacy_overrideWebTrkApp-rtl.css\"> \n";



        // Additional Shipping Assets (LTR)
        var shippingStartLTR = "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/master.css\"> \n" +
                               "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/app/com.ups.UIS.css\"> \n" +
                               "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/print.css\"> \n";

        var shippingEndLTR = "<link rel=\"stylesheet\" href=\"/assets/resources/styles/appCSS/ups.legacy_override_global.css\"> \n" +
                             "<link rel=\"stylesheet\" href=\"/assets/resources/styles/appCSS/ups.legacy_overrideUIS.css\"> \n";



        // Additional Shipping Assets (RTL)
        var shippingStartRTL = "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/master.css\"> \n" +
                               "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/app/com.ups.UIS.css\"> \n" +
                               "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/print.css\"> \n" +
                               "<link rel=\"stylesheet\" href=\"/assets/resources/styles/v4/rtl.css\"> \n";

        var shippingEndRTL = "<link rel=\"stylesheet\" href=\"/assets/resources/styles/appCSS/ups.legacy_override_global-rtl.css\"> \n" +
                             "<link rel=\"stylesheet\" href=\"/assets/resources/styles/appCSS/ups.legacy_overrideUIS-rtl.css\"> \n";


        /*
            TO ADD MORE APPS
            1. Define string for CSS files to be loaded BEFORE global CSS for both LTR & RTL versions. (follow approach above for Tracking & Shipping)
            2. Define string for CSS files to be loaded AFTER global CSS for both LTR & RTL version. (follow approach above for Tracking & Shipping)
            3. Add methods to output JSON for each app - see example below: function outputTrackingVersion(){...}
            4. Call method within readdirSync loop - see example below: outputTrackingVersion(file, JSON.parse(JSON.stringify(jsonData)), isRtl);
        */




        try {
            fs.readdirSync(pages).forEach(function (file) {
                if (file.indexOf("ls_down_") > -1) {
                    var data = fs.readFileSync(pages + file, 'utf-8');


                    // CHECK FOR NEEDED ELEMENTS IN DATA
                    if(data.indexOf('<head>') == -1){
                        grunt.log.error('<head> element not found in ' + file);
                        ifErrors = true;
                    }
                    if(data.indexOf('<header') == -1){
                        grunt.log.error('<header> element not found in ' + file);
                        ifErrors = true;
                    }
                    if(data.indexOf('<footer') == -1){
                        grunt.log.error('<footer> element not found in ' + file);
                        ifErrors = true;
                    }


                    // GRAB CSS STRINGS
                    var cssTemp = data;
                    var arrCss = cssTemp.split('<link');
                    var isRtl = false;


                    // CHECK IF PAGE IS LTR OR RTL
                    for (var i = 0; i < arrCss.length; i++) {
                        var nodeCss = arrCss[i].replace(/\s+/g, '');
                        if (nodeCss.indexOf('rel="stylesheet') > -1) {
                            var node = nodeCss.substring(nodeCss.indexOf('href='), nodeCss.indexOf('.css">'));
                            if (node.indexOf(rtl) > -1) {
                                isRtl = true;
                            }
                        }
                    }


                    // CREATE JSON MATCHING C-CLAMP RESPONSE
                    var jsonData = {
                        "metadata": data.substring(data.indexOf('<head>') + 6, data.indexOf('</head>')),
                        "header": data.substring(data.indexOf('<header'), data.indexOf('</header>') + 9),
                        "footer": data.substring(data.indexOf('<footer'), data.indexOf('</footer>') + 9),
                        "neck": "<div class=\"container-fluid iw_section\"> <div class=\"row iw_row iw_stretch\"> <div class=\"iw_columns col-lg-12\"> <div class=\"iw_component\"> <div id=\"ups-fw_legacy_app_wrap\"> <div class=\"ups-fw_legacy_app_inner\">",
                        "ankle": "</div> </div> </div> </div> </div> </div>",
                        "rightRail": null
                    };


                    // SAVE JSON TO FILE FOR EACH PAGE
                    outputDefaultVersion(file, JSON.parse(JSON.stringify(jsonData)), isRtl);
                    outputTrackingVersion(file, JSON.parse(JSON.stringify(jsonData)), isRtl);
                    outputShippingVersion(file, JSON.parse(JSON.stringify(jsonData)), isRtl);
                }
            });
		}
        catch (e) {
           grunt.log.error(e);
           ifErrors = true;
        }


        /* Save Default Version */
		function outputDefaultVersion(file, jsonData, isRtl){
		    jsonData.metadata = jsonData.metadata.replace(lsDownAppStart, '');
        	jsonData.metadata = jsonData.metadata.replace(lsDownAppEnd, '');
            fs.outputFileSync(dest + file.replace('.html', '.json'), JSON.stringify(jsonData), 'utf-8');
		}


        /* Save Version with Tracking APP */
		function outputTrackingVersion(file, jsonData, isRtl){
		    if(isRtl) {
		        jsonData.metadata = jsonData.metadata.replace(lsDownAppStart, trackingStartRTL);
		        jsonData.metadata = jsonData.metadata.replace(lsDownAppEnd, trackingEndRTL);
		    }
		    else {
		        jsonData.metadata = jsonData.metadata.replace(lsDownAppStart, trackingStartLTR);
		        jsonData.metadata = jsonData.metadata.replace(lsDownAppEnd, trackingEndLTR);
		    }
            fs.outputFileSync(dest + file.replace('.html', '-tracking.json'), JSON.stringify(jsonData), 'utf-8');
		}


        /* Save Version with Shipping APP */
		function outputShippingVersion(file, jsonData, isRtl){
		    if(isRtl) {
		        jsonData.metadata = jsonData.metadata.replace(lsDownAppStart, shippingStartRTL);
		        jsonData.metadata = jsonData.metadata.replace(lsDownAppEnd, shippingEndRTL);
		    }
		    else {
		        jsonData.metadata = jsonData.metadata.replace(lsDownAppStart, shippingStartLTR);
		        jsonData.metadata = jsonData.metadata.replace(lsDownAppEnd, shippingEndLTR);
		    }
            fs.outputFileSync(dest + file.replace('.html', '-shipping.json'), JSON.stringify(jsonData), 'utf-8');
		}



		// Fail by returning false if this task had errors
        if (ifErrors) { return false; }
	});
};
