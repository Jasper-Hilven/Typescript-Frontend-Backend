/* tslint:disable */
/// <reference path="./index.ts" />
module frontend {
  declare let $;
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
    SendGetRequestP(url): P.Promise<any> {
      let a: P.Deferred<any> = P.defer<any>();
      this.SendGetRequest(url,
       (v:any)=>{
       console.log("resolving promise");
       a.resolve(v);
      },
      (e:any)=>{
       console.log("rejecting promise", e);
      a.reject(e);
     });
      console.log("returning promise...")
      return a.promise();
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
    SendPostRequestP(url, body): P.Promise<any> {
     let a: P.Deferred<any> = P.defer<any>();
     this.SendPostRequest(url,body,
      (v:any)=>{
      console.log("resolving promise");
      a.resolve(v);
     },
     (e:any)=>{
      console.log("rejecting promise",e);
     a.reject(e);
    });
     console.log("returning promise...")
     return a.promise();
   }

    SendPostRequest(url, body, succesCallBack, failCallBack) {
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
        }
      }
      );
    }

    GetChipmentAsUser(userId, key): P.Promise<any> {
      console.log("Getting chipment as user");
      let requestUrl = this.chipmentRefUser + "id/" + userId + "/key/" + key;
      return this.SendGetRequestP(requestUrl);
    }

    CreateChipment(createId, key, chipment: commonend.Chipment): P.Promise<any> {
      let requestUrl = this.chipmentRefUser + "createId/" + createId + "/key/" + key;
      return this.SendPostRequestP(requestUrl, { 'info': chipment.ToJSon() });
    }

    GetChipmentAsAuthor(id, key): P.Promise<any> {
      let requestUrl = this.chipmentRefAuthor + "id/" + id + "/key/" + key;
      return this.SendGetRequestP(requestUrl);
    }
    SetChipmentAsAuthor(id, key, chipment: commonend.Chipment): P.Promise<any> {
      let requestUrl = this.chipmentRefAuthor + "change/id/" + id + "/key/" + key;
      return this.SendPostRequestP(requestUrl, chipment.ToJSon());
    }

    RemoveChipmentAsAuthor(id, key): P.Promise<any> {
      let requestUrl = this.chipmentRefAuthor + "delete/id/" + id + "/key/" + key;
      return this.SendGetRequestP(requestUrl);
    }

    AddChipin(id, key, chipinInfo: commonend.Chipin): P.Promise<any> {
      let requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/createchipin/";
      return this.SendPostRequestP(requestUrl, chipinInfo.ToJSon());
    }

    ChangeChipin(id, key, chipinId, chipinInfo: commonend.Chipin): P.Promise<any> {
      let requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/chipin/changeId/" + chipinId;
      return this.SendPostRequestP(requestUrl, chipinInfo.ToJSon());
    }

    RemoveChipin(id, key, chipinId, success, fail): P.Promise<any> {
      let requestUrl = this.chipmentRefUser + "id/" + id + "/key/" + key + "/chipin/removeIdd/" + chipinId;
      return this.SendGetRequestP(requestUrl);
    }
    GetRanddomId() {
      return "" + Math.random() + Math.random();
    }
  }
}
