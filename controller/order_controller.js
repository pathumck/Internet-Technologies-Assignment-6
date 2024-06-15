let orderCounter = 1;

loadOrderId();
setDate();
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

