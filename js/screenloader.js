$('body').bind('show-basket', function(e, data) {
    showCheckout();
});

$('body').bind('checkout-basket', function(e, data) {
    showCheckout();
    setTimeout(function () {
        $('body').trigger("sms-checkout");
    }, 1000);
});

$('body').bind('home-screen', function(e, data) {
    showHome();
});

$('body').bind('new-products', function(e, data) {
    window.location.href = "#/new-arrivals";
});

$('body').bind('bestselling-products', function(e, data) {
    window.location.href = "#/best-sellers";
});

$('body').bind('featured-products', function(e, data) {
    App.Products.currentIndex = 1;
    showProductDetails();
});




