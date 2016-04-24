import {Chipment,Chipin, User} from "../../backend/ChipinModel";

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
      dataType: 'json',
      success: function(json) {
        succesCallBack(json);
      }
      , error: function(json) {
        failCallBack(json);
      }
    });
  }

  SendPostRequest(url, body,succesCallBack,failCallBack) {
    console.log(body);
    return $.ajax({
        type: "POST",
        url: url,
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(body),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(json) {
          succesCallBack(json);
        }
        , error: function(json) {
          failCallBack(json);
        }}
    );
  }

  GetChipmentAsUser(userId, key, success, fail) {
    console.log("Getting chipment as user");
    var requestUrl = this.chipmentRefUser + "id/" + userId + "/key/" + key;
    return this.SendGetRequest(requestUrl, success, fail);
  }

  CreateChipment(createId, key, chipment: Chipment, success, fail) {
    var requestUrl = this.chipmentRefUser + "createId/" + createId + "/key/" + key;
    return this.SendPostRequest(requestUrl, {'info': chipment.ToJSon()}, success, fail);
  }

  GetChipmentAsAuthor(id, key, success, fail) {
    var requestUrl = this.chipmentRefAuthor + "id/" + id + "/key/" + key;
    return this.SendGetRequest(requestUrl, success, fail);
  }
  SetChipmentAsAuthor(id, key, chipment: Chipment, success, fail) {
    var requestUrl = this.chipmentRefAuthor + "change/id/" + id + "/key/" + key;
    return this.SendPostRequest(requestUrl, chipment.ToJSon(), success, fail);
  }

  RemoveChipmentAsAuthor(id, key, success, fail) {
    var requestUrl = this.chipmentRefAuthor + "delete/id/" + id + "/key/" + key;
    return this.SendGetRequest(requestUrl, success, fail);
  }

  AddChipin(id, key, chipinInfo:Chipin, success, fail) {
    var requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/createchipin/";
    return this.SendPostRequest(requestUrl, chipinInfo.ToJSon(), success, fail);
  }

  ChangeChipin(id, key, chipinId, chipinInfo: Chipin, success, fail) {
    var requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/chipin/changeId/" + chipinId;
    return this.SendPostRequest(requestUrl, chipinInfo.ToJSon(), success, fail);
  }

  RemoveChipin(id, key, chipinId, success, fail) {
    var requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/chipin/removeIdd/" + chipinId;
    return this.SendGetRequest(requestUrl, success, fail);
  }
  GetRanddomId(){
    return ""+Math.random()+Math.random();

  }
}
