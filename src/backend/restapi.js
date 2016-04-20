var express = require('express');
module.exports = function(chipincore) {
  var router = express.Router();
  ///////////////API FOR chipment/////////////////
  ////////GETUSER//////////
  router.get('/chipment/user/id/:id/key/:key', function(req, res) {
    var key = req.params.key;
    var id = req.params.id;
    res.json(chipincore.getChipmentUser(key, id));
  });

    router.get('/test', function(req, res) {
	  res.json({ok: "ok"});
	});
  ////////CREATECHIPMENT//////////
  router.post('/chipment/user/createId/:createId/key/:key', function(req, res) {
    var key = req.params.key;
    var id = req.params.createId;
    var info = req.body.info;
    res.json(chipincore.createChipment(key, id, info));
  });

  ////////GETAUTHOR//////////
  router.get('/chipment/author/id/:id/key/:key', function(req, res) {
    var key = req.params.key;
    var id = req.params.id;
    res.json(chipincore.getChipmentAuthor(key, id));
  });
  ////////CHANGE AUTHOR//////////
  router.post('/chipment/author/change/id/:id/key/:key', function(req, res) {
    var key = req.params.key;
    var id = req.params.id;
    var info = req.body.info;
    res.json(chipincore.setChipment(key, id, info));
  });

  ////////REMOVE AUTHOR//////////
  router.get('/chipment/author/delete/id/:id/key/:key', function(req, res) {
    var key = req.params.key;
    var id = req.params.id;
    var result = chipincore.removeChipment(key, id);
    res.json(result);
  });
  ////////CHIPIN API//////////
  ////////ADDCHIPIN//////////
  router.post('/chipment/user/id/:id/key/:key/createchipin/', function(req, res) {
    var key = req.params.key;
    var id = req.params.id;
    var info = req.body.info;
    res.json(chipincore.createChipin(key, id, info));
  });
  ////////CHANGECHIPIN//////////
  router.post('/chipment/user/id/:id/key/:key/chipin/changeId/:chipinid', function(req, res) {
    var key = req.params.key;
    var id = req.params.id;
    var chipinid = req.params.chipinid;
    var info = req.body.info;
    res.json(chipincore.changeChipin(key, id, chipinid, info));
  });
  ////////DELETECHIPIN//////////
  router.get('/chipment/user/id/:id/key/:key/chipin/removeId/:chipinid', function(req, res) {
    var key = req.params.key;
    var id = req.params.id;
    var chipinid = req.params.chipinid;
    res.json(chipincore.deleteChipin(key, id, chipinid));
  });
  return router;
};
