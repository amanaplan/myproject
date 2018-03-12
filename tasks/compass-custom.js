'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('compassCustom', 'Compile custom sass builds using Compass', function () {

        var task = this,                                // store the scope of the task
            environment = task.data.environment,        // value will be 'development' or 'production'
            baseOptions = task.options()[environment],  // get the base compass options for the targeted environment
            ifErrors = false;


        //  add environment to the base compass options
        baseOptions.environment = environment;
        baseOptions = Object.assign(baseOptions, task.data.options);

        //  Create new object to define compass options. This will be set in grunt config later on. Example output below:
        /*
         *  compass: {
         *      subTask1: { options: {...} },
         *      subTask2: { options: {...} },
         *      ...
         *  }
         */

        var compassOptions = {};



        //  loop through the list of files and sources passed in from the grunt config
        this.files.forEach(function(filePair, i) {
            filePair.src.forEach(function(src) {

                //  add a compass sub-task for each source and set its options using the baseOptions
                compassOptions[src] = {
                    options : JSON.parse(JSON.stringify(baseOptions))
                }

                //  add sassDir to the tasks's compass options
                compassOptions[src].options.sassDir = src;


                grunt.log.ok(['compass task configured for \'' + src + '\'']);
            });
        });



        //  set the compass options defined above after looping through all the sources
        grunt.config.set('compass', compassOptions);


        //  run the compass task
        grunt.task.run('compass');


        // Fail by returning false if this task had errors
        if (ifErrors) { return false; }
    });
};
