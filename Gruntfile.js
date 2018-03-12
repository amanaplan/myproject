/*
 * Generated on 2014-05-05
 * generator-assemble v0.4.11
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2014 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

const path = require('path');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.wem_src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.wem_src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load custom tasks
    require('./tasks/generate-lsdown-data')(grunt);
    require('./tasks/generate-timestamp-css')(grunt);
    require('./tasks/compass-custom')(grunt);
    require('./tasks/watch-custom')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt, {
        pattern : ['grunt-*', 'assemble']
    });
    var serveStatic = require('serve-static');

    var appConfig = {
        wem_src: 'src/common/wem',
        app_src: 'src/common/apps',
        assets_src: 'assets',
        assets_dist: 'assets/resources',

        dist: 'dist',
        tmp: 'tmp',
        test: 'test',
        pack: 'pack',
        srcApp: '**',
        ts: '.ts',

        angApp: require('./bower.json').angPath || 'app'
    };

    var vendorList = [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery-ui/jquery-ui.min.js',
        'bower_components/jquery-cookie/jquery.cookie.js',
        'bower_components/h5f/h5f.min.js',
        'bower_components/slick-carousel/slick/slick.min.js',
        'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
        'bower_components/parsleyjs/dist/parsley.min.js',
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.min.js',
        'bower_components/ng-file-upload/ng-file-upload.min.js',
        'bower_components/angular-sanitize/angular-sanitize.min.js',
        'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js',
        'bower_components/ng-idle/angular-idle.min.js',
        'bower_components/angular-messages/angular-messages.min.js',
        'bower_components/angular-animate/angular-animate.min.js'
    ];


    // Project configuration.
    grunt.initConfig({

        config: appConfig,

        ts: {
            dev: {
                src: [
                    '<%= config.app_src %>/<%= config.assets_src %>/angular/**/*.ts',
                    'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/angular/**/*.ts'
                ],
                dest: '<%= config.ts %>',
                options: {
                    rootDir: 'src',
                    module: 'system',
                    moduleResolution: 'node',
                    target: 'es5',
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    noImplicitAny: false,
                    false:'never',
                    typeRoots: [
                        "node_modules/@types"
                    ],
                    lib: [
                        "es2016",
                        "dom"
                    ]
                }
            }
        },

        webpack: {
            dev : {
                entry : './src/apps/<%= config.srcApp %>/<%= config.assets_src %>/angular/main',
                output : {
                    path : path.resolve(__dirname + '/<%= config.tmp %>/<%= config.assets_dist %>/angular/<%= config.srcApp %>/<%= config.assets_src %>/angular'),
                    filename : "./bundle.js"
                },
                resolve : {
                    extensions : ['.js', '.ts']
                },
                module : {
                    rules : [{
                        test : /\.ts/,
                        loader : 'ts-loader',
                        options : {
                            transpileOnly: true
                        }
                    }]
                },
                plugins: [
                    new ForkTsCheckerWebpackPlugin()
                ]
            },
            prod : {
                entry : './src/apps/<%= config.srcApp %>/<%= config.assets_src %>/angular/main',
                output : {
                    path : path.resolve(__dirname + '/<%= config.dist %>/<%= config.assets_dist %>/angular/<%= config.srcApp %>/<%= config.assets_src %>/angular'),
                    filename : "./bundle.js"
                },
                resolve : {
                    extensions : ['.js', '.ts']
                },
                module : {
                    loaders : [{
                        test : /\.ts/,
                        loaders : ['ts-loader'],
                        exclude : /node_modules/
                    }]
                }
            }
        },


        watchCustom: {
            options: {
                spawn: false,
                livereload: true,
                baseTasks: {
                    bower: {
                        files: ['bower.json'],
                        tasks: ['wiredep']
                    },
                    jsTest: {
                        files: ['<%= config.test %>/spec/{,*/}*.js'],
                        tasks: ['newer:jshint:test', 'karma']
                    },
                    livereload: {
                        options: {
                            livereload: '<%= connect.options.livereload %>'
                        },
                        files: [
                            '<%= config.tmp %>/{,*/}*.html',
                            '<%= config.tmp %>/<%= config.assets_dist %>/styles/**/*.css',
                            '<%= config.tmp %>/<%= config.assets_dist %>/{,*/}*.js',
                            '<%= config.tmp %>/<%= config.assets_dist %>/{,*/}*.json',
                            '<%= config.tmp %>/<%= config.assets_dist %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                        ]
                    }
                }
            },
            wemDev: {
                tasks: {
                    assemble: {
                        files: ['<%= config.wem_src %>/{content,data,source}/**/*.{md,hbs,yml,json}'],
                        tasks: ['assemble:wemDev']
                    },
                    js: {
                        files: ['<%= config.wem_src %>/<%= config.assets_src %>/scripts/**/*.js'],
                        tasks: ['newer:jshint:all','copy:wemDev'],
                        options: {
                            livereload: '<%= connect.options.livereload %>'
                        }
                    },
                    copy: {
                        files: ['<%= config.wem_src %>/<%= config.assets_src %>/{scripts,templates,json,ajax}/**/*'],
                        tasks: ['copy:wemDev']
                    },
                    compass: {
                        files: ['<%= config.wem_src %>/<%= config.assets_src %>/sass/**/*.{scss,sass}'],
                        tasks: ['compassCustom:wemDev']
                    },
                    images: {
                        files: [
                            '<%= config.wem_src %>/<%= config.assets_src %>/images/**/*.*',
                            '<%= config.wem_src %>/<%= config.assets_src %>/images/sprites/**/*.*'
                        ],
                        tasks: ['copy:wemDev']
                    },
                    sprites: {
                        files: [
                            '<%= config.wem_src %>/<%= config.assets_src %>/images/sprites/**/*.*',
                            '<%= config.wem_src %>/<%= config.assets_src %>/images/sprites/*.*'
                        ],
                        tasks: ['copy:wemDev', 'compassCustom:wemDev']
                    }
                }
            },
            appsDev: {
                tasks: {
                    assemble: {
                        files: [
                            '<%= config.app_src %>/{content,data,source}/**/*.{md,hbs,yml,json}',
                            'src/apps/<%= config.srcApp %>/{content,data,source}/**/*.{md,hbs,yml,json}'
                        ],
                        tasks: ['assemble:appsDev']
                    },
                    js: {
                        files: [
                            '<%= config.app_src %>/<%= config.assets_src %>/**/*.js',
                            'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/**/*.js'
                        ],
                        tasks: ['newer:jshint:all','copy:appsDev'],
                        options: {
                            livereload: '<%= connect.options.livereload %>'
                        }
                    },
                    ts: {
                        files: [
                            '<%= config.app_src %>/<%= config.assets_src %>/**/*.ts',
                            'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/**/*.ts'
                        ],
                        tasks: ['webpack:dev', 'copy:tsDev'],
                        options: {
                            livereload: '<%= connect.options.livereload %>'
                        }
                    },
                    tsHtml: {
                        files: [
                            'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/angular/templates/**/*.tpl.html'
                        ],
                        tasks: ['copy:tsDev']
                    },
                    copy: {
                        files: [
                            '<%= config.app_src %>/<%= config.assets_src %>/{scripts,templates,json,ajax}/**/*',
                            'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/{scripts,templates,json,ajax}/**/*',
                            'src/common/apps/assets/angular/templates/**/*.tpl.html'
                        ],
                        tasks: ['copy:appsDev']
                    },
                    compass: {
                        files: [
                            '<%= config.app_src %>/<%= config.assets_src %>/sass/**/*.{scss,sass}',
                            'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/sass/**/*.{scss,sass}'
                        ],
                        tasks: ['compassCustom:appsDev']
                    },
                    images: {
                        files: [
                            '<%= config.app_src %>/<%= config.assets_src %>/images/**/*.*',
                            '<%= config.app_src %>/<%= config.assets_src %>/images/sprites/**/*.*',
                            'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/images/**/*.*',
                            'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/images/sprites/**/*.*'
                        ],
                        tasks: ['copy:appsDev']
                    },
                    sprites: {
                        files: [
                            '<%= config.app_src %>/<%= config.assets_src %>/images/sprites/**/*.*',
                            '<%= config.app_src %>/<%= config.assets_src %>/images/sprites/*.*',
                            'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/images/sprites/**/*.*',
                            'src/apps/<%= config.srcApp %>/<%= config.assets_src %>/images/sprites/*.*'
                        ],
                        tasks: ['copy:appsDev', 'compassCustom:appsDev']
                    }
                }
            }
        },

        eol: {
            to_lf_all: {
                options: {
                    eol: 'lf'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['*'],
                    dest: '<%= config.dist %>'
                }]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                //hostname: '0.0.0.0'
                hostname: '127.0.0.1'
            },
            livereload: {
                options: {
                    open: false,
                    middleware: function (connect) {
                        return [
                            serveStatic('tmp'),
                            connect().use(
                                '/bower_components',
                                serveStatic('./bower_components')
                            ),
                            connect().use(
                                '/app/<%= config.assets_dist %>/styles',
                                serveStatic('./app/<%= config.assets_dist %>/styles')
                            ),
                            serveStatic(appConfig.angApp)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            serveStatic('tmp'),
                            serveStatic('test'),
                            connect().use(
                                '/bower_components',
                                serveStatic('./bower_components')
                            ),
                            serveStatic(appConfig.angApp)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
                force: true
            },
            wem: {
                src: [
                    '<%= config.wem_src %>/<%= config.assets_src %>/scripts/**/*.js'
                ]
            },
            apps: {
                src: [
                    '<%= config.app_src %>/<%= config.assets_src %>/**/*.js',
                    'src/apps/<%= config.srcApp %>/**/*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['<%= config.test %>/**/spec/**/*.js']
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            dev : {
                src: ['<%= config.tmp %>','<%= config.ts %>']
            },
            prod : {
                src: ['<%= config.dist %>', '<%= config.ts %>']
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>/styles/',
                    src: '<%= config.assets_src %>/{,*/}*.css',
                    dest: '<%= config.tmp %>/styles/'
                }]
            }
        },

        assemble: {
            wemDev: {
                options: {
                    flatten: true,
                    assets: '<%= config.tmp %>',
                    layout: 'default.hbs',
                    layoutdir: '<%= config.wem_src %>/source/layouts',
                    helpers: ['<%= config.wem_src %>/source/helpers/*.js'],
                    data: '<%= config.wem_src %>/data/{,*/}*.{json,yml}',
                    partials: '<%= config.wem_src %>/source/partials/**/*.hbs'
                },
                files: {
                    '<%= config.tmp %>/': ['<%= config.wem_src %>/source/pages/**/*.hbs']
                }
            },
            appsDev: {
                options: {
                    flatten: true,
                    assets: '<%= config.tmp %>',
                    layout: 'default.hbs',
                    layoutdir: '<%= config.wem_src %>/source/layouts',
                    helpers: ['<%= config.wem_src %>/source/helpers/*.js'],
                    data: [
                        '<%= config.wem_src %>/data/{,*/}*.{json,yml}',
                        '<%= config.app_src %>/data/{,*/}*.{json,yml}',
                        'src/apps/<%= config.srcApp %>/data/{,*/}*.{json,yml}'
                    ],
                    partials: [
                        '<%= config.wem_src %>/source/partials/**/*.hbs',
                        '<%= config.app_src %>/source/partials/**/*.hbs',
                        'src/apps/<%= config.srcApp %>/source/partials/**/*.hbs'
                    ]
                },
                files: {
                    '<%= config.tmp %>/': [
                        '<%= config.wem_src %>/source/pages/index.hbs',
                        '<%= config.wem_src %>/source/pages/index-icdev.hbs',
                        '<%= config.app_src %>/source/pages/**/*.hbs',
                        'src/apps/<%= config.srcApp %>/source/pages/**/*.hbs'
                    ]
                }
            },
            wemProd : {
                options: {
                    flatten: true,
                    assets: '<%= config.dist %>',
                    layout: 'default.hbs',
                    layoutdir: '<%= config.wem_src %>/source/layouts',
                    helpers: ['<%= config.wem_src %>/source/helpers/*.js'],
                    data: [
                        '<%= config.wem_src %>/data/{,*/}*.{json,yml}',
                        '<%= config.app_src %>/data/{,*/}*.{json,yml}'
                    ],
                    partials: [
                        '<%= config.wem_src %>/source/partials/**/*.hbs',
                        '<%= config.app_src %>/source/partials/**/*.hbs'
                    ]
                },
                files: {
                    '<%= config.dist %>/': ['<%= config.wem_src %>/source/pages/**/*.hbs']
                }
            },
            appsProd: {
                options: {
                    flatten: true,
                    assets: '<%= config.dist %>',
                    layout: 'default.hbs',
                    layoutdir: '<%= config.wem_src %>/source/layouts',
                    helpers: ['<%= config.wem_src %>/source/helpers/*.js'],
                    data: [
                        '<%= config.wem_src %>/data/{,*/}*.{json,yml}',
                        '<%= config.app_src %>/data/{,*/}*.{json,yml}',
                        'src/apps/<%= config.srcApp %>/data/{,*/}*.{json,yml}'
                    ],
                    partials: [
                        '<%= config.wem_src %>/source/partials/**/*.hbs',
                        '<%= config.app_src %>/source/partials/**/*.hbs',
                        'src/apps/<%= config.srcApp %>/source/partials/**/*.hbs'
                    ]
                },
                files: {
                    '<%= config.dist %>/': [
                        '<%= config.wem_src %>/source/pages/index.hbs',
                        '<%= config.app_src %>/source/pages/**/*.hbs',
                        'src/apps/<%= config.srcApp %>/source/pages/**/*.hbs'
                    ]
                }
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= config.wem_src %>/index.html'],
                ignorePath:  /\.\.\//
            },
            test: {
                devDependencies: true,
                src: '<%= karma.unit.configFile %>',
                ignorePath:  /\.\.\//,
                fileTypes:{
                    js: {
                        block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
                        detect: {
                            js: /'(.*\.js)'/gi
                        },
                        replace: {
                            js: '\'{{filePath}}\','
                        }
                    }
                }
            },
            sass: {
                src: ['<%= config.wem_src %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        concat: {
            options: {
                banner: '/*! <%= grunt.template.date("ddd mmm dd yyyy HH:MM:ss \'GMT\'o (Z)") %> */'
            },
            wemDev: {
                files: {
                    '<%= config.tmp %>/<%= config.assets_dist %>/scripts/ups.scripts.js': [
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/ups.main.js',
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/ups.helpers.js',
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/pluginExtended/**/*.js',
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/plugins/**/*.js',
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/ups.legacyAppSupport.js',
                        '<%= config.app_src %>/<%= config.assets_src %>/angularjs/plugins/ups.app.js'
                    ],
                    '<%= config.tmp %>/<%= config.assets_dist %>/scripts/vendor/ups.vendor.js': vendorList
                }
            },
            appsDev: {
                files: {
                    '<%= config.tmp %>/<%= config.assets_dist %>/scripts/ups.doApp.js': [
                        '<%= config.app_src %>/<%= config.assets_src %>/angularjs/ups.initApp.js',
                        '<%= config.app_src %>/<%= config.assets_src %>/angularjs/Base/**/*.js',
                        'src/apps/doa/assets/angularjs/controllers/*.js',
                        'src/apps/ppc/assets/angularjs/controllers/*.js'
                    ]
                }
            },
            prod: {
                files: {
                    '<%= config.dist %>/<%= config.assets_dist %>/scripts/ups.scripts.js': [
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/ups.main.js',
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/ups.helpers.js',
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/pluginExtended/**/*.js',
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/plugins/**/*.js',
                        '<%= config.wem_src %>/<%= config.assets_src %>/scripts/ups.legacyAppSupport.js',
                        '<%= config.app_src %>/<%= config.assets_src %>/angularjs/plugins/ups.app.js'
                    ],
                    '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/ups.vendor.js': vendorList
                }
            },
            appsProd: {
                files: {
                    '<%= config.dist %>/<%= config.assets_dist %>/scripts/ups.doApp.js': [
                        '<%= config.app_src %>/<%= config.assets_src %>/angularjs/ups.initApp.js',
                        '<%= config.app_src %>/<%= config.assets_src %>/angularjs/Base/**/*.js',
                        'src/apps/doa/assets/angularjs/controllers/*.js',
                        'src/apps/ppc/assets/angularjs/controllers/*.js'
                    ],
                    '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/ups.angular2.js': [
                        'node_modules/core-js/client/shim.min.js',
                        'node_modules/systemjs/dist/system.src.js',
                        '<%= config.app_src %>/<%= config.assets_src %>/angular/systemjs.config.js',
                        'node_modules/zone.js/dist/zone.js'
                    ]
                }
            }
        },

        copy: {
            wemDev: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        dest: '<%= config.wem_src %>/<%= config.assets_src %>/images',
                        src: ['bower_components/slick-carousel/slick/**.{gif,jpg}']
                    },
                    {
                        expand: true,
                        src: vendorList.concat([
                            'bower_components/modernizr/modernizr.js'
                        ]),
                        dest: '<%= config.tmp %>'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.wem_src %>/<%= config.assets_src %>',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>',
                        src: [
                            'favicon.ico',
                            'apple-touch-icon.png',
                            'images/**/*',
                            '!images/sprites/**/*',
                            'videos/**/*',
                            'styles/fonts/{,*/}*.*',
                            'ajax/**/*.*',
                            'scripts/**/*.js'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>/scripts/vendor',
                        src: [
                            'bower_components/modernizr/modernizr.js'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'src/apps/<%= config.srcApp %>/docs',
                        dest: '<%= config.tmp %>/docs/<%= config.srcApp %>',
                        src: [
                            '*.docx'
                        ]
                    }
                ]
            },
            appsDev: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules',
                        dest: '<%= config.tmp %>/node_modules',
                        src: [
                            'core-js/client/shim.min.js',
                            'zone.js/dist/zone.js',
                            'systemjs/**/*.js',
                            '@angular/**/*.js',
                            '@types/**/*.js',
                            'rxjs/**/*.js',
                            'ng2-bootstrap-modal/**/*.js', // Added for Modal Testing; //DO NOT INCLUDE FOR PRODUCTION
                            'ngx-bootstrap/**/*.js', //Added for DatePicker Testing; //DO NOT INCLUDE FOR PRODUCTION
                            'moment/**/*.js', // Added for DatePicker Testing; //DO NOT INCLUDE FOR PRODUCTION
                            'traceur/**/*.js',
                            'd3-ng2-service/src/d3.service.js', // add for package animation
                            'd3-*/**/*.js' // add for package animation
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>',
                        src: [
                            'angularjs/**/*.js',
                            'scripts/Legacy_Applications/**/*.js',
                            'angular/**/*.js'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'src/apps',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>/angularjs',
                        src: [
                            'doa/assets/angularjs/controllers/*.js',
                            'ppc/assets/angularjs/controllers/*.js'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>',
                        dest: '<%= config.tmp %>/app_assets/templates',
                        src: [
                            '**/_templates/*.html'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>',
                        dest: '<%= config.tmp %>/app_assets/mocks',
                        src: [
                            '**/_mocks/*.json'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/apps',
                        dest: '<%= config.tmp %>/app_assets/templates',
                        src: [
                            '<%= config.srcApp %>/**/_templates/*.html'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/apps',
                        dest: '<%= config.tmp %>/app_assets/mocks',
                        src: [
                            '<%= config.srcApp %>/**/_mocks/*.json'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/apps',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>/scripts',
                        src: [
                            '<%= config.srcApp %>/<%= config.assets_src %>/scripts/**.js'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/apps',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>/angularjs/controllers',
                        src: [
                            '<%= config.srcApp %>/<%= config.assets_src %>/angularjs/controllers/**.js'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>/img',
                        dest: '<%= config.tmp %>/img',
                        src: [
                            '**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>/img_fpo',
                        dest: '<%= config.tmp %>/img_fpo',
                        src: [
                            '**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>/angular/templates',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>/angular/common/templates',
                        src: [
                            '*.html'
                        ]
                    }
                ]
            },
            tsDev: {
                options: {
                    process: function(content, srcpath){
                        return content.replace(new RegExp('../../../../common/apps/assets/angular', 'g'), '../../../common');
                    }
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.ts %>/common/apps/assets/angular',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>/angular/common',
                        src: [
                            '**/*.{js,map}'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.ts %>/apps',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>/angular',
                        src: [
                            '**/assets/angular/**/*.{js,map}'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'src/apps',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>/angular',
                        src: [
                            '<%= config.srcApp %>/<%= config.assets_src %>/angular/templates/**/*.tpl.html'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'src/apps',
                        dest: '<%= config.tmp %>/<%= config.assets_dist %>/angular',
                        src: [
                            '<%= config.srcApp %>/<%= config.assets_src %>/angular/mocks/*.json'
                        ]
                    }

                ]
            },
            tmp: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.wem_src %>/<%= config.assets_src %>/scripts/apps',
                        dest: '<%= config.tmp %>/templates',
                        src: [
                            '**/templates/*.html'
                        ]
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules',
                        dest: '<%= config.dist %>/node_modules',
                        src: [
                            'core-js/client/shim.min.js',
                            'zone.js/dist/zone.js',
                            'systemjs/**/*.js',
                            '@angular/**/*.js',
                            '@types/**/*.js',
                            'rxjs/**/*.js',
                            'ng2-bootstrap-modal/**/*.js', // Added for Modal Testing; //DO NOT INCLUDE FOR PRODUCTION
                            'ngx-bootstrap/**/*.js', //Added for DatePicker Testing; //DO NOT INCLUDE FOR PRODUCTION
                            'moment/**/*.js', // Added for DatePicker Testing; //DO NOT INCLUDE FOR PRODUCTION
                            'traceur/**/*.js',
                            'd3-ng2-service/src/d3.service.js', // add for package animation
                            'd3-*/**/*.js' // add for package animation
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.wem_src %>/<%= config.assets_src %>',
                        dest: '<%= config.dist %>/<%= config.assets_dist %>',
                        src: [
                            'favicon.ico',
                            'apple-touch-icon.png',
                            'styles/fonts/{,*/}*.*',
                            'videos/**/*',
                            'ajax/**/*.*',
                            'images/**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>',
                        dest: '<%= config.dist %>/<%= config.assets_dist %>',
                        src: [
                            'scripts/ups.header.js',
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.tmp %>',
                        src: ['<%= config.assets_src %>/images/sprites/*.png'],
                        dest: '<%= config.dist %>/<%= config.assets_dist %>'
                    },
                    {
                        expand: true,
                        cwd: 'src/apps/<%= config.srcApp %>/docs',
                        dest: '<%= config.dist %>/docs/<%= config.srcApp %>',
                        src: [
                            '*.docx'
                        ]
                    }
                ]
            },
            appsProd: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>',
                        dest: '<%= config.dist %>/app_assets/templates',
                        src: [
                            '**/_templates/*.html'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>',
                        dest: '<%= config.dist %>/app_assets/mocks',
                        src: [
                            '**/_mocks/*.json'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/apps',
                        dest: '<%= config.dist %>/app_assets/templates',
                        src: [
                            '<%= config.srcApp %>/**/_templates/*.html'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/apps',
                        dest: '<%= config.dist %>/app_assets/mocks',
                        src: [
                            '<%= config.srcApp %>/**/_mocks/*.json'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/apps',
                        dest: '<%= config.dist %>/<%= config.assets_dist %>/scripts',
                        src: [
                            '<%= config.srcApp %>/<%= config.assets_src %>/scripts/**.js'
                        ]
                    },
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'src/apps',
                        dest: '<%= config.dist %>/<%= config.assets_dist %>/angularjs/controllers',
                        src: [
                            '<%= config.srcApp %>/<%= config.assets_src %>/angularjs/controllers/**.js'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>/img',
                        dest: '<%= config.dist %>/img',
                        src: [
                            '**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>/img_fpo',
                        dest: '<%= config.dist %>/img_fpo',
                        src: [
                            '**/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>/<%= config.assets_src %>/angular/templates',
                        dest: '<%= config.dist %>/<%= config.assets_dist %>/angular/common/templates',
                        src: [
                            '*.html'
                        ]
                    }
                ]
            },
            tsProd: {
                options: {
                    process: function(content, srcpath){
                        return content.replace(new RegExp('../../../../common/apps/assets/angular', 'g'), '../../../common');
                    }
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.ts %>/common/apps/assets/angular',
                        dest: '<%= config.dist %>/<%= config.assets_dist %>/angular/common',
                        src: [
                            '**/*.{js,map}'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '<%= config.ts %>/apps',
                        dest: '<%= config.dist %>/<%= config.assets_dist %>/angular',
                        src: [
                            '**/assets/angular/**/*.{js,map}'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'src/apps',
                        dest: '<%= config.dist %>/<%= config.assets_dist %>/angular',
                        src: [
                            '<%= config.srcApp %>/<%= config.assets_src %>/angular/templates/**/*.tpl.html'
                        ]
                    },
                    {
                        expand: true,
                        cwd: 'src/apps',
                        dest: '<%= config.dist %>/<%= config.assets_dist %>/angular',
                        src: [
                            '<%= config.srcApp %>/<%= config.assets_src %>/angular/mocks/*.json'
                        ]
                    }
                ]
            }
        },

        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                },
                compress: {
                    // drop_console: true
                },
                banner: '/*! <%= grunt.template.date("ddd mmm dd yyyy HH:MM:ss \'GMT\'o (Z)") %> */'
            },
            prod: {
                files: {
                    '<%= config.dist %>/<%= config.assets_dist %>/scripts/ups.scripts.js': [
                        '<%= config.dist %>/<%= config.assets_dist %>/scripts/ups.scripts.js'
                    ],
                    '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/ups.vendor.js': [
                        '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/ups.vendor.js'
                    ]
                }
            },
            appsProd: {
                files: {
                    '<%= config.dist %>/<%= config.assets_dist %>/scripts/ups.doApp.js': [
                        '<%= config.dist %>/<%= config.assets_dist %>/scripts/ups.doApp.js'
                    ],
                    //'<%= config.dist %>/<%= config.assets_dist %>/scripts/app_ent/nbs/master.js': ['<%= config.dist %>/<%= config.assets_dist %>/scripts/app_ent/nbs/master.js'],
                    //'<%= config.dist %>/<%= config.assets_dist %>/scripts/app_ent/ppc/master.js': ['<%= config.dist %>/<%= config.assets_dist %>/scripts/app_ent/ppc/master.js'],
                    //'<%= config.dist %>/<%= config.assets_dist %>/scripts/app_ent/sso/master.js': ['<%= config.dist %>/<%= config.assets_dist %>/scripts/app_ent/sso/master.js'],
                    '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/ups.angular2.js': [
                        '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/ups.angular2.js'
                    ]
                }
            }
        },

        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.dist %>/index.html'
        },

        usemin: {
            options: {
                dirs: ['<%= config.dist %>']
            },
            html: ['<%= config.dist %>/{,*/}*.html']
        },

        cssmin: {
            prod: {
                files: {
                    '<%= config.dist %>/<%= config.assets_dist %>/styles/ups.styles.css': ['<%= config.tmp %>/<%= config.assets_dist %>/styles/ups.styles.css']
                }
            }
        },

        imagemin: {
            prod: {
                options : {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.wem_src %>/<%= config.assets_src %>/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= config.dist %>/<%= config.assets_dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.wem_src %>/<%= config.assets_src %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/<%= config.assets_dist %>/images'
                }]
            }
        },

        concurrent: {
            server: [
                'compass:wemDev'
            ],
            test: [
                'compass:wemDev'
            ],
            wemProd: [
                'compassCustom:wemProd',
                'svgmin'
            ],
            appsProd: [
                'compassCustom:appsProd',
                'svgmin'
            ],
            cmsProd: [
                'compassCustom:wemProd',
                'compassCustom:appCSS',
                'compassCustom:appsProd',
                'svgmin'
            ]
        },

        'regex-replace': {},

        modernizr: {
            dev: {
                'devFile' : 'bower_components/modernizr/modernizr.js',
                'dest' : '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/modernizr.js',
                'outputFile' : '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/modernizr.js',
                'uglify' : true,
                'cache' : true,
                'files': {
                    "src": [
                        '<%= config.tmp %>/**/*.{js,css}'
                    ]
                }
            },
            dist: {
                'devFile' : 'bower_components/modernizr/modernizr.js',
                'dest' : '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/modernizr.js',
                'outputFile' : '<%= config.dist %>/<%= config.assets_dist %>/scripts/vendor/modernizr.js',
                'uglify' : true,
                'cache' : true,
                'files': {
                    "src": [
                        '<%= config.dist %>/**/*.{js,css}'
                    ]
                }
            }
        },

        // Unit Test settings
        karma: {
            unit: {
                configFile: '<%= config.test %>/unit/karma.conf.js',
                singleRun: true
            }
        },

        // End to End Test settings
        protractor: {
            options: {
                configFile: '<%= config.test %>/e2e/protractor.conf.js',
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                // debug: true,
                args: {
                    // Additional arguments that are passed to the webdriver command
                }
            },
            e2e: {
                options: {
                    //Stops Grunt process if a test fails
                    keepAlive: false
                }
            }
        },

        'selenium_standalone': {
            e2e: {
                seleniumVersion: '2.50.1',
                seleniumDownloadURL: 'http://selenium-release.storage.googleapis.com',
                drivers: {
                    chrome: {
                        version: '2.15',
                        arch: process.arch,
                        baseURL: 'http://chromedriver.storage.googleapis.com'
                    },
                    ie: {
                        version: '2.45',
                        arch: process.arch,
                        baseURL: 'http://selenium-release.storage.googleapis.com'
                    }
                }
            }
        },

        compress: {
            main: {
                options: {
                    // Name release based on creation date
                    archive: function () {
                        var d = new Date();
                        var cDay = d.getDate();
                        var cMonth = d.getMonth() + 1;
                        var cYear = d.getFullYear();
                        cMonth = (cMonth < 10)? '0' + cMonth: cMonth;
                        cDay = (cDay < 10)? '0' + cDay: cDay;
                        return 'releases/UPS_HTML_' + cMonth + cDay + cYear + '.zip';
                    }
                },
                files: [
                    // UPDATE FOR EACH RELEASE ***********
                    {   // Files from DIST folder
                        expand: true,
                        cwd: '<%= config.dist %>',
                        dest: 'COMPILED_HTML',
                        src: ['**']
                    },
                    {   // FED Data files
                        expand: true,
                        cwd: '<%= config.wem_src %>/data',
                        dest: '_DEV_Data',
                        src: ['**/*.{json,yml}']
                    },
                    {   // FED Template and Partials
                        expand: true,
                        cwd: '<%= config.wem_src %>/source',
                        dest: '_DEV_Templates',
                        src: ['**/*.hbs']
                    },
                    {   // Un-Minified CSS
                        expand: true,
                        cwd: '<%= config.pack %>/styles',
                        dest: '_DEV_Styles',
                        src: ['ups.*.css']
                    },
                    {   // Un-Minified JS
                        expand: true,
                        cwd: '<%= config.wem_src %>/scripts',
                        dest: '_DEV_Scripts',
                        src: [
                            'ups.main.js',
                            'pluginExtended/**',
                            'plugins/**',
                            'apps/ups.DoApp.js',
                            'apps/ups.identityApp.js'
                        ]
                    },
                    {   // Vendor JS Libraries
                        expand: true,
                        dest: '_DEV_Libraries',
                        cwd: '/',
                        src: vendorList
                    }
                ]
            }
        },

        htmlangular:{
            options: {
                angular:true,
                doctype:false,
                customtags:[
                    'ups-*',
                    'uib-*',
                    'modal',
                    'social'
                ],
                customattrs:[
                    'data-ng-*',
                    'check-verify',
                    'uib-*',
                    'ngf-*',
                    'error-*',
                    'focus-*',
                    'check-*',
                    'validate-*',
                    'number-*',
                    'is-*',
                    'close-*',
                    'point-focus',
                    'datepicker-*',
                    'popover-*',
                    'resize',
                    'authorized',
                    'users',
                    'table',
                    'type',
                    'accept',
                    'file',
                    'data',
                    'lass',
                    'slick',
                    'alt-input-formats'
                ],
                reportpath:'<%= config.test %>/validation/html_validation.json',
                concurrentJobs:3,
                reportCheckstylePath:'<%= config.test %>/validation/html-angular-validate-report-checkstyle.xml',
                relaxerror: [
                    'The frameborder attribute on the iframe element is obsolete. Use CSS instead.',
                    'Start tag seen without seeing a doctype first. Expected e.g. “<!DOCTYPE html>”',
                    'Element “head” is missing a required instance of child element “title”.',
                    'This document appears to be written in English. Consider adding “lang="en"” (or variant) to the “html” start tag.',
                    'Document uses the Unicode Private Use Area(s), which should not be used in publicly exchanged documents. (Charmod C073)',
                    'Consider adding a “lang” attribute to the “html” start tag to declare the language of this document.'
                ],
                tmplext:'<%= config.wem_src %>/<%= config.assets_src %>/scripts/apps/**/_templates/*.html'
            },
            files: {
                src:[
                    '<%= config.wem_src %>/<%= config.assets_src %>/scripts/apps/Base/_templates/*.html',
                    '<%= config.wem_src %>/<%= config.assets_src %>/scripts/apps/Digital_Onboarding/_templates/*.html',
                    '<%= config.wem_src %>/<%= config.assets_src %>/scripts/apps/Profile_Preferences_Center/_templates/*.html'
                ]
            }
        },

        validation: {
            apps: {
                options: {
                    relaxerror: [
                        'no document type declaration; will parse without validation'
                    ],
                    path:'<%= config.test %>/validation/html_validation.json'
                },
                files: {
                    src: ['<%= config.wem_src %>/<%= config.assets_src %>/scripts/apps/**/_templates/*.html']
                }
            }
        },

        bootlint: {
            all: {
                options: {},
                files: {
                    src: [
                        '<%= config.tmp %>/*.html',
                        '!<%= config.tmp %>/colors.html',
                        '!<%= config.tmp %>/grid.html',
                        '!<%= config.tmp %>/iconfont.html'
                    ]
                }
            },
            apps: {
                options: {
                    relaxerror: [
                        'E001',
                        'W001',
                        'W002',
                        'W003',
                        'W005'
                    ],
                    showallerrors: false,
                    stoponerror: false,
                    stoponwarning: false
                },
                files: {
                    src: '<%= config.wem_src %>/<%= config.assets_src %>/scripts/apps/**/_templates/*.html'
                }
            }
        },

        generateLSDownData: {
            options: {
                templates: '<%= config.wem_src %>/source/pages/_ls_down/',
                pages: "<%= config.dist %>/",
                dest: "<%= config.dist %>/ls_down/"
            }
        },

        generateTimestampCss: {
            options: {
                src: '<%= config.dist %>/assets/resources/styles'
            }
        },

        compassCustom: {
            options: {
                development: {
                    cssDir: ['<%= config.tmp %>/<%= config.assets_dist %>/styles'],
                    generatedImagesDir: '<%= config.tmp %>/<%= config.assets_dist %>/images',
                    imagesDir: '<%= config.wem_src %>/<%= config.assets_src %>/images',
                    javascriptsDir: '<%= config.wem_src %>/<%= config.assets_src %>/scripts',
                    fontsDir: '<%= config.wem_src %>/<%= config.assets_src %>/styles/fonts',
                    importPath: 'bower_components',
                    httpImagesPath: '/<%= config.assets_dist %>/images',
                    httpGeneratedImagesPath: '/<%= config.assets_dist %>/images',
                    httpFontsPath: '/<%= config.assets_dist %>/styles/fonts',
                    http_stylesheets_path: '/<%= config.assets_dist %>/styles',
                    relativeAssets: false,
                    assetCacheBuster: false,
                    sourcemap: true
                },
                production: {
                    cssDir: ['<%= config.dist %>/<%= config.assets_dist %>/styles'],
                    generatedImagesDir: '<%= config.tmp %>/<%= config.assets_dist %>/images',
                    imagesDir: '<%= config.wem_src %>/<%= config.assets_src %>/images',
                    javascriptsDir: '<%= config.wem_src %>/<%= config.assets_src %>/scripts',
                    fontsDir: '<%= config.wem_src %>/<%= config.assets_src %>/styles/fonts',
                    importPath: 'bower_components',
                    httpImagesPath: '/<%= config.assets_dist %>/images',
                    httpGeneratedImagesPath: '/<%= config.assets_dist %>/images',
                    httpFontsPath: '/<%= config.assets_dist %>/styles/fonts',
                    relativeAssets: false,
                    assetCacheBuster: false,
                    noLineComments: true,
                    outputStyle: 'compressed'
                }
            },
            wemDev: {
                environment: 'development',
                files: [{
                    expand: true,
                    cwd: '<%= config.wem_src %>',
                    src: '<%= config.assets_src %>/sass'
                }]
            },
            appsDev: {
                environment: 'development',
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.wem_src %>',
                        src: '<%= config.assets_src %>/sass'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>',
                        src: '<%= config.assets_src %>/sass'
                    },
                    {
                        expand: true,
                        cwd: 'src/apps',
                        src: '<%= config.srcApp %>/assets/sass'
                    }
                ]
            },
            wemProd: {
                environment: 'production',
                files: [{
                    expand: true,
                    cwd: '<%= config.wem_src %>',
                    src: '<%= config.assets_src %>/sass'
                }]
            },
            appsProd: {
                environment: 'production',
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.wem_src %>',
                        src: '<%= config.assets_src %>/sass'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>',
                        src: '<%= config.assets_src %>/sass'
                    },
                    {
                        expand: true,
                        cwd: 'src/apps',
                        src: '<%= config.srcApp %>/assets/sass'
                    }
                ]
            },
            appCSS: {
                environment: 'production',
                options: {
                    cssDir: ['<%= config.dist %>/<%= config.assets_dist %>/styles/appCSS']
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app_src %>',
                        src: '<%= config.assets_src %>/sass/appCSS'
                    },
                    {
                        expand: true,
                        cwd: 'src/apps',
                        src: '<%= config.srcApp %>/assets/sass/appCSS'
                    }
                ]
            }
        }
    });



    // All tasks
    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if(target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'jshint:wem',
            'jshint:apps',
            'clean:dev',
            //'ts:dev',
            'copy:wemDev',
            'copy:appsDev',
            'compassCustom:appsDev',
            'concat:wemDev',
            'concat:appsDev',
            'assemble:wemDev',
            'assemble:appsDev',
            'modernizr:dev',
            'connect:livereload',
            'watchCustom'
        ]);
    });


    grunt.registerTask('serve-wem', 'Compile then start a connect web server', function (target) {
        if(target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'jshint:wem',
            'clean:dev',
            'copy:wemDev',
            'compassCustom:wemDev',
            'assemble:wemDev',
            'modernizr:dev',
            'connect:livereload',
            'watchCustom:wemDev'
        ]);
    });


    grunt.registerTask('appServer', function (src) {

        if(src) {
            grunt.config.set('config.srcApp', src);
        }

        if (grunt.file.exists('src/apps/' + grunt.config.get('config.srcApp') + '/' + grunt.config.get('config.assets_src') + '/angular/main.ts')) {
            grunt.task.run([
                'webpack:dev'
            ]);
        }

        grunt.task.run([
            'jshint:wem',
            'jshint:apps',
            //'clean:dev',
            //'ts:dev',
            'copy:wemDev',
            'copy:appsDev',
            'copy:tsDev',
            'compassCustom:wemDev',
            'compassCustom:appsDev',
            'assemble:appsDev',
            //'modernizr:dev',
            'connect:livereload',
            'watchCustom:appsDev'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });




    grunt.registerTask('unit', [
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('e2e', [
        'selenium_standalone:e2e:install',
        'selenium_standalone:e2e:start',
        'connect:test',
        'protractor',
        'selenium_standalone:e2e:stop'
    ]);

    grunt.registerTask('appslint', [
        'validation:apps',
        'bootlint:apps',
        'jshint:apps'
    ]);

    grunt.registerTask('test', [
        'selenium_standalone:e2e:install',
        'selenium_standalone:e2e:start',
        'connect:test',
        'karma',
        'protractor',
        'selenium_standalone:e2e:stop'
    ]);

    grunt.registerTask('build', function (target) {
        grunt.task.run(['build-gold']);
    });

    grunt.registerTask('build-gold', function (src) {

        // if source is passed in, check the value and run appropriate task. If source is "wem" only build the
        // WEM assets and exclude all apps. If source is "apps" then all apps will be compiled and WEM pages
        // will be excluded. If source is specific app id, then only that app will be compiled. If no source
        // then everything will be included in build.
        if(src) {
            if(src === "apps") src = "**";
            grunt.config.set('config.srcApp', src);

            console.log('src: ' + src);

            if(src === "wem"){
                grunt.task.run([
                    'jshint:wem',
                    'clean:prod',
                    'assemble:wemProd',
                    'eol',
                    'useminPrepare',
                    'copy:prod',
                    'concurrent:wemProd',
                    'concat:prod',
                    'generateTimestampCss',
                    'uglify:prod',
                    'usemin',
                    'modernizr:dist'
                ]);
            }
            else{
                if (grunt.file.exists('src/apps/' + grunt.config.get('config.srcApp') + '/' + grunt.config.get('config.assets_src') + '/angular/main.ts')) {
                    grunt.task.run([
                        'clean:prod',
                        'webpack:prod'
                    ]);
                } else {
                    grunt.task.run([
                        'clean:prod'
                    ])
                }

                grunt.task.run([
                    'jshint:wem',
                    'jshint:apps',
                    'assemble:appsProd',
                    'eol',
                    'useminPrepare',
                    //'ts',
                    //'webpack:prod',
                    'copy:prod',
                    'copy:appsProd',
                    'copy:tsProd',
                    'concurrent:appsProd',
                    'concat:prod',
                    'concat:appsProd',
                    'generateTimestampCss',
                    'uglify:prod',
                    'uglify:appsProd',
                    'usemin',
                    'modernizr:dist'
                ]);
            }
        }
        else {
            grunt.task.run([
                'jshint:wem',
                'jshint:apps',
                'clean:prod',
                'assemble:wemProd',
                'assemble:appsProd',
                'eol',
                'useminPrepare',
                'ts',
                'copy:prod',
                'copy:appsProd',
                'copy:tsProd',
                'concurrent:appsProd',
                'concat:prod',
                'concat:appsProd',
                'generateTimestampCss',
                'uglify:prod',
                'uglify:appsProd',
                'usemin',
                'modernizr:dist'
            ]);
        }
    });

    grunt.registerTask('build-cms', function () {

        grunt.task.run([
            'jshint:wem',
            'clean:prod',
            'copy:prod',
            'copy:appsProd',
            'concurrent:cmsProd',
            'concat:prod',
            'generateTimestampCss',
            'uglify:prod',
            'modernizr:dist'
        ]);
    });

    grunt.registerTask('build-appCSS', function (src) {

        if(src) {
            console.log('src: ' + src);
            grunt.config.set('config.srcApp', src);
        }

        grunt.task.run([
            'clean:prod',
            'compassCustom:appsProd',
            'generateTimestampCss'
        ]);
    });

    grunt.registerTask('pack', [
        'build',
        'compress'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('parse-lsdown', [
        'generateLSDownData'
    ]);

    grunt.registerTask('build-lsdown', [
        'build',
        'parse-lsdown'
    ]);

    grunt.registerTask('build-timestamp-css', [
        'generateTimestampCss'
    ]);


};
