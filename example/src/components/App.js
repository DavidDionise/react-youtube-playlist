import React from 'react';
import YouTubeChannel from '../../../dist/';
import '../../../dist/styles.scss';

import './styles.scss';

const App = () => {
  return (
    <YouTubeChannel
      width={'85%'}
      height={'400'}
      api_key='AIzaSyAgqLIxOST5fML1Ywg_xW6F5ttvnjSqjqQ'
      playlist_id='PL64BwQcJEEVImdziHEAlXzb5Zhzs1KNKT'
      show_thumbnails
    />
  )
}

export default App;
