
const getHeight = (height) => {
  const video_list_node = document.getElementById('video-list-container');
  const video_list_height = video_list_node.clientHeight;

  if(height.endsWith('%')) {
    height = parseInt(height.substr(0, height.length - 1));
    const container_node = document.getElementById('react-youtube-channel-container');
    const parent_node = container_node.parentNode;
    const container_height = parent_node.clientHeight;

    return parseInt((container_height - video_list_height) * (height / 100));
  }
  else {
    return height - video_list_height;
  }
}

export default getHeight;
