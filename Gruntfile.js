module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json');
    concat: {
      js: {

      }
    }
    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    }
    uglify: {
      options: {
        compress: true
      }
      file: {

      }
    }
    shell: {
      prodServer: {
        command: 'git push heroku master'
      }
    }
  });

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run(['nodemon']);
  });

  grunt.registerTask('build',[]);

  grunt.registerTask('upload', function(n) {

  });

  grunt.registerTask('deploy',['build']);

}