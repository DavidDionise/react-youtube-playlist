require('isomorphic-fetch');
require('es6-promise').polyfill();

const youTubeFetch = async (playlist_id, api_key, page_token) => {
  console.log('page token = ', page_token)
  try {
    const base_url = 'https://www.googleapis.com/youtube/v3';
    const config = {
      method : 'GET',
      mode: 'cors',
    };

    let url;
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
    return await result.json();
  }
  catch(e) {
    throw new Error(e)
  }
}

export default youTubeFetch;
