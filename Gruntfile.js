'use strict';

module.exports = function (grunt) {
	var config = {
		source: 'source/',
		dest: 'dist/'
	};
    grunt.initConfig({
        config: config,
        connect: {
            options: {
                port: 9012,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: '<%= config.dest %>'
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dest %>',
                    livereload: false
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source %>css/',
                    src: ['**/*.scss'],
                    dest: '<%= config.dest %>css/',
                    ext: '.css'
                }]
            }
        },
        assemble: {
            options: {
                flatten: false,
                partials: ['<%= config.source %>html/partials/**/*.hbs'],
                layout: ['<%= config.source %>html/layouts/default.hbs'],
                data: ['<%= config.source %>html/data/**/*.{json,yml}']
            },
            pages: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.source %>html/pages/',
                        dest: '<%= config.dest %>',
                        src: ['**/*.hbs'],
                        ext: '.html'
                    }
                ]
            }
        },
        copy: {
            files: {
                files: [{
                    src: ['*.*'],
                    dest: '<%= config.dest %>images/',
                    cwd:  '<%= config.source %>images/',
                    expand: true
                }, {
                    src: ['*.*'],
                    dest: '<%= config.dest %>css/images/',
                    cwd:  '<%= config.source %>css/images/',
                    expand: true
                }]
            },
            js: {
                files: [{
                    src: ['*.js'],
                    dest: '<%= config.dest %>js/',
                    cwd:  '<%= config.source %>js/',
                    expand: true
                }]
            }
        },
    	watch: {
    		scripts: {
    	    	options: {
    	      		livereload: true,
    	    	},
    	    	files: ['<%= config.source %>js/*.js'],
    	    	tasks: ['js'],
    	  	},
    		html: {
    			options: {
    				livereload: true,
    			},
    			files: ['<%= config.source %>html/**/*.{html,hbs,json,yml}'],
    			tasks: ['html']
            },
            css: {
                options: {
                    livereload: true
                },
                files: ['<%= config.source %>/css/**/*.scss'],
                tasks: ['css']
            }
    	}
    });
	grunt.loadNpmTasks('grunt-newer' );
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
	grunt.registerTask('html', ['newer:assemble' ]);
	grunt.registerTask('css', ['newer:sass']);
	grunt.registerTask('js', ['newer:copy:js' ]);
    grunt.registerTask('build', [
        'sass',
        'assemble',
        'newer:copy:files'
    ]);
    grunt.registerTask('run', ['build']);
	grunt.registerTask('default', ['build','connect:livereload', 'watch']);
}