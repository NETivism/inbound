
module.exports = function (href, referrer, callback) {

  if (href.href && href.href.indexOf("utm_medium=email") !== -1) {
    return callback(null, {
      type: 'email',
      client: 'unknown',
      from: referrer.href,
      link: href.href
    });
  } else {
    return callback(null, false);
  }

};
