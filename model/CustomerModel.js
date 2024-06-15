export class CustomerModel {
    constructor(id, name, address, tp) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._tp = tp;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._name = value
    }

    get name() {
        return this._name
    }

    set name(value) {
        this._name = value
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get tp() {
        return this._tp;
    }

    set tp(value) {
        this._tp = value;
    }

}