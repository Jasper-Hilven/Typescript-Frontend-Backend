/* tslint:disable */
/// <reference path="./index.gen.ts"/>
module backend
{
  let server = new Server('dist/prod/public');
  server.Start();
}
