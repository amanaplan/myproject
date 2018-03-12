'use strict';

// Export helpers
module.exports.register = function (Handlebars, options) {
    Handlebars.registerHelper("setIndexVar", function(index) {
         this.index = index;
    });
};
