'use strict';

// Export helpers
module.exports.register = function (Handlebars, options) {
    Handlebars.registerHelper('isNthChild', function (index, nth, options) {
        if (index == nth) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper('isNotNthChild', function (index, nth, options) {
        if (index != nth) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });

    Handlebars.registerHelper('isNthInterval', function (index, interval, val, options) {
        if ((index+1) % interval == val) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
};