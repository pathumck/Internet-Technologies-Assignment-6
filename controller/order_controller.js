import {cartTMList, customers, items} from "../db/db.js";
import PlaceOrderModel from "../model/PlaceOrderModel.js";
import {CartTm} from "../model/CartTm.js";
import {CustomerModel} from "../model/CustomerModel.js";
import {ItemModel} from "../model/ItemModel.js";

generateOrderId();
loadItems();
setDate();
loadCustomers();
$('#discount').val(0);

function generateOrderId() {
    $.ajax({
        url: 'http://localhost:8080/possystem/order',
        type: 'GET',
        dataType: 'text',
        success: function(response) {
            $("#orderid").val(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', textStatus, errorThrown);
            if (jqXHR.status === 404) {
                console.error('Order ID not found.');
            } else {
                console.error('Internal server error.');
            }
        }
    });
}

function setDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    $('#date').val(formattedDate);
}

function loadCustomers() {
    $.ajax({
        url: 'http://localhost:8080/possystem/customer',
        type: 'GET',
        success: function(response) {
            let customersArray = [];

            response.forEach(function(customerData) {
                let customer = new CustomerModel(
                    customerData.id,
                    customerData.name,
                    customerData.address,
                    customerData.phone
                );
                customersArray.push(customer);
            });

            let comboBox = $('#selectcusid');

            comboBox.empty();
            comboBox.append('<option value="">Select Customer ID</option>');

            customersArray.forEach(function(customer) {
                comboBox.append('<option value="' + customer.id + '">' + customer.id + '</option>');
            });

        },
        error: function(xhr, status, error) {
            alert('Failed to retrieve customer data');
        }
    });
}

$("#spanOrder").on('click', () => {
    loadCustomers();
    loadItems();
});

$('#selectcusid').click(function () {
    $('#cusid').val($('#selectcusid').val());
    $.ajax({
        url: 'http://localhost:8080/possystem/customer',
        type: 'GET',
        data: { id: $("#selectcusid").val() },
        dataType: 'json',
        success: function(customer) {
            $('#tp').val(customer.phone);
            $('#address').val(customer.address);
            $('#name').val(customer.name);
        },
        error: function(xhr, status, error) {
            console.log('Error fetching customer:', error);
            //alert('Failed to load customer data.');
        }
    });
});

function loadItems() {
    $('#selectitemcode').empty();

    $.ajax({
        url: 'http://localhost:8080/possystem/item',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            let itemsArray = [];

            response.forEach(function(itemData) {
                let item = new ItemModel(
                    itemData.id,
                    itemData.name,
                    itemData.price,
                    itemData.qty
                );
                itemsArray.push(item);
            });

            let comboBox = $('#selectitemcode');

            comboBox.append('<option value="">Select Item Code</option>');

            itemsArray.forEach(function(item) {
                let option = `<option value="${item.code}">${item.code}</option>`;
                comboBox.append(option);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error loading items:', error);
            alert('Failed to load items.');
        }
    });
}

$('#selectitemcode').click(function () {
    $('#itemcode').val($('#selectitemcode').val());

    $.ajax({
        url: 'http://localhost:8080/possystem/item',
        type: 'GET',
        data: { id: $('#selectitemcode').val() },
        dataType: 'json',
        success: function(item) {
            $('#itemname').val(item.name);
            $('#itemprice').val(item.price);
            $('#qty').val(item.qty);
        },
        error: function(xhr, status, error) {
            console.log('Error fetching item:', error);
            //alert('Failed to load item data.');
        }
    });
});

$('#btn-cart').click(function () {
    var code = $('#itemcode').val();
    var name = $('#itemname').val();
    var price = parseFloat($('#itemprice').val());
    var qty = parseInt($('#orderqty').val());
    var qtyOnHand = parseInt($('#qty').val());
    var total = price * qty;

    if (qty > qtyOnHand) {
        alert('The quantity exceeds the available stock.');
        return;
    }

    let existingItem = cartTMList.find(item => item.code === code);

    if (existingItem) {
        let newTotalQty = existingItem.qty + qty;

        if (newTotalQty > qtyOnHand) {
            alert('The quantity exceeds the available stock.');
            return;
        }

        existingItem.qty = newTotalQty;
        existingItem.total = existingItem.price * existingItem.qty;
    } else {

        let cart = new CartTm(code, name, price, qty, total);
        cartTMList.push(cart);
    }

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
    calDiscount();
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
    calDiscount();
});

function calDiscount() {
    var totalText = $('#cart-total').text();
    var total = parseFloat(totalText.replace(/[^\d.-]/g, ''));

    var dis = parseFloat($('#discount').val());

    var sub = total * (100 - dis) / 100;


    $('#sub-total').text('Sub Total: ' + sub.toFixed(2));

    $('#balance').val($('#cash').val()-sub);
}

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

    let subTotalText = $('#sub-total').text();
    let subTotalValue = parseFloat(subTotalText.replace(/[^\d.-]/g, ''));

    let place = new PlaceOrderModel(
        $('#orderid').val(),
        $('#cusid').val(),
        subTotalValue,
        $('#date').val(),
        cartTMList
    );

    let orderData = JSON.stringify(place);

    $.ajax({
        url: 'http://localhost:8080/possystem/order',
        type: 'POST',
        contentType: 'application/json',
        data: orderData,
        success: function(response) {
            Swal.fire({
                title: "Order Placed Successfully",
                text: "Order ID: " + response.orderId,
                icon: "success"
            });

            cartTMList.length = 0;
            loadTableCart();
            clearFields();
            generateOrderId();
        },
        error: function(xhr, status, error) {
            Swal.fire({
                title: "Order Failed",
                text: "An error occurred while placing the order.",
                icon: "error"
            });
        }
    });
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
    $('#orderid').val('');
}

