'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          style: 'compressed',
          compass: false,
          sourcemap: false
        },
        files: {
          'css/app.min.css': [
          'scss/app.scss'
          ]
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/vendor.min.css': [
          'scss/vendor/bootstrap.css'
          ]
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: [
          'scss/base/**/*.scss',
          'scss/page-blocks/**/*.scss'
        ],
        tasks: ['sass']
      }
    },
    clean: {
      dist: [
        'css/'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Register tasks
  grunt.registerTask('default', []);
  grunt.registerTask('build', [
    'clean',
    'sass',
    'cssmin'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);
};