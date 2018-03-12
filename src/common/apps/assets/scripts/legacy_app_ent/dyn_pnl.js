/************************************************
*   Dynamic Panels Script                       *
*   v2.0                                        *
*   Allows different views of panels and        *
*       subpanels                               *
*                                               *
*************************************************/


/*
* Global variable used for the count of panel groups on the page
*/
var group_cnt = $('div[id^="dyn_pnl_"]').length;

/*
* Changes the display of a panel group to a 
* 	given panel state
* @param (group) The panel group
* @param (panelNo) The state to be displayed
*/
function showPanel(group, panelNo) {
    'use strict';
    
	var pnl_cnt = $('#' + group + ' div[id^="pnl_"]').length;
	var pieces = group.split('_');
	var groupNo = pieces[pieces.length - 1];
	
	//edit for subpanels
	//delete any existing subpanel sides
	$('div[id^="select_subpnl_"]').remove();
	
	if(pnl_cnt > 0) {
		$('#' + group).children('div[id^="pnl_"]').each(function() { 
			if($(this).attr('id') === 'pnl_' + groupNo + '_' + panelNo) {
				$(this).show();
				
				//edit for subpanels
				//check for subpanels in the parent
				var subPnlLength = $('div[id^="subpnl_' + groupNo + '_' + panelNo + '"]').length;
				if (subPnlLength > 0) {
				    $('<div id="select_subpnl_' +
				        groupNo + '_' + panelNo + '"><dl role="presentation"><dt><label for="dyn_subpnl_select_' +
				        groupNo + '_' + panelNo + '_1">SubPanel</label></dt><dd><select id="dyn_subpnl_select_' +
				        groupNo + '_' + panelNo + '_1"></select></dd></dl>').insertAfter('#select_pnl_' + groupNo);
				    
				    //show 1st panel and hide others
				    $('div[id^="subpnl_' + groupNo + '_' + panelNo + '"]')
                                .hide();
				    $('#subpnl_' + groupNo + '_' + panelNo + '_1').show();
				    
				    //position the subpanel selector
				    var subPanelPos = $('div[id^="subpnl_' + groupNo + '_' + panelNo + '"]').offset();
                    
                    $('#select_subpnl_' + groupNo + '_' + panelNo).css({
                        position: 'absolute',
                        top: subPanelPos.top + 'px',
                        left: '1000px',
                        padding: '0 5px',
                        'z-index': 1002
                    });
                    
                    //fill in the subpanels and add an onclick action
                    for (var f = 0; f < subPnlLength; f++) {
                        var elem = $('#select_subpnl_' + groupNo + '_' +
                            panelNo + ' select');
                            
                        var data = $('#subpnl_' + groupNo + '_' + panelNo +
                            '_' + (f + 1)).data('pnl-name');
                        
                        if (data) {
                            elem.append('<option value="' + (f + 1) +
                                '">' + data + '</option>');
                        } else {
                            elem.append('<option value="' + (f + 1) +
                                '">' + (f + 1) + '</option>');
                        }
                    }
                    
                    $('#select_subpnl_' + groupNo + '_' + panelNo + ' select').change(function () {
                        var id = $(this).val();
                        $('div[id^="subpnl_' + groupNo + '_' + panelNo + '"]')
                            .hide();
                        $('#subpnl_' + groupNo + '_' + panelNo + '_' + id).show();
                    });
				}
				//end edit for subpanels
				
			} else {
				$(this).hide();
			}
		});
	}
}

/*
* Iterate through panel groups and set them to
*	display the default state, then position
*	all selectors next to the panel groups
* @see showPanel(group, panelNo)
* @see positionAllSelectors()
*/
function initiatePanels() {
    'use strict';
    
	//show default panel state on page load
	for(var i = 1; i <= group_cnt; i++) {
		showPanel('dyn_pnl_' + i, '1');
	}
	
	//position panel state selectors next to their respective panels
	positionAllSelectors();
}

