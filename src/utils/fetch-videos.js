import {youTubeFetch} from './';

const fetchVideos = async (playlist_id, api_key) => {
  try {
    let playlist = playlist_id || '';
    const video_data = await youTubeFetch(playlist_id, api_key);

    return await Promise.resolve(video_data.items);
  }
  catch(ex) {
    return Promise.reject(ex || 'Error fetching videos');
  }
}

export default fetchVideos;
