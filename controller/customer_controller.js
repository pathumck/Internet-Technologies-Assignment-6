import {CustomerModel} from "../model/CustomerModel.js";
import {customers, items} from "../db/db.js";

$(document).ready(function() {
    loadTable();
    validation();
});

$('#customer-save').click(function () {

    var id = $('#customer-id').val();
    var name = $('#customer-name').val();
    var address = $('#customer-address').val();
    var tp = $('#customer-tp').val();

    const customerData = {
        id: id,
        name: name,
        address: address,
        phone: tp
    };

    const customerJSON = JSON.stringify(customerData);
    $.ajax({
        url: "http://localhost:8080/possystem/customer",
        type: "POST",
        data: customerJSON,
        headers: { "Content-Type": "application/json" },
        success: (res) => {
            console.log(JSON.stringify(res));
            alert("Customer details have been successfully saved.");
            loadTable();
            $('#customer-id').val('');
            $('#customer-name').val('');
            $('#customer-address').val('');
            $('#customer-tp').val('');
        },
        error: (res) => {
            console.error(res);
            alert("An error occurred while saving customer details. Please try again.");
        }
    });
});

function loadTable() {
    var tableBody = $('#table-customer').find('tbody');
    tableBody.empty();

    $.ajax({
        url: 'http://localhost:8080/possystem/customer',
        type: 'GET',
        dataType: 'json',
        success: function(customers) {
            customers.forEach(function (customer, index) {
                var row = $('<tr>');

                $('<td>').text(customer.id).appendTo(row);
                $('<td>').text(customer.name).appendTo(row);
                $('<td>').text(customer.address).appendTo(row);
                $('<td>').text(customer.phone).appendTo(row);

                var actionCell = $('<td>').addClass('table-action-col').appendTo(row);

                // Update button
                $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-1')
                    .on('click', function () {
                        $('#update-customer-id').val(customer.id);
                        $('#update-customer-name').val(customer.name);
                        $('#update-customer-address').val(customer.address);
                        $('#update-customer-tp').val(customer.phone);

                        $('#updateCustomerModal').modal('show');

                        $('#update-customer-btn').off('click').on('click', function () {
                            var confirmUpdate = confirm('Are you sure you want to update this customer?');
                            if (confirmUpdate) {
                                var updatedCustomer = {
                                    id: $('#update-customer-id').val(),
                                    name: $('#update-customer-name').val(),
                                    address: $('#update-customer-address').val(),
                                    phone: $('#update-customer-tp').val()
                                };

                                $.ajax({
                                    url: 'http://localhost:8080/possystem/customer?id=' + updatedCustomer.id,
                                    type: 'PATCH',
                                    contentType: 'application/json',
                                    data: JSON.stringify(updatedCustomer),
                                    success: function() {
                                        $('#updateCustomerModal').modal('hide');
                                        loadTable();
                                    },
                                    error: function(xhr, status, error) {
                                        alert('Failed to update customer: ' + error);
                                    }
                                });
                            }
                        });
                    }).appendTo(actionCell);

                // Delete button
                $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
                    .on('click', function () {
                        var confirmDelete = confirm('Are you sure you want to delete this customer?');
                        if (confirmDelete) {
                            $.ajax({
                                url: 'http://localhost:8080/possystem/customer?id=' + customer.id,
                                type: 'DELETE',
                                success: function() {
                                    loadTable();
                                },
                                error: function(xhr, status, error) {
                                    alert('Failed to delete customer: ' + error);
                                }
                            });
                        }
                    }).appendTo(actionCell);

                row.appendTo(tableBody);
            });
        },
        error: function(xhr, status, error) {
            alert('Failed to load customers: ' + error);
        }
    });
}

$('#btn-search-customer').click(function () {
    var searchCode = $('#lbl-search-customer').val().trim();
    searchCustomerByCode(searchCode);
});

