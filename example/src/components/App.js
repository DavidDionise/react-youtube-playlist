import React from 'react';
import YouTubeChannel from '../../../dist/';
import '../../../dist/react-youtube-channel-styles.scss';

import './styles.scss';

const App = () => {
  return (
    <YouTubeChannel
      width={640}
      height={390}
      api_key='AIzaSyAgqLIxOST5fML1Ywg_xW6F5ttvnjSqjqQ'
      channel_id='UCkmcZarfy5i1uqRtWvxdrnQ'
      show_thumbnails
    />
  )
}

export default App;
