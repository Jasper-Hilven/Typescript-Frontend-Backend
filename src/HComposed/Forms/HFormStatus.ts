export enum HFormStatusType {
  OK, Warning, Error
}
export class HFormStatus { constructor(public StatusType: HFormStatusType, public Message: string) { } }
