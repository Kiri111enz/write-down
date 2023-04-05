import { makeAutoObservable } from 'mobx';

type Rule = (s: string) => string

class FormField {
    private _value = '';
    private _isValid = false;
    private _errorMsg = '';

    constructor(private _rules: Rule[]) {
        makeAutoObservable(this);
    }

    public get value(): string { return this._value; }

    public get isValid(): boolean { return this._isValid; }

    public get errorMsg(): string { return this._errorMsg; }

    private set errorMsg(value: string) {
        this._isValid = !value;
        this._errorMsg = value;
    }

    public update = (value: string): void => {
        this._value = value;
        for (const rule of this._rules) {
            const errorMsg = rule(value);
            if (errorMsg) {
                this.errorMsg = errorMsg;
                return;
            }
        }
        this.errorMsg = '';
    }; 
}

class FormStore {
    private _fields: Record<string, FormField> = { };

    constructor(rulesById: Record<string, Rule[]>) {
        for (const [id, rules] of Object.entries(rulesById))
            this._fields[id] = new FormField(rules);
        
        makeAutoObservable(this);
    }

    public get fields(): Record<string, FormField> { return this._fields; }

    public get allValid(): boolean {
        for (const [, field] of Object.entries(this._fields))
            if (!field.isValid)
                return false;
        return true;
    }

    public onFieldChange = (id: string, value: string): void =>
        this._fields[id].update(value);
}

export { FormStore, FormField, Rule as FormFieldRule };