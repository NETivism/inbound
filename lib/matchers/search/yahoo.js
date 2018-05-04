
var querystring = require('querystring');

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('search.yahoo') === -1) {
    return callback(null, false);
  }
  if (referrer.host && referrer.href &&
      referrer.host.indexOf('search.yahoo') !== -1) {

    var description = { type: 'search', engine: 'yahoo' };
    var query = querystring.parse(referrer.query).q;
    if (query) description.query = query;
    return callback(null, description);
  } else {
    return callback(null, false);
  }
};
