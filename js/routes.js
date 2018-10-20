
Path.map("#/home").to(function() {
    $("#stage").load("screens/home.html");
});
Path.map("#/refugee-camps-home").to(function() {
    $("#stage").load("screens/refugee-camps-home.html");
});

Path.map("#/product-details").to(function() {
    $("#stage").load("screens/product-details.html");
});

Path.map("#/product-video").to(function() {
    $("#stage").load("screens/product-video.html");
});

Path.map("#/product-photos").to(function() {
    $("#stage").load("screens/product-photos.html");
});

Path.map("#/checkout").to(function() {
    $("#stage").load("screens/checkout.html");
});

Path.map("#/settings").to(function() {
    $("#stage").load("screens/settings.html");
});

Path.map("#/new-order").to(function() {
    $("#stage").load("screens/new-order.html");
    $("#title_text").html("NEW ORDER");
});

Path.map("#/new-arrivals").to(function() {
    $("#stage").load("screens/mock-newarrivals.html");
});

Path.map("#/best-sellers").to(function() {
    $("#stage").load("screens/best-sellers.html");
});

Path.root("#/home");
Path.listen();