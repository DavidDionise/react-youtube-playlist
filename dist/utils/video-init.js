
const videoInit = () => {
  const tag = document.createElement('script');
  tag.id = 'youtube-viewer';
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let player;
  const onYouTubeIframeAPIReady = () => {
    player = new YT.Player('player');
  };
};

export default videoInit;