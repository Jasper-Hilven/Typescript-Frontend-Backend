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

  SendGetRequest(url) {
    var jquery = $;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  SendPostRequest(url, body) {

  }

  GetChipmentAsUser(userId, key) {
    var requestUrl = this.chipmentRefUser + "id/" + userId + "/key/" + key;
    return this.SendGetRequest(requestUrl);
  }

  CreateChipment(createId, key, chipment: Chipment) {
    var requestUrl = this.chipmentRefUser + "createId/" + createId + "/key/" + key;
    return this.SendPostRequest(requestUrl, chipment.ToJSon());
  }

  GetChipmentAsAuthor(id, key) {
    var requestUrl = this.chipmentRefAuthor + "id/" + id + "/key/" + key;
    return this.SendGetRequest(requestUrl);
  }
  SetChipmentAsAuthor(id, key, chipment: Chipment) {
    var requestUrl = this.chipmentRefAuthor + "change/id/" + id + "/key/" + key;
    return this.SendPostRequest(requestUrl, chipment.ToJSon());
  }

  RemoveChipmentAsAuthor(id, key) {
    var requestUrl = this.chipmentRefAuthor + "delete/id/" + id + "/key/" + key;
    return this.SendGetRequest(requestUrl);
  }

  AddChipin(id, key, chipinInfo) {
    var requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/createchipin/";
    return this.SendPostRequest(requestUrl, chipinInfo.ToJSon());
  }

  ChangeChipin(id, key, chipinId, chipinInfo: Chipin) {
    var requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/chipin/changeId/" + chipinId;
    return this.SendPostRequest(requestUrl, chipinInfo.ToJSon());
  }

  RemoveChipin(id, key, chipinId) {
    var requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/chipin/removeIdd/" + chipinId;
    return this.SendGetRequest(requestUrl);
  }
}
