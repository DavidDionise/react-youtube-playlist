Usage is as follows:

```javascript
import YouTubeChannel from 'react-youtube-channel';
import 'reacty-youtube-playlist/dist/styles'

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
|api_key    | String : Your [Google API key](https://developers.google.com/maps/documentation/javascript/get-api-key)|
|playlist_id| String : Your YouTube playlist ID |
|width | String \| Number : Can be a percent or number (pixels) |
|height |  String \| Number : Can be a percent or number (pixels) |
|show_thumbnails | Bool : Set to false if you don't want the thumbnail images |
|container_class | String : A class name for the containing DOM node|
|iframe_container_class| String : A class name for the iframe container DOM node
|frame_border| Number : iframe border size|
|scrolling | Bool : Enable/Disable iframe scrolling|



```javascript
<YouTubePlaylist
  api_key={String}
  width={300}
  height={400}
  iframe_style={''}
  show_thumbnails={true}
  iframe_container_class={''}
  video_list_container_class={''}
/>
```

### Note : You must include bootstrap css in your project for some of the UI in this component to work.
