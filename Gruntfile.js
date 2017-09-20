module.exports = function(grunt) {

	grunt.initConfig({
		copy: {
		  main: {
		    files: [
		      // includes files within path and its sub-directories
		      {expand: true, src: ['static/**'], dest: 'dist/'},
		      {expand: true, src: ['index.html'], dest: 'dist/'}
		    ],
		  },
		},
		uglify: {
	        files: 'dist/static/js/FileUploader.js',
	        tasks: ['uglify'],
	        options: {
	          livereload: true
	        }
      },
      uglify: {
      build: {
        files: {
          'dist/static/js/FileUploader.min.js': ['dist/static/js/FileUploader.js']
        }
      }
    },
    strip_code: {
	    options: {
	      blocks: [
	        {
	          start_block: "/* remove-from-prod */",
	          end_block: "/* end-remove-from-prod */"
	        }
	      ]
	    },
	    your_target: {
	        src: 'dist/static/js/FileUploader.js'
	    }
	  }
	})
	grunt.registerTask('build:dev', ['copy','uglify']);
	grunt.registerTask('build:prod', ['copy','strip_code','uglify']);
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-strip-code');
};