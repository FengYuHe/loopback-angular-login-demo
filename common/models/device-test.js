var PUBSUB = require('../../lib/pubsub');
var pubsub = new PUBSUB();

module.exports = function(DeviceTest) {

DeviceTest.test = function(data,cb){
	pubsub.publish('pullDevice', data, function(e){
		console.log(e);
    cb({"type":"OK"});
	})
}

 DeviceTest.remoteMethod('test', {
    description: '测试发送数据',
    accepts: [
      {arg: 'test', type: 'object',  http: {source: 'body'}}
    ],
    returns: {root: true, type: 'object'},
    http: {path: '/test', verb: 'POST'}
  });
};
