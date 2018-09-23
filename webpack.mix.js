const { mix } = require('laravel-mix'),
    path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Add custom path configuration to Webpack
mix

    .webpackConfig({
        resolve: {
            modules: [
                path.resolve('./node_modules')
            ]
        }
    });

// And now the example
mix
    .autoload({})

    .copy('./example/index.html', 'public/index.html')

    .js('./example/index.js', 'public/js/app.js')

    // And browser-sync as dev server
    .browserSync({
        proxy: false,
        server: {
            baseDir: './public'
        },
        open: 'external',
        notify: false,
        ui: false
    })

    .sourceMaps(false);