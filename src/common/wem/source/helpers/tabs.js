'use strict';

// Export helpers
module.exports.register = function (Handlebars, options) {
    Handlebars.registerHelper('tabNextChild', function (index, parent, options) {
        if (parent[index+1].active) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
};