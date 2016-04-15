var fileSystem = require("fs");
var pathModule = require('path');
var gutil = require('gulp-util');

var _getAllFilesFromFolder = function(dir) {
  var results = [];
  fileSystem.readdirSync(dir).forEach(function(file) {
    file = dir + '/' + file;
    var stat = fileSystem.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file))
    } else results.push(file);
  });
  return results;
};

var AddDependenciesToCollection = function(allDependencies, filePath, fileName, foundClasses) {
  allDependencies.push(foundClasses);
}
var ReadFileContent=function(file){return
return fileSystem.ReadFileContent(file).split("\n");
};
var ExtractName = function(file){ return pathModule.basename(file);};
var FindClasses = function(fileName, fileContent) {
  var exportClass = "export class ";
  var retClasses = [];
  for (var i in fileContent) {
    var line = fileContent[i];
      gutil.log(line);
    if (!line.contains(exportClass))
      continue;
    var index = line.indexOf(exportClass) + exportClass.length;
    var className = (line.substring(index));
    retClasses.push(fileName + ":" + className);
  }
  return retClasses;
};

var StoreDependencies = function(folderPath, dependencies) {
  var allFiles = _getAllFilesFromFolder(folderPath);
  var allDependencies = [];
  allFiles.forEach(function(file) {
    var content = ReadFileContent(file);
    var name = ExtractName(file);
    var foundClasses = FindClasses(name, content);
    AddDependenciesToCollection(allDependencies,file,name,foundClasses);
  });
  return allDependencies;
};
var FillInDependencies = function(filePath, dependencies) {};
exports.LogAllThingies = function(filePath){
  return StoreDependencies(filePath,[]);
}
