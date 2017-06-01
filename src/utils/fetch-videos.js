import {youTubeFetch} from './';

const fetchVideos = async (channel_id, playlist_id, api_key) => {
  try {
    let playlist = playlist_id || '';
    if(!playlist_id) {
      const channel_data = await youTubeFetch(channel_id, null, api_key);
      playlist = channel_data.items[0].contentDetails.relatedPlaylists.uploads;
    }
    const video_data = await youTubeFetch(null, playlist, api_key);

    return await Promise.resolve(video_data.items);
  }
  catch(ex) {
    return Promise.reject(ex || 'Error fetching videos');
  }
}

export default fetchVideos;
