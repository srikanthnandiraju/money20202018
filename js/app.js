function showFullScreen() {
    $('#fullscreenElement').addClass('open');
}

$('.close').on('click', function (event) {
    $('#fullscreenElement').removeClass('open');
});

$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () {
    NProgress.done();
});

// ------------------------------ SCREENS ------------------------------

function showHome() {
    window.location.href = "#/home";
}

function showRefugeeCamps() {
    window.location.href = "#/refugee-camps-home";
}

function filterProducts(searchString) {
    App.Products.searchProducts(searchString);
    showProductDetails();
}

function showProductDetails() {
    window.location.href = "#/product-details";
}

function showProductVideo() {
    window.location.href = "#/product-video";
}

function showProductPhotos() {
    window.location.href = "#/product-photos";
}

function showCheckout() {
    window.location.href = "#/checkout";
}

function showSettings() {
    window.location.href = "#/settings";
}
// ------------------------------ GLOBALS ------------------------------
var App = {};
App.Utils = {
    generateId: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

// Global Event handler
App.Events = {
    emit: function(event_name, event_payload) {
        $('body').trigger(event_name, event_payload);
    },
    listen: function(event_name, callback) {
        $('body').unbind(event_name).bind(event_name, function(e, data) {
            callback(data);
        });
    }
};

App.User = {
    email: localStorage.getItem("email"),
    mobile: localStorage.getItem("mobile"),
    guid: localStorage.getItem("guid"),
    update: function (email, mobile) {
        this.email = email;
        this.mobile = mobile;
        localStorage.setItem("email", email);
        localStorage.setItem("mobile", mobile);
    }
}

// Find if user id is generated
if (localStorage.getItem("guid") == undefined) {
    var guid = App.Utils.generateId();
    localStorage.setItem("guid", guid);
}
App.User.guid = localStorage.getItem("guid");

App.Products = {
    allProducts: [],
    selectedProducts: [],
    currentIndex: -1,
    allCategories: [],
    getNextProduct: function () {
        this.currentIndex = this.currentIndex + 1;
        if (this.currentIndex >= this.allProducts.length) {
            this.currentIndex = 0;
        }
        //return this.allProducts[this.currentIndex];
    },
    getPrevProduct: function () {
        // if (this.currentIndex > 0)
        //     this.currentIndex = this.currentIndex - 1;
        this.currentIndex = this.currentIndex - 1;
        if (this.currentIndex < 0) {
            this.currentIndex = this.allProducts.length - 1;
        }
        //return this.allProducts[this.currentIndex];
    },
    getCurrentProduct: function () {
        if (this.currentIndex < 0) {
            this.currentIndex = 0;
        }
        //console.log(this.currentIndex);
        return this.allProducts[this.currentIndex];
    },
    searchProducts: function (searchFilter) {
        var filterProducts = _.filter(this.allProducts, function (o) {
            //console.log(o.shops)
            return o.shops == searchFilter;
        });
        //console.log("Filter text" + filterProducts);
        // To make current logic run
        this.allProducts = filterProducts;
        this.selectedProducts = filterProducts;
        return filterProducts;
    },
    getShops: function () {
        var allShops = _.uniq(_.map(this.allProducts, 'shops'));
        return allShops;
    },
    getCategories: function () {
        var allCats = _.uniq(_.map(this.allProducts, 'main_category'));
        return allCats;

        // if (!this.allCategories || this.allCategories.length < 1) {
        //     var allCats = _.uniq(_.map(this.allProducts, 'main_category'));
        //     this.allCategories = allCats;
        // }
        // return this.allCategories;
    },
    restoreFromCache: function () {
        var products = localStorage.getItem("VDM_TV_PRODUCTS");
        if (products) {
            this.allProducts = JSON.parse(products);
        }
        return this.allProducts;
    }
};

App.Vendors = {
    allVendors: [],
    findVendor: function (mobile) {
        var foundVendor = _.find(this.allVendors, {
            mobile: mobile
        });
        return foundVendor;
    }
};

App.Basket = {
    selectedItems: [],
    add: function (newItem) {
        this.selectedItems = _.reject(this.selectedItems, function (o) {
            return o.id == newItem.id;
        });
        this.selectedItems.push(newItem);
    },
    remove: function (deleteItem) {
        this.selectedItems = _.reject(this.selectedItems, function (o) {
            return o.id == deleteItem.id;
        });
    },
    removeById: function (id) {
        this.selectedItems = _.reject(this.selectedItems, function (o) {
            return o.id == id;
        });
    },
    getTotal: function () {
        return _.sumBy(this.selectedItems, "total");
    }
};

App.Events.listen("event-add-to-basket", function (data) {
    App.Basket.add(data);
    //console.log("Adding to basket event fired");
});