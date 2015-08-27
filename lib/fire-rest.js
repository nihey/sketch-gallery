var FIREBASE_URL = 'https://sketch-gallery-test.firebaseio.com';

var Stream = require('stream').Transform;

module.exports = function(method, path, data, auth, callback) {
  var http = require(FIREBASE_URL.split('://')[0]);
  var options = {
    host: FIREBASE_URL.split('://')[1],
    method: method,
    path: path + '.json' + (auth ? '?auth=' + auth : ''),
  }

  var request = http.request(options, function(response) {
    var data = new Stream();
    response.on('data', function(chunk) {
      data.push(chunk);
    });
    response.on('end', function() {
      callback && callback(data.read().toString());
    });
  });

  if (data) {
    request.write(data);
  }
  request.end();
};
