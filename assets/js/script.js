function replaceStyleSheet(stylesheetURL) {

    $('#page-style-sheet').remove();
    $('head').append('<link id="#page-style-sheet" rel="stylesheet" type="text/css" href="' + stylesheetURL + '">');

}

$("#btnLogin").eq(0).on('click', () => {
    replaceStyleSheet('/assets/styles/home.css');
    $('#header').css({display: 'block'});
    $('#login').css({display: 'none'});
    $('#Item-Section').hide();
    $('#Customer-Section').hide();
    $('#Order-Section').hide();
});

$('#spanHome').on('click', function() {
    $('#header').show();
    $('#Home-Section').show();
    $('#Item-Section').hide();
    $('#Customer-Section').hide();
    $('#Order-Section').hide();
    $('#Order-Details-Section').hide();
});

$('#spanItem').on('click', function() {
    $('#Item-Section').show();
    $('#Home-Section').hide();
    $('#Customer-Section').hide();
    $('#Order-Section').hide();
    $('#Order-Details-Section').hide();
});

$('#spanCustomer').on('click', function() {
    $('#Customer-Section').show();
    $('#Item-Section').hide();
    $('#Home-Section').hide();
    $('#Order-Section').hide();
    $('#Order-Details-Section').hide();
});

$('#spanOrder').on('click', function() {
    $('#Order-Section').show();
    $('#Customer-Section').hide();
    $('#Item-Section').hide();
    $('#Home-Section').hide();
    $('#Order-Details-Section').hide();
});

$('#spanOrderDetail').on('click', function() {
    $('#Order-Details-Section').show();
    $('#Order-Section').hide();
    $('#Customer-Section').hide();
    $('#Item-Section').hide();
    $('#Home-Section').hide();
});
