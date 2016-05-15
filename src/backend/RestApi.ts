/* tslint:disable */
module backend {
  export class RestApi {
    private log: commonend.Logger;
    constructor(private router: any,
      private chipincore: CoreApi, lF: commonend.LoggerFactory) {
      let log = lF.GetLogger("RestApi");
      log.SetLevel(commonend.LogLevel.Debug);

      ////////GETUSER//////////
      router.get('/chipment/user/id/:id/key/:key', function(req, res) {
        log.Info("Get Chipment for user");
        let key = req.params.key;
        let id = req.params.id;
        res.json(chipincore.GetChipmentUser(key, id));
      });

      router.get('/test', function(req, res) {
        res.json({ ok: "ok" });
      });
      ////////CREATECHIPMENT//////////
      router.post('/chipment/user/createId/:createId/key/:key', function(req, res) {
        log.Info("Create chipment");
        let key = req.params.key;
        let id = req.params.createId;
        log.Debug("request");
        log.Debug(req);
        log.Debug("request body");
        log.Debug(req.body);
        let info = req.body["info"];
        log.Debug("request body info");
        log.Debug(req.body.info);
        res.json(chipincore.CreateChipment(key, id, info));
      });

      ////////GETAUTHOR//////////
      router.get('/chipment/author/id/:id/key/:key', function(req, res) {
        let key = req.params.key;
        let id = req.params.id;
        res.json(chipincore.GetChipmentAuthor(key, id));
      });
      ////////CHANGE AUTHOR//////////
      router.post('/chipment/author/change/id/:id/key/:key', function(req, res) {
        let key = req.params.key;
        let id = req.params.id;
        let info = req.body.info;
        res.json(chipincore.SetChipment(key, id, info));
      });

      ////////REMOVE AUTHOR//////////
      router.get('/chipment/author/delete/id/:id/key/:key', function(req, res) {
        let key = req.params.key;
        let id = req.params.id;
        let result = chipincore.RemoveChipment(key, id);
        res.json(result);
      });
      ////////CHIPIN API//////////
      ////////ADDCHIPIN//////////
      router.post('/chipment/user/id/:id/key/:key/createchipin/', function(req, res) {
        let key = req.params.key;
        let id = req.params.id;
        let info = req.body;
        res.json(chipincore.CreateChipin(key, id, info));
      });
      ////////CHANGECHIPIN//////////
      router.post('/chipment/user/id/:id/key/:key/chipin/changeId/:chipinid', function(req, res) {
        let key = req.params.key;
        let id = req.params.id;
        let chipinid = req.params.chipinid;
        let info = req.body.info;
        res.json(chipincore.ChangeChipin(key, id, chipinid, info));
      });
      ////////DELETECHIPIN//////////
      router.get('/chipment/user/id/:id/key/:key/chipin/removeId/:chipinid', function(req, res) {
        let key = req.params.key;
        let id = req.params.id;
        let chipinid = req.params.chipinid;
        res.json(chipincore.DeleteChipin(key, id, chipinid));
      });
    }



  }
}
