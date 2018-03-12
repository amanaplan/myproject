/*
 * Module to build publish/ subscribe systems based on Jquery callbacks
 * It can be used by widgets to pass data for testing purposes
 * Author: psanjeevi
 * Date: 10/12/2015 
 * 
 */
 (function($) {
 "use strict";    
 

var topics = {};

$.Topic = function( id ) {
    var callbacks,
        topic = id && topics[ id ];
    if ( !topic ) {
        callbacks = $.Callbacks();
        topic = {
            publish: callbacks.fire,
            subscribe: callbacks.add,
            unsubscribe: callbacks.remove
        };
        if ( id ) {
            topics[ id ] = topic;
        }
    }
    return topic;
};

})(jQuery);