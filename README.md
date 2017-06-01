Usage is as follows:

```javascript
import YouTubeChannel from 'react-youtube-channel';

const App = () => {
  return (
    <YouTubeChannel
      width={640}
      height={390}
      api_key='YourGoogleApiKey'
      channel_id='YourYoutubeChannelID'
      show_thumbnails
    />
  )
}

```

### Available Props

```javascript
<YouTubeChannel
  api_key=""
  channel_id=""
  width={300}
  height={400}
  frame_border={0}
  iframe_style={''}
  show_thumbnails={true}
  iframe_container_class={''}
  video_list_container_class={''}
/>
```
