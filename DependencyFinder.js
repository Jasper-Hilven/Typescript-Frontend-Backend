var fileSystem = require("fs");

var _getAllFilesFromFolder = function(dir) {
  var filesystem = require("fs");
  var results = [];
  filesystem.readdirSync(dir).forEach(function(file) {
    file = dir + '/' + file;
    var stat = filesystem.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file))
    } else results.push(file);
  });
  return results;
};

var AddDependenciesToCollection = function(allDependencies, filePath, fileName, foundClasses) {
  throw "NotYetImplemented";
}
var ReadFileContent=function(file){throw "NotYetImplemented";};
var ExtractName = function(file){throw "NotYetImplemented";};
var FindClasses = function(fileName, fileContent) {
  var exportClass = "export class ";
  var retClasses = [];
  for (var i in fileContent) {
    var line = fileContent[i];
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

};
var FillInDependencies = function(filePath, dependencies) {};
