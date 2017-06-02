import React from 'react';
import PropTypes from 'prop-types';
import VideoList from './video-list';
import {
  videoInit,
  fetchVideos,
  getWidth,
  getHeight
 } from 'utils';

class YouTubeChannel extends React.Component {
  static propTypes = {
    api_key: PropTypes.string.isRequired,
    channel_id: PropTypes.string,
    playlist_id: PropTypes.string,
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
    video_list_container_class: PropTypes.string,
    scrolling : PropTypes.oneOf(['yes', 'no', 'auto']),
  }

  constructor(props) {
    super(props);

    this.state = {
      video_list : [],
      video_id : '',
      iframe_width : 640,
      iframe_height : 390
    }
  }

  componentDidMount() {
    const {api_key, playlist_id, channel_id, width, height} = this.props;
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
    let height_test = getHeight(height);

    this.setState({
      iframe_width : width ? getWidth(width) : this.state.width,
      iframe_height : height ? getHeight(height) : this.state.height
    })
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
      scrolling,
    } = this.props;

    return (
      <div
        id='react-youtube-channel-container'
        className={`${container_class || ''}`}
        >
        <div className={`iframe-container ${iframe_container_class || ''}`}>
          <iframe
            id='player'
            width={this.state.iframe_width}
            height={this.state.iframe_height}
            frameBorder={frame_border || '0'}
            src={`http://www.youtube.com/embed/${this.state.video_id}?enablejsapi=1`}
            style={iframe_style || {}}
            allowFullScreen
            scrolling={`${'yes' || scrolling}`}
          />
        </div>
        <div
          id='video-list-container'
          className={`${video_list_container_class || ''}`}
          style={{height : `${this.state.iframe_height}px`}}
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
