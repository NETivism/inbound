

module.exports = function (href, referrer, callback) {

  if (referrer.host && referrer.host.indexOf('.live.com') !== -1) {
    return callback(null, {
      type: 'email',
      client: 'outlook.com',
      from: referrer.href,
      link: href.href
    });
  } else {
    return callback(null, false);
  }

};
