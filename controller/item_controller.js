import {ItemModel} from "../model/ItemModel.js";
import {items} from "../db/db.js";


$('#item-save').click(function () {
    var code = $('#item-code').val();
    var name = $('#item-name').val();
    var price = $('#item-price').val();
    var qty = $('#item-qty').val();

    let itemm = new ItemModel(code, name, price, qty);
    items.push(itemm);

    $('#item-code').val('');
    $('#item-name').val('');
    $('#item-price').val('');
    $('#item-qty').val('');

    loadTable();
});

function loadTable() {
    var tableBody = $('#table-item').find('tbody'); // Find the tbody element inside #table-item

    // Clear existing rows
    tableBody.empty();

    items.forEach(function (item, index) {
        var row = $('<tr>');

        $('<td>').text(item.code).appendTo(row);
        $('<td>').text(item.name).appendTo(row);
        $('<td>').text(item.price).appendTo(row);
        $('<td>').text(item.qty).appendTo(row);

        var actionCell = $('<td>').addClass('table-action-col').appendTo(row);
        $('<button>').text('Update').addClass('btn btn-primary btn-sm mr-1')
            .on('click', function () {

            }).appendTo(actionCell);

        $('<button>').text('Delete').addClass('btn btn-danger btn-sm')
            .on('click', function () {

                items.splice(index, 1);
                loadTable();
            }).appendTo(actionCell);

        row.appendTo(tableBody);
    });
}


