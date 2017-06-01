import React from 'react';
import PropTypes from 'prop-types';
import { videoInit, fetchVideos } from 'utils';
import VideoList from './video-list';

class YouTubeChannel extends React.Component {
  static propTypes = {
    api_key: PropTypes.string.isRequired,
    channel_id: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    frame_border: PropTypes.oneOfType([
      PropTypes.string, PropTypes.number
    ]),
    iframe_style: PropTypes.object,
    show_thumbnails: PropTypes.bool,
    iframe_container_class: PropTypes.string,
    video_list_container_class: PropTypes.string
  }
  constructor(props) {
    super(props);

    this.state = {
      video_list : [],
      video_id : ''
    }
  }

  componentDidMount() {
    const {api_key, playlist_id, channel_id} = this.props;
    if(!api_key) {
      throw new Error('An API key must be provided');
    }
    if(!channel_id && !playlist_id) {
      throw 'A channel ID or playlist ID must be provided';
    }
    else {
      fetchVideos(channel_id, playlist_id, api_key)
      .then(list => {
        let video_id = '';
        if(list.length > 0) {
          video_id = list[0].snippet.resourceId.videoId;
        }
        this.setState({video_list : list, video_id});
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
      show_thumbnails,
    } = this.props;

    return (
      <div style={this.props.style} className={`react-youtube-channel-container ${container_class || ''}`}>
        <div className={`iframe-container ${iframe_container_class || ''}`}>
          <iframe
            id='player'
            width={width || 640}
            height={height || 390}
            frameBorder={frame_border || '0'}
            src={`http://www.youtube.com/embed/${this.state.video_id}?enablejsapi=1`}
            style={iframe_style || {}}
            allowFullScreen
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
