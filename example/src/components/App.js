import React from 'react';
import YouTubeChannel from '../../../dist/';
import '../../../dist/react-youtube-channel-styles.scss';

import './styles.scss';

const App = () => {
  return (
    <YouTubeChannel
      width={'85%'}
      height={'400'}
      api_key='AIzaSyAgqLIxOST5fML1Ywg_xW6F5ttvnjSqjqQ'
      playlist_id='PL4lEESSgxM_5O81EvKCmBIm_JT5Q7JeaI'
      show_thumbnails
    />
  )
}

export default App;
