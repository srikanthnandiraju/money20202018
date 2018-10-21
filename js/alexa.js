// ------------- PUBSUB KEY --------------------
var pubnub = PUBNUB.init({
	publish_key: 'pub-c-04318e42-5630-4853-bd7f-eca169eafed8',
	subscribe_key: 'sub-c-8f0cc37c-c03d-11e3-b230-02ee2ddab7fe',
	ssl: true
});

pubnub.subscribe({
	channel: "digitalmall_alexa",
	message: function (m) {
		m = JSON.parse(m);
		console.log("GOT NOTIFICATION - > " + m.screen);
		handleData(m);
	}
});

function handleData(message) {
	$('body').trigger(message.screen);
}