
/**
 * Priority fall through list of url matchers
 * @type {Array}
 */
module.exports = [ 
  require('./ad/bing'),
  require('./ad/google'),
  require('./ad/yahoo'),
  require('./ad/facebook'),
  require('./ad/others'),

	require('./email/gmail'),
	require('./email/hotmail'),
	require('./email/yahoo'),
  require('./email/naver'),
  require('./email/daum'),
  require('./email/others'),

	require('./social/facebook'),
	require('./social/line'),
	require('./social/hangouts'),
	require('./social/linkedin'),
	require('./social/pinterest'),
	require('./social/twitter'),
  require('./social/me2day'),

	require('./search/aol'),
	require('./search/baidu'),
	// google search should be after google+
	require('./search/google'),
	require('./search/yahoo'),
  require('./search/bing'),
	require('./search/yandex'),
  require('./search/naver'),
  require('./search/daum'),
  require('./search/nate'),

	require('./internal/internal'),

	require('./link/link'),

	require('./direct/direct'),

  require('./unknown/unknown')

];
