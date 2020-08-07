
module.exports = function (href, referrer, callback) {
  if (href.href && (href.href.indexOf("utm_medium=email") !== -1 || href.href.indexOf("civimail_x_q=") !== -1)) {
    var client = 'unknown';
    if (href.href.indexOf('civimail_x_q') !== -1) {
      client = 'civimail';
    }
    if (href.href.indexOf("utm_medium=email") !== -1) {
      client = 'utm_medium';
    }
    return callback(null, {
      type: 'email',
      client: client,
      from: referrer.href,
      link: href.href
    });
  } else {
    return callback(null, false);
  }
};
