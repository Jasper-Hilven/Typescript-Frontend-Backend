import ChipmentModule = require("./Chipment"); import Chipment = ChipmentModule.Chipment;
import ChipinModule = require("./Chipin"); import Chipin = ChipinModule.Chipin;

export class BackendProxy {

  apiRef: string;
  chipmentRef: string;
  chipmentRefUser: string;
  chipmentRefAuthor: string;
  constructor(private BackendUrl: string) {
    this.apiRef = BackendUrl + "/api/";
    this.chipmentRef = this.apiRef + "chipment/"
    this.chipmentRefUser = this.chipmentRef + "user/";
    this.chipmentRefAuthor = this.chipmentRef + "author/";
  }
  SendGetRequest(url, succesCallBack, failCallBack) {
    return $.ajax({
      type: 'GET', url: url,
      contentType: "application/json",
      async: false,
      dataType: 'jsonp', headers: { "Access-Control-Allow-Origin": 'http://*' },
      jsonpCallback: 'jsonCallback',
      success: function(jsonp) {
        //succesCallBack(JSON.stringify(jsonp, null, 2));
      }
      , error: function(jsonp) {
        //$("#jsonp-response").html(JSON.stringify(jsonp, null, 2));
      }
    });
  }

  SendPostRequest(url, body) {
    return $.post(url, body);
  }

  GetChipmentAsUser(userId, key, success, fail) {
    var requestUrl = this.chipmentRefUser + "id/" + userId + "/key/" + key;
    return this.SendGetRequest(requestUrl, success, fail);
  }

  CreateChipment(createId, key, chipment: Chipment) {
    var requestUrl = this.chipmentRefUser + "createId/" + createId + "/key/" + key;
    return this.SendPostRequest(requestUrl, chipment.ToJSon());
  }

  GetChipmentAsAuthor(id, key, success, fail) {
    var requestUrl = this.chipmentRefAuthor + "id/" + id + "/key/" + key;
    return this.SendGetRequest(requestUrl, success, fail);
  }
  SetChipmentAsAuthor(id, key, chipment: Chipment) {
    var requestUrl = this.chipmentRefAuthor + "change/id/" + id + "/key/" + key;
    return this.SendPostRequest(requestUrl, chipment.ToJSon());
  }

  RemoveChipmentAsAuthor(id, key, success, fail) {
    var requestUrl = this.chipmentRefAuthor + "delete/id/" + id + "/key/" + key;
    return this.SendGetRequest(requestUrl, success, fail);
  }

  AddChipin(id, key, chipinInfo) {
    var requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/createchipin/";
    return this.SendPostRequest(requestUrl, chipinInfo.ToJSon());
  }

  ChangeChipin(id, key, chipinId, chipinInfo: Chipin) {
    var requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/chipin/changeId/" + chipinId;
    return this.SendPostRequest(requestUrl, chipinInfo.ToJSon());
  }

  RemoveChipin(id, key, chipinId, success, fail) {
    var requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/chipin/removeIdd/" + chipinId;
    return this.SendGetRequest(requestUrl, success, fail);
  }
}
