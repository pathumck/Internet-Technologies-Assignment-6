import {cartTMList, customers, items} from "../db/db.js";
import PlaceOrderModel from "../model/PlaceOrderModel.js";
import {CartTm} from "../model/CartTm.js";

let orderCounter = 1;
var totalValueOfItems = 0;

loadOrderId();
loadItems();
setDate();
loadCustomers();
$('#discount').val(0);
function generateOrderId() {
    const prefix = 'OR00';
    const orderId = `${prefix}${orderCounter}`;
    orderCounter++;
    return orderId;
}

function loadOrderId() {
    $("#orderid").val(generateOrderId());
}

function setDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    $('#date').val(formattedDate);
}

function loadCustomers() {

    $("#selectcusid").empty();

    customers.map(customer => {
        var recode = `<option>${customer.id}</option>`

        $("#selectcusid").append(recode);

    });
}

$("#spanOrder").on('click', () => {
    loadCustomers();
    loadItems();
});

$('#selectcusid').click(function () {
    $('#cusid').val($('#selectcusid').val());
    customers.forEach(customer => {
        if ($('#selectcusid').val()===customer.id) {
            $('#tp').val(customer.tp);
            $('#address').val(customer.address);
            $('#name').val(customer.name);
        }
    });
});

function loadItems() {
    $('#selectitemcode').empty();

    items.map(item => {
        var recode = `<option>${item.code}</option>`
        $('#selectitemcode').append(recode);
    });

}

$('#selectitemcode').click(function () {
    $('#itemcode').val($('#selectitemcode').val());
    items.forEach(item => {
        if ($('#selectitemcode').val()===item.code) {
            $('#itemname').val(item.name);
            $('#itemprice').val(item.price);
            $('#qty').val(item.qty);
        }
    });
});

$('#btn-cart').click(function () {
   var code = $('#itemcode').val();
   var name = $('#itemname').val();
   var price = $('#itemprice').val();
   var qty = $('#orderqty').val();
   var total = price * qty;

   let cart = new CartTm(code, name, price, qty, total);

   cartTMList.push(cart);

   $('#itemcode').val("");
   $('#itemname').val("");
   $('#itemprice').val("");
   $('#orderqty').val("");
   $('#selectitemcode').val("");
   $('#qty').val("");

   loadTableCart();
});

function loadTableCart() {
    var tableBody = $('#table-cart').find('tbody');

    tableBody.empty();

    cartTMList.forEach(function (item, index) {
        var row = $('<tr>');

        $('<td>').text(item.code).appendTo(row);
        $('<td>').text(item.name).appendTo(row);
        $('<td>').text(item.price).appendTo(row);
        $('<td>').text(item.qty).appendTo(row);
        $('<td>').text(item.total).appendTo(row);

        var actionCell = $('<td>').addClass('table-action-col').appendTo(row);

        // Delete button
        $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
            .on('click', function () {
                var confirmDelete = confirm('Are you sure you want to delete this item?');
                if (confirmDelete) {
                    cartTMList.splice(index, 1);
                    loadTableCart();
                }
            }).appendTo(actionCell);

        row.appendTo(tableBody);
    });

    loadSubTotal();
}

function loadSubTotal() {
    let subTotal = 0;
    cartTMList.forEach(function (item,index) {
        subTotal += item.total;
    });

    $('#cart-total').text('Total : ' + subTotal);
    $('#sub-total').text('Sub Total : ' + subTotal);
}

$('#discount').click(function() {
    var totalText = $('#cart-total').text();
    var total = parseFloat(totalText.replace(/[^\d.-]/g, ''));

    var dis = parseFloat($('#discount').val());

    var sub = total * (100 - dis) / 100;

    $('#sub-total').text('Sub Total: ' + sub.toFixed(2));
});

$('#cash').on('input', function() {
    var totalText = $('#sub-total').text();
    var numericValue = parseFloat(totalText.match(/[\d.-]+/));

    var cashValue = parseFloat($(this).val());

    if (!isNaN(numericValue) && !isNaN(cashValue)) {
        var balance = cashValue - numericValue;
        $('#balance').val(balance.toFixed(2));
    } else {
        $('#balance').val('');
    }
});

$('#purchase-btn').click(function () {
    if (cartTMList.length === 0) {
        alert("Add some items to cart!");
        return;
    }

    cartTMList.forEach(function (item, index) {
        reduceQty(item.code, item.qty);
    })
});

function reduceQty(code,qty) {

    items.forEach(function (item, index) {
       if (code === item.code) {
           item.qty = item.qty - (qty);
       }
    });
    $('#orderCart-tbody').empty();
    clearFields();
    cartTMList.splice(0, cartTMList.length);
}

function clearFields() {
    $('#selectitemcode').text("");
    $('#itemcode').text("");
    $('#itemname').text("");
    $('#itemprice').text("");
    $('#qty').text("");
    $('#orderqty').text("");
    $('#cusid').val("");
    $('#selectcusid').text("");
    $('#name').val("");
    $('#tp').val("");
    $('#address').val("");
    $('#sub-total').text('Sub Total: ');
    $('#cart-total').text('Total: ');
    $('#discount').val(0);
    $('#balance').val('');
    $('#cash').val('');
}

