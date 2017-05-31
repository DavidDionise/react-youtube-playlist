import React from 'react';
import {videoInit, fetchVideos} from 'utils';
import VideoList from './video-list';

class YouTubeChannel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      video_list : [],
      video_id : ''
    }
  }

  componentDidMount() {
    const {api_key, channel_id} = this.props;
    if(!api_key) {
      throw 'An API key must be provided';
    }
    else {
      videoInit();
      fetchVideos(channel_id, api_key)
      .then(r => {
        let video_id = '';
        if(r.length > 0) {
          video_id = r[0].snippet.resourceId.videoId;
        }
        this.setState({video_list : r, video_id});
      })
      .catch(e => {throw new Error(e.message || e)})
    }
  }

  render() {
    const {
      width,
      height,
      frame_border,
      iframe_style,
      container_class,
      iframe_container_class,
      video_list_container_class,
      show_thumbnails
    } = this.props;

    return (
      <div className={`react-youtube-channel-container ${container_class || ''}`}>
        <div className={`iframe-container ${iframe_container_class || ''}`}>
          <iframe
            id='player'
            width={width || 100}
            height={height || 100}
            frameBorder={frame_border || '0'}
            src={`http://www.youtube.com/embed/${this.state.video_id}?enablejsapi=1`}
            style={iframe_style || {}}
          />
        </div>
        <div
          className={`video-list-container ${video_list_container_class || ''}`}
          style={{height}}
          >
          <VideoList
            video_list={this.state.video_list}
            handleChange={v => this.setState({video_id : v})}
            show_thumbnails={show_thumbnails}
          />
        </div>
      </div>
    )
  }
}

export default YouTubeChannel;
