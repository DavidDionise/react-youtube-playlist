import React from 'react';
import PropTypes from 'prop-types';
import VideoList from './video-list';
import $ from 'jquery';
import {
  videoInit,
  fetchVideos,
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
      fetching : true,
      video_list : [],
      video_id : '',
      iframe_width : 640,
      iframe_height : 390,
      small_screen : window.innerWidth < 980
    }

    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(e) {
    if(e.target.innerWidth > 980 && this.state.small_screen) {
      this.setState({small_screen : false});
    }
    else if(e.target.innerWidth <= 980 && !this.state.small_screen) {
      this.setState({small_screen : true});
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
        this.setState({video_list : list, video_id, fetching : false});
      })
      .catch(e => {throw new Error(e.message || e)})
    }

    this.setState({iframe_height : height ? getHeight(height) : this.state.height});

    $(window).on('resize', this.handleResize);
  }

  componentWillUnmount() {
    $(window).off('resize', this.handleResize)
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

    const video_list_style = this.state.small_screen ? {minHeight : '20px'} : {height : `${this.state.iframe_height}px`};

    return (
      <div
        id='react-youtube-channel-container'
        className={`${container_class || ''}`}
        style={{width}}
        >
        <div className={`iframe-container ${iframe_container_class || ''}`}>
          <iframe
            id='player'
            height={this.state.iframe_height}
            frameBorder={frame_border || '0'}
            src={`http://www.youtube.com/embed/${this.state.video_id}?enablejsapi=1?playlist=${this.props.playlist_id}`}
            style={{width : '100%'}}
            allowFullScreen
            scrolling={`${'yes' || scrolling}`}
          />
        </div>
        <div
          id='video-list-container'
          className={`${video_list_container_class || ''}`}
          style={video_list_style}
          >
          {this.state.fetching ? null : (
            <VideoList
              video_list={this.state.video_list}
              current_video_id={this.state.video_id}
              handleChange={v => this.setState({video_id : v})}
              show_thumbnails={show_thumbnails}
              small_screen={this.state.small_screen}
            />
          )}
        </div>
      </div>
    )
  }
}

export default YouTubeChannel;
