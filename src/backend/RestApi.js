"use strict";
var LoggerFactory_1 = require("./logging/LoggerFactory");
var RestApi = (function () {
    function RestApi(router, chipincore, lF) {
        this.router = router;
        this.chipincore = chipincore;
        var log = lF.GetLogger("RestApi");
        log.SetLevel(LoggerFactory_1.LogLevel.Debug);
        router.get('/chipment/user/id/:id/key/:key', function (req, res) {
            log.Info("Get Chipment for user");
            var key = req.params.key;
            var id = req.params.id;
            res.json(chipincore.GetChipmentUser(key, id));
        });
        router.get('/test', function (req, res) {
            res.json({ ok: "ok" });
        });
        router.post('/chipment/user/createId/:createId/key/:key', function (req, res) {
            log.Info("Create chipment");
            var key = req.params.key;
            var id = req.params.createId;
            console.dir(req.body);
            log.Debug("request");
            log.Debug(req);
            log.Debug("request body");
            log.Debug(req.body);
            var info = req.body["info"];
            log.Debug("request body info");
            log.Debug(req.body.info);
            console.log(Object.keys(req.body));
            res.json(chipincore.CreateChipment(key, id, info));
        });
        router.get('/chipment/author/id/:id/key/:key', function (req, res) {
            var key = req.params.key;
            var id = req.params.id;
            res.json(chipincore.GetChipmentAuthor(key, id));
        });
        router.post('/chipment/author/change/id/:id/key/:key', function (req, res) {
            var key = req.params.key;
            var id = req.params.id;
            var info = req.body.info;
            res.json(chipincore.SetChipment(key, id, info));
        });
        router.get('/chipment/author/delete/id/:id/key/:key', function (req, res) {
            var key = req.params.key;
            var id = req.params.id;
            var result = chipincore.RemoveChipment(key, id);
            res.json(result);
        });
        router.post('/chipment/user/id/:id/key/:key/createchipin/', function (req, res) {
            var key = req.params.key;
            var id = req.params.id;
            var info = req.body.info;
            res.json(chipincore.CreateChipin(key, id, info));
        });
        router.post('/chipment/user/id/:id/key/:key/chipin/changeId/:chipinid', function (req, res) {
            var key = req.params.key;
            var id = req.params.id;
            var chipinid = req.params.chipinid;
            var info = req.body.info;
            res.json(chipincore.ChangeChipin(key, id, chipinid, info));
        });
        router.get('/chipment/user/id/:id/key/:key/chipin/removeId/:chipinid', function (req, res) {
            var key = req.params.key;
            var id = req.params.id;
            var chipinid = req.params.chipinid;
            res.json(chipincore.DeleteChipin(key, id, chipinid));
        });
    }
    return RestApi;
}());
exports.RestApi = RestApi;
//# sourceMappingURL=RestApi.js.map