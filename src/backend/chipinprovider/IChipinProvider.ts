/// <reference path="./index.ts"/>
module backend {

    export interface IChipinProvider {
        GetChipment(id: string): P.Promise<commonend.Chipment>
        CreateChipment(id: string, info): P.Promise<string>
        SetChipment(id, info): P.Promise<boolean>
        DeleteChipment(id: string): P.Promise<boolean>
        CreateAndAddChipin(id: string, info): P.Promise<number>
        DeleteChipinOfChipment(id: string, chipinid: number): P.Promise<boolean>
        SetChipinOfChipment(id: string, chipinid: number, info): P.Promise<boolean>
    }
}
