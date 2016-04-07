module.exports = function(grunt) {
	// npm install --save-dev load-grunt-tasks 
	require('load-grunt-tasks')(grunt); 

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'build/Stylesheets/main.css': 'src/Stylesheets/main.scss'
				}
			}
		},
		copy : {
			main : {
				files : [{
					expand : true,
					cwd    : 'src',
					src    : ['index.php', 'Classes/*.php', 'Templates/*.php'],
					dest   : 'build/',
				} ]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/Scripts/*.js',
				dest: 'build/'
			}
		},
		watch: {
			css: {
				files: ['src/Stylesheets/*.scss'],
				tasks: ['sass'],
				options: { spawn: false }
			},
			php: {
				files: ['src/*.php', 'src/Templates/*.php', 'src/Classes/*.php'],
				tasks: ['copy'],
				options: { spawn: false }
			},
			js: {
				files: ['src/Scripts/*.js'],
				tasks: ['uglify'],
				options: { spawn: false }
			} 
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['sass', 'copy', 'uglify']);
};
