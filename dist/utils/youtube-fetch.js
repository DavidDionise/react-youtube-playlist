function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('isomorphic-fetch');
require('es6-promise').polyfill();

const youTubeFetch = (() => {
  var _ref = _asyncToGenerator(function* (channel_id, playlist_id, api_key) {
    const base_url = 'https://www.googleapis.com/youtube/v3';
    const config = {
      method: 'GET',
      mode: 'cors'
    };

    let url;
    if (channel_id && channel_id != '') {
      url = `${base_url}/channels?&part=contentDetails&id=${channel_id}&key=${api_key}`;
    } else {
      url = `${base_url}/playlistItems?&part=snippet&playlistId=${playlist_id}&key=${api_key}`;
    }

    const result = yield fetch(url, config);
    if (result.status != 200) {
      return Promise.reject(result.error);
    }
    return yield result.json();
  });

  return function youTubeFetch(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

export default youTubeFetch;