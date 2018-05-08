var querystring = require("querystring");

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('google') !== -1 &&
      href.href.indexOf("utm_medium=cpc") !== -1) {
         
    var description = {
      type: 'ad',
      network: 'google'
    };
    var query = querystring.parse(referrer.query).q;
    if (query) description.query = query;
         
    return callback(null, description);
  } else {
    return callback(null, false);
  }

};
