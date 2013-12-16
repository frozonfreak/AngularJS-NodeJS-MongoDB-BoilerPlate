module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'public/css/*.css',
        dest: 'public/css/build/prefixed/'
      }
    },

    cssmin: {
      combine: {
        files: {
          'public/css/style.css': ['css/build/prefixed/global.css']
        }
      }
    },

    jshint: {
      beforeconcat: ['public/js/*.js']
    },

    concat: {
      dist: {
        src: [
          'public/js/vendor/*.js',
          'public/js/app.js'
        ],
        dest: 'public/js/build/production.js'
      }
    },

    uglify: {
      build: {
        src: 'public/js/build/production.js',
        dest: 'public/js/build/production.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'public/image/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/image/'
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['public/js/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['public/css/*.scss'],
        tasks: ['autoprefixer', 'cssmin'],
        options: {
          spawn: false,
        }
      },
      images: {
        files: ['public/image/**/*.{png,jpg,gif}', 'public/image/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }
    },


  });

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);

  grunt.registerTask('dev', ['watch']);

};