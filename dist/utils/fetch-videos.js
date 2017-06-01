function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { youTubeFetch } from './';

const fetchVideos = (() => {
  var _ref = _asyncToGenerator(function* (channel_id, playlist_id, api_key) {
    let playlist = playlist_id || '';
    if (playlist_id == '') {
      const channel_data = yield youTubeFetch(channel_id, null, api_key);
      const playlist = channel_data.items[0].contentDetails.relatedPlaylists.uploads;
    }
    const video_data = yield youTubeFetch(null, playlist_id, api_key);

    return yield Promise.resolve(video_data.items);
  });

  return function fetchVideos(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

export default fetchVideos;