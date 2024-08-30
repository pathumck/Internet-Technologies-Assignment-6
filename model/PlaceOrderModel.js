export default class PlaceOrderModel {
    constructor(orderId, cusId, total, date, cartTmList) {
        this._orderId = orderId;
        this._cusId = cusId;
        this._total = total;
        this._date = date;
        this._cartTmList = cartTmList;
    }

    get orderId() {
        return this._orderId;
    }

    get cusId() {
        return this._cusId;
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

    set cusId(cusId) {
        this._cusId = cusId;
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

