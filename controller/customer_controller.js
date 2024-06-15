import {CustomerModel} from "../model/CustomerModel.js";
import {customers, items} from "../db/db.js";

$('#customer-save').click(function () {
    var id = $('#customer-id').val();
    var name = $('#customer-name').val();
    var address = $('#customer-address').val();
    var tp = $('#customer-tp').val();

    let customerr = new CustomerModel(id,name,address,tp);
    customers.push(customerr);

    //clear model fields
    $('#customer-id').val('');
    $('#customer-name').val('');
    $('#customer-address').val('');
    $('#customer-tp').val('');

    loadTable();
});

function loadTable() {
    var tableBody = $('#table-customer').find('tbody');

    tableBody.empty();

    customers.forEach(function (customer, index) {
        var row = $('<tr>');

        $('<td>').text(customer.id).appendTo(row);
        $('<td>').text(customer.name).appendTo(row);
        $('<td>').text(customer.address).appendTo(row);
        $('<td>').text(customer.tp).appendTo(row);

        var actionCell = $('<td>').addClass('table-action-col').appendTo(row);

        // Update button
        $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-1')
            .on('click', function () {

                $('#update-customer-id').val(customer.id);
                $('#update-customer-name').val(customer.name);
                $('#update-customer-address').val(customer.address);
                $('#update-customer-tp').val(customer.tp);

                $('#updateCustomerModal').modal('show');


                $('#update-customer-btn').off('click').on('click', function () {

                    var confirmUpdate = confirm('Are you sure you want to update this customer?');
                    if (confirmUpdate) {
                        customer.name = $('#update-customer-name').val();
                        customer.address = $('#update-customer-address').val();
                        customer.tp = $('#update-customer-tp').val();

                        $('#updateCustomerModal').modal('hide');
                        loadTable();
                    }
                });
            }).appendTo(actionCell);

        // Delete button
        $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
            .on('click', function () {
                var confirmDelete = confirm('Are you sure you want to delete this customer?');
                if (confirmDelete) {
                    customers.splice(index, 1);
                    loadTable();
                }
            }).appendTo(actionCell);

        row.appendTo(tableBody);
    });
}

$('#btn-search-customer').click(function () {
    var searchCode = $('#lbl-search-customer').val().trim();
    searchCustomerByCode(searchCode);
});

function searchCustomerByCode(searchCode) {
    var tableBody = $('#table-customer').find('tbody');

    tableBody.empty();

    var filteredItems = customers.filter(function (customer) {
        return customer.id.toLowerCase().includes(searchCode.toLowerCase());
    });

    filteredItems.forEach(function (customer, index) {
        var row = $('<tr>');

        $('<td>').text(customer.id).appendTo(row);
        $('<td>').text(customer.name).appendTo(row);
        $('<td>').text(customer.address).appendTo(row);
        $('<td>').text(customer.tp).appendTo(row);

        var actionCell = $('<td>').addClass('table-action-col').appendTo(row);

        // Update button
        $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-1')
            .on('click', function () {

                $('#update-customer-id').val(customer.id);
                $('#update-customer-name').val(customer.name);
                $('#update-customer-address').val(customer.price);
                $('#update-customer-tp').val(customer.tp);

                $('#updateCustomerModal').modal('show');

                $('#update-customer-btn').off('click').on('click', function () {
                    var confirmUpdate = confirm('Are you sure you want to update this customer?');
                    if (confirmUpdate) {
                        item.name = $('#update-customer-name').val();
                        item.address = $('#update-item-address').val();
                        item.tp = $('#update-item-tp').val();

                        $('#updateCustomerModal').modal('hide');
                        loadTable();
                    }
                });
            }).appendTo(actionCell);

        // Delete button
        $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
            .on('click', function () {
                var confirmDelete = confirm('Are you sure you want to delete this customer?');
                if (confirmDelete) {
                    customers.splice(index, 1);
                    loadTable();
                }
            }).appendTo(actionCell);

        row.appendTo(tableBody);
    });
}

