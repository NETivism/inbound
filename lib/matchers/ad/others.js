var querystring = require("querystring");

module.exports = function (href, referrer, callback) {

  if (referrer.host && href.href.indexOf("utm_medium=cpc") !== -1) {
         
    var description = {
      type: 'ad',
      network: 'unknown'
    };
    var query = querystring.parse(referrer.query).q;
    if (query) description.query = query;
         
    return callback(null, description);
  } else {
    return callback(null, false);
  }

};
