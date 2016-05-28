/* tslint:disable */
module backend {
  export class RestApi {
    private log: commonend.Logger;
    constructor(private router: any,
      private chipincore: CoreApi, lF: commonend.LoggerFactory) {
      let log = lF.GetLogger("RestApi");

      ////////GETUSER//////////
      router.get('/chipment/user/id/:id/key/:key', function(req, res) {
        log.Info("Get Chipment for user");
        let key = req.params.key;
        let id = req.params.id;
        chipincore.GetChipmentUser(key, id).then(c => res.json(c));
      });

      router.get('/test', function(req, res) {
        res.json({ ok: "ok" });
      });
      ////////CREATECHIPMENT//////////
      router.post('/chipment/user/createId/:createId/key/:key', function(req, res) {
        log.Info("Create chipment");
        let key = req.params.key;
        let id = req.params.createId;
        let info = req.body["info"];
        log.Debug("request body info");
        log.Debug(req.body.info);
        chipincore.CreateChipment(key, id, info)
        .then(c=> res.json(c));
      });

      ////////GETAUTHOR//////////
      router.get('/chipment/author/id/:id/key/:key', function(req, res) {
       log.Info("GetChipment as author");
        let key = req.params.key;
        let id = req.params.id;
        chipincore.GetChipmentAuthor(key, id)
        .then(c => res.json(c));
      });
      ////////CHANGE AUTHOR//////////
      router.post('/chipment/author/change/id/:id/key/:key', function(req, res) {
        log.Info("SetChipment as author");
        let key = req.params.key;
        let id = req.params.id;
        let info = req.body.info;
        chipincore.SetChipment(key, id, info)
        .then(success => res.json(success));
      });

      ////////REMOVE AUTHOR//////////
      router.get('/chipment/author/delete/id/:id/key/:key', function(req, res) {
        log.Info("Delete Chipment as author");
        let key = req.params.key;
        let id = req.params.id;
        let result = chipincore.RemoveChipment(key, id)
        .then(success => res.json(success));
      });
      ////////CHIPIN API//////////
      ////////ADDCHIPIN//////////
      router.post('/chipment/user/id/:id/key/:key/createchipin/', function(req, res) {
       log.Info("AddChipin as user");
        let key = req.params.key;
        let id = req.params.id;
        let info = req.body;
        chipincore.CreateChipin(key, id, info).then(n => res.json(n));
      });
      ////////CHANGECHIPIN//////////
      router.post('/chipment/user/id/:id/key/:key/chipin/changeId/:chipinid', function(req, res) {
      log.Info("ChangeChipin as user");
        let key = req.params.key;
        let id = req.params.id;
        let chipinid = req.params.chipinid;
        let info = req.body.info;
        chipincore.ChangeChipin(key, id, chipinid, info).then(success =>res.json(success));
      });
      ////////DELETECHIPIN//////////
      router.get('/chipment/user/id/:id/key/:key/chipin/removeId/:chipinid', function(req, res) {
       log.Info("Delete chipin as user");
        let key = req.params.key;
        let id = req.params.id;
        let chipinid = req.params.chipinid;
        chipincore.DeleteChipin(key, id, chipinid).then(success => res.json(success));
      });
    }



  }
}
