/// <reference path="./index.gen.ts" />

module frontend {
    export interface IFormElement {
        GetVisualization(): IHElement;
        GetName(): string;
        GetDefaultValue(): string;
        SetForm(form: HForm): void;
        SetStatus(res: HFormStatus): void;
    }
}
