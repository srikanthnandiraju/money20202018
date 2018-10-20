var RemoteStore = {
    url: undefined,
    create: function (jsonObject, callback) {
        var data = JSON.stringify(jsonObject);
        parent = this;
        $.ajax({
            url: "https://api.myjson.com/bins",
            type: "POST",
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!parent.url) {
                    parent.url = data.uri;
                }

                var json = JSON.stringify(data);
                console.log(json);
                if (callback) {
                    callback(data);
                }
            }
        });
    },
    update: function (data, callback) {
        var updatedData = JSON.stringify(data);
        parent = this;
        $.ajax({
            url: parent.url,
            type: "PUT",
            data: updatedData,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (callback) {
                    callback(data);
                }
            }
        });
    },
    get: function (callback) {
        var fetchURL = this.url;
        $.get(fetchURL, function (data, textStatus, jqXHR) {
            if (callback) {
                callback(data);
            }
        });
    },
    setRoot: function (root) {
        this.url = root;
    }
};
RemoteStore.setRoot("https://api.myjson.com/bins/8cvgj");