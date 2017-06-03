
const getHeight = (height) => {
  if(height.endsWith('%')) {
    height = parseInt(height.substr(0, height.length - 1));
    const container_node = document.getElementById('react-youtube-channel-container');
    const parent_node = container_node.parentNode;
    const container_height = parent_node.clientHeight;

    return parseInt((container_height) * (height / 100));
  }
  else {
    return height;
  }
}

export default getHeight;
