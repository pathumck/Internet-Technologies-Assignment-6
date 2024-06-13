export class ItemModel {
    constructor(code, name, price, qty) {
        this._code = code;
        this._name = name;
        this._price = price;
        this._qty = qty;
    }

    get code() {
        return this._code;
    }

    set code(value) {
        this._code = value
    }

    get name() {
        return this._name
    }

    set name(value) {
        this._name = value
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

}