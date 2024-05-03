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
});

$('#spanHome').on('click', function() {
    $('#header').show();
    $('#Item-Section').hide();
    $('#Customer-Section').hide();
});

$('#spanItem').on('click', function() {
    $('#Item-Section').show();
    $('#Customer-Section').hide();
});

$('#spanCustomer').on('click', function() {
    $('#Customer-Section').show();
    $('#Item-Section').hide();
});

