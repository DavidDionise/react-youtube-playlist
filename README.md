Usage is as follows:

```javascript
import YouTubeChannel from 'react-youtube-channel';
import from 'reacty-youtube-playlist/dist/react-youtube-channel-styles'

const App = () => {
  return (
    <YouTubePlaylist
      width={'85%'}
      height={390}
      api_key='YourGoogleApiKey'
      playlist_id='YourYoutubePlaylistID'
      show_thumbnails
    />
  )
}

```

### Available Props

|           |                                   |
|-----------|-----------------------------------|
|api_key    | String : Your [Google API key]    |


```javascript
<YouTubePlaylist
  api_key={String}
  width={300}
  height={400}
  frame_border={0}
  iframe_style={''}
  show_thumbnails={true}
  iframe_container_class={''}
  video_list_container_class={''}
/>
```

### Note : You must include bootstrap css in your project for some of the UI for this component to work.
