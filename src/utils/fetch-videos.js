import {youTubeFetch} from './';

const fetchVideos = async (channel_id, api_key) => {
  const channel_data = await youTubeFetch(channel_id, null, api_key);
  const {uploads} = channel_data.items[0].contentDetails.relatedPlaylists;
  const video_data = await youTubeFetch(null, uploads, api_key);

  return await Promise.resolve(video_data.items);
}

export default fetchVideos;
