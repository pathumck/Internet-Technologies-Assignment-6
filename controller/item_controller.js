import {ItemModel} from "../model/ItemModel.js";
import {items} from "../db/db.js";

validation();

$('#item-save').click(function () {
    var code = $('#item-code').val();
    var name = $('#item-name').val();
    var price = $('#item-price').val();
    var qty = $('#item-qty').val();

    let itemm = new ItemModel(code, name, price, qty);
    items.push(itemm);

    //clear model fields
    $('#item-code').val('');
    $('#item-name').val('');
    $('#item-price').val('');
    $('#item-qty').val('');

    loadTable();
});

function loadTable() {
    var tableBody = $('#table-item').find('tbody');

    tableBody.empty();

    items.forEach(function (item, index) {
        var row = $('<tr>');

        $('<td>').text(item.code).appendTo(row);
        $('<td>').text(item.name).appendTo(row);
        $('<td>').text(item.price).appendTo(row);
        $('<td>').text(item.qty).appendTo(row);

        var actionCell = $('<td>').addClass('table-action-col').appendTo(row);

        // Update button
        $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-1')
            .on('click', function () {

                $('#update-item-code').val(item.code);
                $('#update-item-name').val(item.name);
                $('#update-item-price').val(item.price);
                $('#update-item-qty').val(item.qty);

                $('#updateItemModal').modal('show');


                $('#update-item-btn').off('click').on('click', function () {

                    var confirmUpdate = confirm('Are you sure you want to update this item?');
                    if (confirmUpdate) {
                        item.name = $('#update-item-name').val();
                        item.price = $('#update-item-price').val();
                        item.qty = $('#update-item-qty').val();

                        $('#updateItemModal').modal('hide');
                        loadTable();
                    }
                });
            }).appendTo(actionCell);

        // Delete button
        $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
            .on('click', function () {
                var confirmDelete = confirm('Are you sure you want to delete this item?');
                if (confirmDelete) {
                    items.splice(index, 1);
                    loadTable();
                }
            }).appendTo(actionCell);

        row.appendTo(tableBody);
    });
}

$('#btn-search-item').click(function () {
    var searchCode = $('#lbl-search').val().trim();
    searchItemByCode(searchCode);
});

function searchItemByCode(searchCode) {
    var tableBody = $('#table-item').find('tbody');

    tableBody.empty();

    var filteredItems = items.filter(function (item) {
        return item.code.toLowerCase().includes(searchCode.toLowerCase());
    });

    filteredItems.forEach(function (item, index) {
        var row = $('<tr>');

        $('<td>').text(item.code).appendTo(row);
        $('<td>').text(item.name).appendTo(row);
        $('<td>').text(item.price).appendTo(row);
        $('<td>').text(item.qty).appendTo(row);

        var actionCell = $('<td>').addClass('table-action-col').appendTo(row);

        // Update button
        $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-1')
            .on('click', function () {

                $('#update-item-code').val(item.code);
                $('#update-item-name').val(item.name);
                $('#update-item-price').val(item.price);
                $('#update-item-qty').val(item.qty);

                $('#updateItemModal').modal('show');

                $('#update-item-btn').off('click').on('click', function () {
                    var confirmUpdate = confirm('Are you sure you want to update this item?');
                    if (confirmUpdate) {
                        item.name = $('#update-item-name').val();
                        item.price = $('#update-item-price').val();
                        item.qty = $('#update-item-qty').val();

                        $('#updateItemModal').modal('hide');
                        loadTable();
                    }
                });
            }).appendTo(actionCell);

        // Delete button
        $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
            .on('click', function () {
                var confirmDelete = confirm('Are you sure you want to delete this item?');
                if (confirmDelete) {
                    items.splice(index, 1);
                    loadTable();
                }
            }).appendTo(actionCell);

        row.appendTo(tableBody);
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