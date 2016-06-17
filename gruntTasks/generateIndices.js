var path = require('path');
var endOfLine = require('os').EOL;

module.exports = function (grunt) {
    grunt.registerMultiTask("generateIndices", function () {
        var that = this;

        this.files.forEach(function (file) {
            var contents = file.src.filter(function (filepath) {
                // Remove nonexistent files (it's up to you to filter or warn here).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function (filepath) {

                var oriContents = grunt.file.read(filepath);
                var contents = oriContents;
                var fileFolder = path.dirname(filepath);
                var imports = generateImportsForFiles(
                    [fileFolder + "/*.ts",
                        "!" + fileFolder + "/*index.gen.ts",
                        "!" + fileFolder + "/*.noindex.*",
                        "!" + fileFolder + "/*.spec.ts"],
                    fileFolder + "/");
                contents = replaceAutogenTag("THISFOLDER", contents, imports);
                var imports = generateImportsForFiles(
                    [fileFolder + "/*/*index.gen.ts"],
                    fileFolder + "/");
                contents = replaceAutogenTag("SUBINDICES", contents, imports);
                if (contents != oriContents)
                    grunt.file.write(filepath, contents);
            });
        });

    });

    function replaceAutogenTag(tagName, fileContents, newGenContents) {
        var startTag = "////" + tagName + "-START";
        var endTag = "////" + tagName + "-END";
        var regEx = new RegExp(startTag + "(.|[\n\r])*" + endTag, "m");

        return fileContents.replace(regEx, startTag + endOfLine + newGenContents + endOfLine + endTag);
    }

    function generateImportsForFiles(filePattern, relativeDir) {
        return grunt.file.expand(filePattern)
            .map(function (f) {
                var url = path.relative(relativeDir, f);
                if (path.sep == "\\")
                    url = url.replace(/\\/g, "/");
                return '/// <reference path="' + url + '" />'
            }).join(endOfLine);
    }

};
