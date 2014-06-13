module.exports = function(grunt){
    grunt.initConfig({
        mochacli: {
            files: 'tests/',
            options: {
                reporter: 'spec',
                recursive: true
            }
        },
        watch:{
            js:{
                files:[
                    'modules/**/*.js',
                    'server.js'
                ],
                tasks:['test']
            }
        }

    });

    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', ['mochacli']);
};


