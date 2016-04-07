module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks 

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
				files : [
					{
						expand : true,
						cwd    : 'src',
						src    : ['index.php', 'Scripts', 'Classes', 'Templates'],
						dest   : 'build/',
					}
				]
			}
		}
	});

	grunt.registerTask('default', ['sass', 'copy']);
};
