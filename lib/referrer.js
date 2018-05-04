

var url           = require('url'),
    querystring   = require('querystring'),
    matchers      = require('./matchers');

var objectLength = function(object) {
  var length = 0;
  for( var key in object ) {
    if( object.hasOwnProperty(key) ) {
      ++length;
    }
  }
  return length;
}; 

/**
 * Parses a location href and document referrer
 * into semantic information about how that visitor
 * got to the page.
 * @param  {string}   href     Location href, equivalent to window.location.href
 * @param  {string}   referrer Referrer url, equivalent to document.referrer
 * @param  {Function} callback callback(err, in);
  * where "in" is a object containing referrer and campaign information
  * about this inbound visitor.
 */
var parse = exports.parse = function parse(href, referrer, callback) {

  var parsedHref     = url.parse(href || '');
  var parsedReferrer = url.parse(referrer || '');

  var ref, campaign;
  parseReferrer(parsedHref, parsedReferrer, function(err, ref){
    parseCampaign(parsedHref, parsedReferrer, function(err, campaign){
      var description = {};
      if (ref)      description.referrer      = ref;
      if (campaign) description.campaign = campaign;
      return callback(err, description);
    });
  });
};

var parseReferrer = function parseReferrer(href, referrer, callback) {

  var numOfMatchers  = objectLength(matchers);

  var processMatcher = function (matcherIndex, done) {
    if (matcherIndex >= numOfMatchers) return done(null, null);
    else {
      var matcher = matchers[matcherIndex];
      process.nextTick(function () {
        matcher(href, referrer, function (err, description) {
          if (err) return done(err);
          else if (description) return done(null, description);
          else return processMatcher(matcherIndex + 1, done);
        });
      });
    }
  };

  if (numOfMatchers > 0) return processMatcher(0, callback);
  else callback(null, null);
};

var campaignKeyMap = {

  'utm_campaign' : 'campaign',
  'utm_source'   : 'source',
  'utm_term'     : 'term',
  'utm_medium'   : 'medium',
  'utm_count'    : 'content'

};

var parseCampaign = function parseCampaign (href, referrer, callback) {
  var query = querystring.parse(href.query);
  var campaign = {};
  for (var ourKey in campaignKeyMap){
    var queryKey = campaignKeyMap[ourKey];
    if (queryKey in query) campaign[ourKey] = query[queryKey];
  }
  return callback(null, objectLength(campaign) > 0 ? campaign: null);
};
