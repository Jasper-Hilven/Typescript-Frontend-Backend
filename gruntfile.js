module.exports = function(grunt) {

    grunt.initConfig({
        tslint: {
            options: {
                configuration: grunt.file.readJSON('tslint.json')
            },
            files: {
                src: 'src/**/*.ts'
            }
        },
        ts: {
            backend: {
                src: ["src/backend/**/*.ts"]
            },
            frontend: {
                src: ["dist/references.ts","src/frontend/**/*.ts"],
                out: "dist/out.js",
                reference: "dist/references.ts"

                //options:{module:"commonjs"}

            }
        }

    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");
};
