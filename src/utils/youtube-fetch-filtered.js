require('isomorphic-fetch');
require('es6-promise').polyfill();

const youTubeFetchFiltered = async (playlist_id, api_key, filter) => {
  const base_url = 'https://www.googleapis.com/youtube/v3';
  const config = {
    method : 'GET',
    mode: 'cors',
  };

  let url, page_token;
  let finished = false;
  let filtered_videos = [];

  while(!finished && filtered_videos.length < 1000) {
    if(page_token) {
      url = `${base_url}/playlistItems?&part=snippet&playlistId=${playlist_id}&pageToken=${page_token}&maxResults=50&key=${api_key}`;
    }
    else {
      url = `${base_url}/playlistItems?&part=snippet&playlistId=${playlist_id}&maxResults=50&key=${api_key}`;
    }
    const result = await fetch(url, config);
    if(result.status != 200) {
      return Promise.reject(result.error);
    }
    const result_json = await result.json();
    page_token = result_json.nextPageToken;
    if(page_token) {
      finished = true;
    }
    const regex = new RegExp(`${filter}`, 'i');
    filtered_videos = [...filtered_videos, ...result_json.items.filter(v => regex.test(v.snippet.title))];
  }

  return Promise.resolve(filtered_videos);
}

export default youTubeFetchFiltered;
