module.exports = function (href, referrer, callback) {

  var description = false;

  if (referrer.host && referrer.host.indexOf('pinterest.com') !== -1) {
    description = {
      type: 'social',
      network: 'pinterest'
    };

    if (referrer.path) {
      var tokens = referrer.path.split('/');
      for (var idx in tokens) {
        if (tokens[idx].indexOf('pin') !== -1) {
          description.pin = tokens[index + 1];
          break;
        }
      }
    }
  }

  return callback(null, description);
};
