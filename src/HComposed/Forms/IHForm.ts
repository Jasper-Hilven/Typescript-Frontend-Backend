export interface IHForm {
  GetElement(): HTMLElement;
  NotifyChanges(key: string, value: string);
}