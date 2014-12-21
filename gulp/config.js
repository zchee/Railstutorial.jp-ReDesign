'use strict';

var config = {
  app: 'app',
  dist: 'dist'
};

module.exports = {

  config: config,

  watch: {
    js: '#{config.app}/js/**',
    styl: '#{config.app}/styl/**',
    www: '#{config.app}/*.html'
  },

  js: {
    src: '#{config.app}/js/**',
    dist: '#{config.dist}/js',
    uglify: false
  },

  webpack: {
    entry: '#{config.app}/js/app.js',
    output: {
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['', '.js']
    }
  },

  copy: {
    src: [
      src + '/www/index.html'
    ],
    dest: dest
  },

  stylus: {
    src: [
      src + '/styl/**/!(_)*'
    ],
    dest: dest + '/css/',
    output: 'app.css',
    autoprefixer: {
      browsers: ['last 2 versions']
    },
    minify: false
  }
};
