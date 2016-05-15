/* tslint:disable */
/// <reference path="./server.ts"/>

let server: backend.Server = new backend.Server('dist/dev/public');
server.Start();
