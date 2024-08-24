import {ItemModel} from "../model/ItemModel.js";
import {items} from "../db/db.js";

validation();

$('#item-save').click(function () {
    var code = $('#item-code').val();
    var name = $('#item-name').val();
    var price = $('#item-price').val();
    var qty = $('#item-qty').val();

    const itemData = {
        id: code,
        name: name,
        price: price,
        qty: qty
    };

    const itemJSON = JSON.stringify(itemData);
    $.ajax({
        url: "http://localhost:8080/possystem/item",
        type: "POST",
        data: itemJSON,
        headers: { "Content-Type": "application/json" },
        success: (res) => {
            console.log(JSON.stringify(res));
            alert("Item details have been successfully saved.");
            loadTable();
            $('#item-code').val('');
            $('#item-name').val('');
            $('#item-price').val('');
            $('#item-qty').val('');
        },
        error: (res) => {
            console.error(res);
            alert("An error occurred while saving item details. Please try again.");
        }
    });
});

function loadTable() {
    var tableBody = $('#table-item').find('tbody');
    tableBody.empty();

    $.ajax({
        url: 'http://localhost:8080/possystem/item',
        type: 'GET',
        dataType: 'json',
        success: function(items) {
            items.forEach(function (item, index) {
                var row = $('<tr>');

                $('<td>').text(item.id).appendTo(row);
                $('<td>').text(item.name).appendTo(row);
                $('<td>').text(item.price).appendTo(row);
                $('<td>').text(item.qty).appendTo(row);

                var actionCell = $('<td>').addClass('table-action-col').appendTo(row);

                // Update button
                $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-1')
                    .on('click', function () {
                        $('#update-item-code').val(item.id);
                        $('#update-item-name').val(item.name);
                        $('#update-item-price').val(item.price);
                        $('#update-item-qty').val(item.qty);

                        $('#updateItemModal').modal('show');

                        $('#update-item-btn').off('click').on('click', function () {
                            var confirmUpdate = confirm('Are you sure you want to update this item?');
                            if (confirmUpdate) {
                                var updatedItem = {
                                    id: $('#update-item-code').val(),
                                    name: $('#update-item-name').val(),
                                    price: $('#update-item-price').val(),
                                    qty: $('#update-item-qty').val()
                                };

                                $.ajax({
                                    url: 'http://localhost:8080/possystem/item?id=' + updatedItem.id,
                                    type: 'PATCH',
                                    contentType: 'application/json',
                                    data: JSON.stringify(updatedItem),
                                    success: function() {
                                        $('#updateItemModal').modal('hide');
                                        loadTable();
                                    },
                                    error: function(xhr, status, error) {
                                        alert('Failed to update item: ' + error);
                                    }
                                });
                            }
                        });
                    }).appendTo(actionCell);

                // Delete button
                $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
                    .on('click', function () {
                        var confirmDelete = confirm('Are you sure you want to delete this item?');
                        if (confirmDelete) {
                            $.ajax({
                                url: 'http://localhost:8080/possystem/item?id=' + item.id,
                                type: 'DELETE',
                                success: function() {
                                    loadTable();
                                },
                                error: function(xhr, status, error) {
                                    alert('Failed to delete item: ' + error);
                                }
                            });
                        }
                    }).appendTo(actionCell);

                row.appendTo(tableBody);
            });
        },
        error: function(xhr, status, error) {
            alert('Failed to load items: ' + error);
        }
    });
}

$('#btn-search-item').click(function () {
    var searchCode = $('#lbl-search').val().trim();
    searchItemByCode(searchCode);
});

function searchItemByCode(searchCode) {
    var tableBody = $('#table-item').find('tbody');

    tableBody.empty();

    $.ajax({
        url: 'http://localhost:8080/possystem/item',
        type: 'GET',
        data: { id: searchCode },
        dataType: 'json',
        success: function(item) {

            if (item) {
                var row = $('<tr>');

                $('<td>').text(item.id).appendTo(row);
                $('<td>').text(item.name).appendTo(row);
                $('<td>').text(item.price).appendTo(row);
                $('<td>').text(item.qty).appendTo(row);

                var actionCell = $('<td>').addClass('table-action-col').appendTo(row);

                // Update button
                $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-1')
                    .on('click', function () {
                        $('#update-item-code').val(item.id);
                        $('#update-item-name').val(item.name);
                        $('#update-item-price').val(item.price);
                        $('#update-item-qty').val(item.qty);

                        $('#updateItemModal').modal('show');

                        $('#update-item-btn').off('click').on('click', function () {
                            var confirmUpdate = confirm('Are you sure you want to update this item?');
                            if (confirmUpdate) {
                                var updatedItem = {
                                    id: $('#update-item-code').val(),
                                    name: $('#update-item-name').val(),
                                    price: $('#update-item-price').val(),
                                    qty: $('#update-item-qty').val()
                                };

                                $.ajax({
                                    url: 'http://localhost:8080/possystem/item?id=' + updatedItem.id,
                                    type: 'PATCH',
                                    contentType: 'application/json',
                                    data: JSON.stringify(updatedItem),
                                    success: function() {
                                        $('#updateItemModal').modal('hide');
                                        loadTable();
                                    },
                                    error: function(xhr, status, error) {
                                        alert('Failed to update item: ' + error);
                                    }
                                });
                            }
                        });
                    }).appendTo(actionCell);

                // Delete button
                $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
                    .on('click', function () {
                        var confirmDelete = confirm('Are you sure you want to delete this item?');
                        if (confirmDelete) {
                            $.ajax({
                                url: 'http://localhost:8080/possystem/item?id=' + item.id,
                                type: 'DELETE',
                                success: function() {
                                    loadTable();
                                },
                                error: function(xhr, status, error) {
                                    alert('Failed to delete item: ' + error);
                                }
                            });
                        }
                    }).appendTo(actionCell);

                row.appendTo(tableBody);
            } else {
                tableBody.append('<tr><td colspan="5">No items found.</td></tr>');
            }
        },
        error: function(xhr, status, error) {
            alert('Failed to search items: ' + error);
        }
    });
}

$('#item-refresh').click(function () {
   $('#lbl-search').val("");
   loadTable();
});

$("#spanItem").on('click', () => {
    loadTable();
});


function validation(){

    $('#item-code').on('propertychange input', function (e) {

        var code = $('#item-code').val();

        if(!code.match("[I]\\d{3,}")){
            $('#item-code').css("border","2px solid red");
        }else{
            $('#item-code').css("border","2px solid #92F646");
        }

    });

    $('#item-name').on('propertychange input', function (e) {

        var name = $('#item-name').val();

        if(!name.match( "^[A-Z][a-zA-Z]{2,}$")){
            $('#item-name').css("border","2px solid red");
        }else{
            $('#item-name').css({"border":"2px solid #92F646"});
        }

    });

    $('#item-price').on('propertychange input', function (e) {

        var price = $('#item-price').val();


        if(!price.match("^\\d+$")){
            $('#item-price').css("border","2px solid red");
        }else{
            $('#item-price').css("border","2px solid #92F646");
        }

    });

    $('#item-qty').on('propertychange input', function (e) {

        var qty = $('#item-qty').val();

        if(!qty.match( "^\\d+$")){
            $('#item-qty').css("border","2px solid red");
        }else{
            $('#item-qty').css("border","2px solid #92F646");
        }

    });


}