export default class PlaceOrderModel {
    constructor(orderId, cusName, total, date, cartTmList) {
        this._orderId = orderId;
        this._cusName = cusName;
        this._total = total;
        this._date = date;
        this._cartTmList = cartTmList;
    }

    get orderId() {
        return this._orderId;
    }

    get cusName() {
        return this._cusName;
    }

    get total() {
        return this._total;
    }

    get date() {
        return this._date;
    }

    get cartTmList() {
        return this._cartTmList;
    }

    set orderId(orderId) {
        this._orderId = orderId;
    }

    set cusName(cusName) {
        this._cusName = cusName;
    }

    set total(total) {
        this._total = total;
    }

    set date(date) {
        this._date = date;
    }

    set cartTmList(cartTmList) {
        this._cartTmList = cartTmList;
    }
}