/*
* Adds the control column to the page and adds
*	some instructional text at the top
*/
function selectorColumn() {
    'use strict';
    
	$('body').prepend('<div id="dynamic_panel_selectors"><style type="text/css">.outline {outline:#FF0000 dotted medium;}</style></div>');
	$('#dynamic_panel_selectors').css({
		position: 'fixed',
		top: '0px',
		left: '1000px',
		'min-height': '100%',
		width: '200px',
	    'border-left': '1px solid #FF7800',
		'border-right': '1px solid #FF7800',
		padding: '5px',
		'background-color': '#FFF2AC',
		'z-index': 1000
	});	
	
	$('body').append('<div id="dyn_pnl_inst"><p>Use controls in this column to select the dynamic panel states on this page.</p><br><p><strong>Note:</strong> The selections are for display purposes only, it does not necessarily represent realistic combinations on panel states for production.</p></div>');
	$('#dyn_pnl_inst').css({
		position: 'absolute',
		top: '0px',
		left: '1000px',
		padding: '5px',
		width: '190px',
		'z-index': 1001
	});
}

/*
* Positions a single selector next to it's associated
* 	panel group
* @param (groupNo) the id of the panel group, ie the 
* 	last number in the group's html id
*/
function positionSelector(groupNo) {
    'use strict';
    
	//position the panel selectors next to the panel
	var pnl_1_pos = $('#dyn_pnl_' + groupNo).position();
	var pnl_1_height = $('#dyn_pnl_' + groupNo).height();
	$('#select_pnl_' + groupNo).css({
		position: 'absolute',
		top: pnl_1_pos.top + 'px',
		left: '1000px',
		padding: '0 5px',
		height: pnl_1_height,
		'z-index': 1002
	});
}

/*
* Iterates through all panel groups and positions
* 	their associated selectors
* @see positionSelector(groupNo)
*/
function positionAllSelectors() {
    'use strict';
    
	for(var i = 1; i <= group_cnt; i++) {
		positionSelector(i);
	}		
}

/*
* Displays a modal dialog containing the html for the 
*	current panel state
* @param (html) the html code to display in the dialog
*/
function showCodeDialog(html) {
    'use strict';
    
	var dlgCode = '<div class="appLvl mod modal dialog" tabindex="-1"><div class="appHead clearfix"><h2>Dynamic Panel Code</h2><ul><li><input type="button" class="btnlnkL closeIcon modalClose" title="Close"></li></ul></div><div class="appBody clearfix"><div class="secLvl secLvlPlain clearfix"><div class="secHead clearfix"><h3>Code Preview:</h3></div><div class="secBody"><pre><code><xmp>' + html + '</xmp></code></pre></div></div></div></div>';
	var modal = $(dlgCode).dialog({
        show: 'fadeIn',
        hide: 'fadeOut',
        resizable: false,
        modal: true,
		dialogClass:'modal',
        height: 600,
        width: 800,
		position: {
			my: 'top',
			at: 'top+70'
		},
		css: {
			'z-index': 101	
		},
        close:function(){
            $(this).dialog('close');
        }
    }); 
	modal.focus();
	$('.modalClose').click(function(e){
			modal.dialog('close');
	});
}

/*
* On page load, set up the selector column and panels
*/
$(document).ready(function() {
    'use strict';
    
	//create and set style for control column
	selectorColumn();

	//put highlight & panel code buttons below select box
	$('<br><input type="button" value="Highlight" class="highlight">&nbsp;<input type="button" value="Show Code" class="pnlCode">').insertAfter('select[id^="dyn_pnl_select_"]');
	
	//set panels to default state and position selectors next to them
	initiatePanels();
	
	/*
	* Highlight panel on page
	*/
	$('.highlight').click(function() {
		var sel = $('.highlight').index($(this)) + 1;
		/*$("#dyn_pnl_" + sel).css({
			outline: "#FF0000 dotted medium"
		});*/
		$('#dyn_pnl_' + sel).toggleClass('outline');
	});
	
	/*
	* Display panel code
	*/
	$('.pnlCode').click(function() {
		var code = '';
		var groupNo = $('.pnlCode').index($(this)) + 1;
		var panelNo = $('#dyn_pnl_select_' + groupNo).val();
		
		var pnlHTML = $('#pnl_' + groupNo + '_' + panelNo).html();
		showCodeDialog(pnlHTML.replace(/\t+/g, ''));
	});
	
	//edit for some browsers, reset the select
	$('select[id^="dyn_pnl_select_"]').val(1);
    
    /*
    * Set onChange function for selectors
    */
    $('select[id^="dyn_pnl_select_"]').change(function() {
        var pieces = $(this).attr('id').split('_');
        var groupNo = pieces[pieces.length - 1];
        showPanel('dyn_pnl_' + groupNo, this.value);
        positionAllSelectors();
    });
});