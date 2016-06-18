/* tslint:disable */
/// <reference path="./index.gen.ts"/>
module backend {
  let server = new Server('dist/dev/public');
  console.log("Created a new server");
  server.Start();
}
