import {customers} from "../db/db.js";

let orderCounter = 1;

loadOrderId();
setDate();
loadCustomers();
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