function searchCustomerByCode(searchCode) {
    var tableBody = $('#table-customer').find('tbody');

    tableBody.empty();

    $.ajax({
        url: 'http://localhost:8080/possystem/customer',
        type: 'GET',
        data: { id: searchCode },
        dataType: 'json',
        success: function(customer) {

            if (customer) {
                var row = $('<tr>');

                $('<td>').text(customer.id).appendTo(row);
                $('<td>').text(customer.name).appendTo(row);
                $('<td>').text(customer.address).appendTo(row);
                $('<td>').text(customer.phone).appendTo(row);

                var actionCell = $('<td>').addClass('table-action-col').appendTo(row);

                // Update button
                $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-1')
                    .on('click', function () {
                        $('#update-customer-id').val(customer.id);
                        $('#update-customer-name').val(customer.name);
                        $('#update-customer-address').val(customer.address);
                        $('#update-customer-tp').val(customer.phone);

                        $('#updateCustomerModal').modal('show');

                        $('#update-customer-btn').off('click').on('click', function () {
                            var confirmUpdate = confirm('Are you sure you want to update this customer?');
                            if (confirmUpdate) {
                                var updatedCustomer = {
                                    id: $('#update-customer-id').val(),
                                    name: $('#update-customer-name').val(),
                                    address: $('#update-customer-address').val(),
                                    phone: $('#update-customer-tp').val()
                                };

                                $.ajax({
                                    url: 'http://localhost:8080/possystem/customer?id=' + updatedCustomer.id,
                                    type: 'PATCH',
                                    contentType: 'application/json',
                                    data: JSON.stringify(updatedCustomer),
                                    success: function() {
                                        $('#updateCustomerModal').modal('hide');
                                        loadTable();
                                    },
                                    error: function(xhr, status, error) {
                                        alert('Failed to update customer: ' + error);
                                    }
                                });
                            }
                        });
                    }).appendTo(actionCell);

                // Delete button
                $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
                    .on('click', function () {
                        var confirmDelete = confirm('Are you sure you want to delete this customer?');
                        if (confirmDelete) {
                            $.ajax({
                                url: 'http://localhost:8080/possystem/customer?id=' + customer.id,
                                type: 'DELETE',
                                success: function() {
                                    loadTable();
                                },
                                error: function(xhr, status, error) {
                                    alert('Failed to delete customer: ' + error);
                                }
                            });
                        }
                    }).appendTo(actionCell);

                row.appendTo(tableBody);
            } else {
                tableBody.append('<tr><td colspan="5">No customers found.</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            alert('Failed to search customers: ' + error);
        }
    });
}


$('#customer-refresh').click(function () {
    $('#lbl-search-customer').val("");
    loadTable();
});


function validation(){

    $('#customer-id').on('propertychange input', function (e) {
 
        var id = $('#customer-id').val();
 
       if(!id.match("[C]\\d{3,}")){
          $('#customer-id').css("border","2px solid red");
       }else{
          $('#customer-id').css("border","2px solid #92F646");
       }
 
    });

    $('#customer-name').on('propertychange input', function (e) {
 
        var name = $('#customer-name').val();
         
         if(!name.match( "^[A-Z][a-zA-Z]{2,}$")){
            $('#customer-name').css("border","2px solid red");
        }else{
            $('#customer-name').css({"border":"2px solid #92F646"});
        }
    
    });
  
     $('#customer-address').on('propertychange input', function (e) {
  
        var address = $('#customer-address').val();
  
  
        if(!address.match("^[A-Z][a-zA-Z]{2,}$")){
           $('#customer-address').css("border","2px solid red");
        }else{
           $('#customer-address').css("border","2px solid #92F646");
        }
  
     });

     $('#customer-tp').on('propertychange input', function (e) {
 
        var tp = $('#customer-tp').val();
  
        if(!tp.match( "^([+]94{1,3}|[0])([1-9]{2})([0-9]){7}$")){
           $('#customer-tp').css("border","2px solid red");
        }else{
           $('#customer-tp').css("border","2px solid #92F646");
        }
  
     });

}


