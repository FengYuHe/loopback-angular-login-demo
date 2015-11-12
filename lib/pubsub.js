var PUBNUB = require("pubnub");

var pubnub = PUBNUB(require('../config'))

function Pubsub(){
	
}

Pubsub.prototype.publish = function(channel, msg, cb) {
	pubnub.publish({
	    channel  : channel,
	    message  : msg,
	    callback : function(e){
	    	cb(e);
	    },
	    error : cb
	});
};

Pubsub.prototype.subscribe = function(channel, cb) {
    pubnub.subscribe({
      channel: channel,
      message: function (m) {
        cb(null, m);
      },
      error: cb
    });
}

module.exports = Pubsub;