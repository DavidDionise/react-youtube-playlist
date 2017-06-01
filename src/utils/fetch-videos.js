import {youTubeFetch} from './';

const fetchVideos = async (channel_id, playlist_id, api_key) => {
  let playlist = playlist_id || '';
  if(playlist_id == '') {
    const channel_data = await youTubeFetch(channel_id, null, api_key);
    const playlist = channel_data.items[0].contentDetails.relatedPlaylists.uploads;
  }
  const video_data = await youTubeFetch(null, playlist_id, api_key);

  return await Promise.resolve(video_data.items);
}

export default fetchVideos;
