require('isomorphic-fetch');
require('es6-promise').polyfill();

const youTubeFetch = async (channel_id, playlist_id, api_key) => {
  const base_url = 'https://www.googleapis.com/youtube/v3';
  const config = {
    method : 'GET',
    mode: 'cors',
  };

  let url;
  if(channel_id && channel_id != '') {
    url = `${base_url}/channels?&part=contentDetails&id=${channel_id}&key=${api_key}`;
  }
  else {
    url = `${base_url}/playlistItems?&part=snippet&playlistId=${playlist_id}&key=${api_key}`;
  }

  const result = await fetch(url, config);
  if(result.status != 200) {
    return Promise.reject(result.error);
  }
  return await result.json();
}

export default youTubeFetch;
