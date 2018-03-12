/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
          // paths serve as alias
          'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: '/assets/resources/angular',

            // angular bundles
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // other libraries
            'rxjs':                      'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',

            // custom libraries
            'moment': 'npm:moment/moment.js', //Added for DatePicker
            'moment': 'npm:moment/min/moment-with-locales.js', //Added for DatePicker Locales
            'ngx-bootstrap': 'npm:ngx-bootstrap/bundles/ngx-bootstrap.umd.js', //Added for DatePicker
            'traceur' : 'npm:traceur/bin/traceur.js',
            'd3-ng2-service' : 'npm:d3-ng2-service/esm/src/d3.service.js', // add for package animation
            'bundle-d3' : 'npm:d3-ng2-service',
            'd3-array': 'npm:d3-array/build/d3-array.js',
            'd3-axis': 'npm:d3-axis/build/d3-axis.js',
            'd3-brush': 'npm:d3-brush/build/d3-brush.js',
            'd3-chord': 'npm:d3-chord/build/d3-chord.js',
            'd3-collection': 'npm:d3-collection/build/d3-collection.js',
            'd3-color': 'npm:d3-color/build/d3-color.js',
            'd3-dispatch': 'npm:d3-dispatch/build/d3-dispatch.js',
            'd3-drag': 'npm:d3-drag/build/d3-drag.js',
            'd3-dsv': 'npm:d3-dsv/build/d3-dsv.js',
            'd3-ease': 'npm:d3-ease/build/d3-ease.js',
            'd3-force': 'npm:d3-force/build/d3-force.js',
            'd3-format': 'npm:d3-format/build/d3-format.js',
            'd3-geo': 'npm:d3-geo/build/d3-geo.js',
            'd3-hierarchy': 'npm:d3-hierarchy/build/d3-hierarchy.js',
            'd3-interpolate': 'npm:d3-interpolate/build/d3-interpolate.js',
            'd3-path': 'npm:d3-path/build/d3-path.js',
            'd3-polygon': 'npm:d3-polygon/build/d3-polygon.js',
            'd3-quadtree': 'npm:d3-quadtree/build/d3-quadtree.js',
            'd3-queue': 'npm:d3-queue/build/d3-queue.js',
            'd3-random': 'npm:d3-random/build/d3-random.js',
            'd3-request': 'npm:d3-request/build/d3-request.js',
            'd3-scale': 'npm:d3-scale/build/d3-scale.js',
            'd3-selection': 'npm:d3-selection/build/d3-selection.js',
            'd3-selection-multi': 'npm:d3-selection-multi/build/d3-selection-multi.js',
            'd3-shape': 'npm:d3-shape/build/d3-shape.js',
            'd3-time': 'npm:d3-time/build/d3-time.js',
            'd3-time-format': 'npm:d3-time-format/build/d3-time-format.js',
            'd3-timer': 'npm:d3-timer/build/d3-timer.js',
            'd3-timelines': 'npm:d3-timelines/build/d3-timelines.js',
            'd3-transition': 'npm:d3-transition/build/d3-transition.js',
            'd3-voronoi': 'npm:d3-voronoi/build/d3-voronoi.js',
            'd3-zoom': 'npm:d3-zoom/build/d3-zoom.js',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                main: 'Rx.js',  // Modified for Modal
                defaultExtension: 'js'
            },
            'bundle-d3' : {
                main: 'esm/src/bundle-d3.js',
                defaultExtension : 'js'
            },
            'ng2-bootstrap' : {
                format: 'cjs',
                main: 'bundles/ng2-bootstrap.umd.js',
                defaultExtension: 'js'
            }
            /*,
            moment: {
                map: 'node_modules/moment/moment.js',
                type: 'cjs',
                defaultExtension: 'js'
            }*/
        }
    });
})(this);
