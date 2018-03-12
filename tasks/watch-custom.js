'use strict';

module.exports = function (grunt) {

	grunt.registerMultiTask('watchCustom', 'Compile custom watch tasks', function () {

        //  Create object to define watch tasks. Example output below:
        /*
         *  watch: {
         *      options: {
         *          option: {...}
         *      },
         *      subTask1: {
         *          files: [...],
         *          tasks: [...]
         *      },
         *      subTask2: {
         *          files: [...],
         *          tasks: [...]
         *      }
         *      ...
         *  }
         */

        var task = this,                                          // store the scope of the task
            baseOptions = task.options(),                         // get the base compass options for the targeted environment
            baseTasks = Object.assign({}, baseOptions.baseTasks), // store the base tasks used globally
            subtasks = task.data.tasks,                           // store the instance-based tasks
            ifErrors = false;



        //  remove base tasks from options
        delete baseOptions.baseTasks;


        //  create object extending baseOptions, baseTasks, and subTasks
        var watchOptions = Object.assign({
            options: baseOptions
        }, baseTasks, subtasks);


        //  set the compass options defined above after looping through all the sources
		grunt.config.set('watch', watchOptions);


		//  run the compass task
        grunt.task.run('watch');


        // Fail by returning false if this task had errors
        if (ifErrors) { return false; }
	});
};
