module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	connect: {
    		server: {
    			options: {
    				port: 9001,
    				hostname: '127.0.0.1',
                    open: true
    			}
    		}
    	},
        compass: {
            dev: {
                options: {
                    sassDir: 'assets/sass/',
                    cssDir: 'assets/css/',
                    javascriptsDir: 'assets/js',
                    imagesDir: 'assets/images/',
                    fontsDir: 'assets/fonts',
                    outputStyle: 'compressed',
                    relativeAssets: true
                }
            }
        },
        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            all: ['assets/js/functions.js', 'assets/js/validation.js']
        },
        uglify: {
            my_target: {
                options: {
                    mangle: false,
                    except: ['jQuery']
                },
                files: {
                    'assets/js/default.min.js': ['assets/js/functions.js', 'assets/js/validation.js']
                }
            }
        },
        csslint: {
            dev: {
                csslintrc: '.csslintrc'
            },
            strict: {
                src: ['assets/css/*']
            }
        },
        watch: {
            sass: {
                files: ['assets/sass/**/*'],
                tasks: ['css']
            },
            js: {
                files: ['assets/js/**/*'],
                tasks: ['jshint', 'uglify']
            },
            html: {
                files: "/*.html"
            }
        }
    });

    //loading plugins
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    //register tasks
    grunt.registerTask('startServer', ['connect:server', 'watch']);
    grunt.registerTask('css', ['compass:dev', 'csslint:strict']);
    grunt.registerTask('heroku:production', 'startServer', 'watch');
    grunt.registerTask('start', ['css','startServer', 'watch']);
}
