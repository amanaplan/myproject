const path = require('path');

module.exports = {
    entry : "./src/apps/visibility/assets/angular/main",
    output : {
        path : path.resolve(__dirname),
        filename : "./test/bundle.js"
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
};
