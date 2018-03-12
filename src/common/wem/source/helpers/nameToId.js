'use strict';

// Export helpers
// The purpose of this help is to return unique IDs based on
// Form input Name

module.exports.register = function (Handlebars, options) {
    Handlebars.registerHelper('nameToId', function (name) {
        if(name == undefined) {
            name = "unNamed";
        }
        return name.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
    });
};
