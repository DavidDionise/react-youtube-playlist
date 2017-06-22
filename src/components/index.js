import React from 'react';
import PropTypes from 'prop-types';
import VideoList from './video-list';
import $ from 'jquery';
import {
  youTubeFetch,
  getHeight
 } from 'utils';

 let is_mounted = false;

class YouTubePlaylist extends React.Component {
  static propTypes = {
    api_key: PropTypes.string.isRequired,
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
      initial_video_list : [],
      video_id : '',
      next_page_token : '',
      total_results_count : 0,
      iframe_width : 640,
      iframe_height : 390,
      small_screen : window.innerWidth < 980
    }

    this.handleResize = this.handleResize.bind(this);
  }

  handleResize(e) {
    if(is_mounted) {
      if(e.target.innerWidth > 980 && this.state.small_screen) {
        this.setState({small_screen : false});
      }
      else if(e.target.innerWidth <= 980 && !this.state.small_screen) {
        this.setState({small_screen : true});
      }
    }
  }

  componentDidMount() {
    is_mounted = true;
    const {api_key, playlist_id, width, height} = this.props;
    if(!api_key) {
      throw new Error('An API key must be provided');
    }
    if(!playlist_id) {
      throw 'A playlist ID must be provided';
    }
    else {
      youTubeFetch(playlist_id, api_key)
      .then(video_data => {
        if(is_mounted) {
          let video_id, channel_id = '';
          const {items, nextPageToken, pageInfo} = video_data;
          if(items.length > 0) {
            video_id = items[0].snippet.resourceId.videoId;
          }
          this.setState({
            initial_video_list : items,
            video_id,
            fetching : false,
            next_page_token : nextPageToken,
            total_results_count : pageInfo.totalResults
          });
        }
      })
      .catch(e => {console.log(e.message || e)});
    }

    this.setState({iframe_height : height ? getHeight(height) : this.state.height});

    $(window).on('resize', this.handleResize);
  }

  componentWillUnmount() {
    is_mounted = false;
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
            src={`https://www.youtube.com/embed/${this.state.video_id}?enablejsapi=1?playlist=${this.props.playlist_id}`}
            style={{width : '100%'}}
            allowFullScreen
            scrolling={`${'yes' || scrolling}`}
          />
        </div>
        <div
          id='outer-video-list-container'
          className={`${video_list_container_class || ''}`}
          style={video_list_style}
          >
          {this.state.fetching ? null : (
            <VideoList
              initial_video_list={this.state.initial_video_list}
              current_video_id={this.state.video_id}
              handleChange={v => {is_mounted ? this.setState({video_id : v}) : null}}
              show_thumbnails={show_thumbnails}
              small_screen={this.state.small_screen}
              total_results_count={this.state.total_results_count}
              api_key={this.props.api_key}
              playlist_id={this.props.playlist_id}
              next_page_token={this.state.next_page_token}
              height={height}
            />
          )}
        </div>
      </div>
    )
  }
}

export default YouTubePlaylist;
