import React from 'react';
import $ from 'jquery';
const dotdotdot = require('utils/dotdotdot')($);
import {equalVideoList} from 'utils';
import {Popover, OverlayTrigger} from 'react-bootstrap';
import SearchBar from './search-bar';

class VideoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      truncated_list : [],
      filtered_video_list : [],
    }

    this.tmp_truncated_list = [];

    this.initTruncatedVideos = this.initTruncatedVideos.bind(this);
  }

  initTruncatedVideos() {
    this.props.video_list.forEach((v, idx, list) => {
      $(`#${v.id}`).dotdotdot({
        ellipsis : '...',
        wrap : 'letter',
        height : 35,
        watch : true,
        tolerance : 0,
        callback : (is_trucated) => {
          if(idx == 0) {
            this.tmp_truncated_list = [];
          }
          if(is_trucated) {
            this.tmp_truncated_list.push(v.id);
          }
          if(idx == list.length - 1) {
            this.setState({truncated_list : this.tmp_truncated_list})
          }
        }
      });
    });
  }

  componentWillMount() {
    this.setState({filtered_video_list : this.props.video_list})
  }

  componentDidMount() {
    this.initTruncatedVideos();
  }

  componentDidUpdate(prev_props, prev_state) {
    if(
      (prev_props.small_screen != this.props.small_screen) ||
      !equalVideoList(prev_state.filtered_video_list, this.state.filtered_video_list)
    ) {
      console.log('initializing')
      this.initTruncatedVideos();
    }
  }

  render() {
    const {video_list, handleChange, show_thumbnails, current_video_id} = this.props;

    return (
      <div>
        <SearchBar
          master_video_list={video_list}
          handleUpdateFilteredVideos={(v) => this.setState({filtered_video_list : v})}
        />
        {this.state.filtered_video_list.map((v, idx) => {
          const {url} = v.snippet.thumbnails.default;
          const {title} = v.snippet;
          const {videoId} = v.snippet.resourceId;

          return (
            <OverlayTrigger
              id={`${v.id}-overlay-id`}
              trigger={['hover','focus']}
              placement={$('body').width() >= 768 ? 'left' : 'top'}
              key={v.id}
              overlay={
                this.state.truncated_list.find(e => e == v.id) ?
                <Popover id={`${v.id}-popover-id`}>{title}</Popover> :
                <Popover id={`${v.id}-popover-id`} bsClass='hidden' />
              }
              >
              <div
                className='video-container'
                onClick={() => {handleChange(videoId)}}
                >
                <div
                  id={v.id}
                  className={`title-container ${current_video_id == videoId ? ' current' : ''}`}
                  >
                  {show_thumbnails ? <img src={url} /> : null}{`${title}${idx % 2 == 0 ? 'extra extra yeah cool man' : ''}`}
                </div>
              </div>
            </OverlayTrigger>
          )
        })}
      </div>
    )
  }
}

export default VideoList;
