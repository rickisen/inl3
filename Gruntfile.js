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
				'build/stylesheets/sass/main.css': '/sass/main.scss'
			}
		}
	}
});

grunt.registerTask('default', ['sass']);
