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

    this.initDotdotdot = this.initDotdotdot.bind(this);
    this.handleUpdateFilteredVideos = this.handleUpdateFilteredVideos.bind(this);
  }

  initDotdotdot() {
    this.state.filtered_video_list.forEach(v => {
      $(`#${v.id}`).dotdotdot({
        ellipsis : '...',
        wrap : 'letter',
        height : 35,
        watch : true,
        tolerance : 0,
        callback : (is_trucated) => {
          const list = this.state.truncated_list;
          this.setState({truncated_list : is_trucated ? [...list, v.id] : list.filter(e => e != v.id)});
        }
      });
    });
  }

  handleUpdateFilteredVideos(videos) {
    this.props.video_list.forEach(v => {$(`#${v.id}`).trigger('destroy')});
    this.setState({filtered_video_list : videos}, this.initDotdotdot);
  }

  componentWillMount() {
    this.setState({filtered_video_list : this.props.video_list})
  }

  componentDidMount() {
    this.initDotdotdot();
  }

  componentDidUpdate(prev_props) {
    if(prev_props.small_screen != this.props.small_screen) {
      this.props.video_list.forEach(v => {$(`#${v.id}`).trigger('destroy')});
      this.initDotdotdot();
    }
  }

  render() {
    const {video_list, handleChange, show_thumbnails, current_video_id} = this.props;

    return (
      <div>
        <SearchBar
          master_video_list={video_list}
          handleUpdateFilteredVideos={this.handleUpdateFilteredVideos}
        />
        <div className='inner-video-list-container'>
          {this.state.filtered_video_list.map(v => {
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
                    {show_thumbnails ? <img src={url} /> : null}{title}
                  </div>
                </div>
              </OverlayTrigger>
            )
          })}
        </div>
      </div>
    )
  }
}

export default VideoList;
