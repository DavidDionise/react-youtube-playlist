
const getWidth = (width) => {
  const video_list_node = document.getElementById('video-list-container');
  const video_list_width = video_list_node.clientWidth;

  if(width.endsWith('%')) {
    width = parseInt(width.substr(0, width.length - 1));
    const container_node = document.getElementById('react-youtube-channel-container');
    const parent_node = container_node.parentNode;
    const container_width = parent_node.clientWidth;

    return parseInt((container_width - video_list_width) * (width / 100));
  }
  else {
    return width - video_list_width;
  }
}

export default getWidth;
