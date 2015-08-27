var meow = require('meow'),
    btoa = require('btoa'),
    atob = require('atob'),
    fs = require('fs'),
    fireRest = require('../lib/fire-rest');

var encode = function(string) {
  return btoa(encodeURIComponent(string));
}

var decode = function(string) {
  return decodeURIComponent(atob(string));
};

var cli = meow({
  pkg: require('../package.json'),
  help: [
    'Usage',
    '  curate <kept sketches>',
    '',
    'Options:',
    '  -k, --key <firebase key>    set authentication key',
    '',
  ]
});

if (cli.flags.h || cli.flags.help) {
  cli.showHelp();
}

// First backup the whole data
fireRest('GET', '/sketches', null, null, function(sketches) {
  fs.writeFileSync('backup.json', sketches);
  // Save backup data locally
  sketches = JSON.parse(sketches);

  if (!cli.input.length) {
    return;
  }

  // Get the sketches that will be kept
  var kept = {};
  cli.input.forEach(function(key) {
    key = encode(key)
    if (sketches[key]) {
      kept[key] = sketches[key];
    }
  });

  // Write them into the database
  var key = cli.flags.k || cli.flags.key;
  fireRest('PUT', '/sketches', JSON.stringify(kept), key);
});
