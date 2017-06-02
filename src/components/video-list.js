import React from 'react';
import $ from 'jquery';
const dotdotdot = require('utils/dotdotdot')($);
import {Popover, OverlayTrigger} from 'react-bootstrap';

class VideoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      truncated_list : []
    }
  }

  componentDidMount() {
    let truncated_list = [];
    this.props.video_list.forEach(v => {
      $(`#${v.id}`).dotdotdot({
        ellipsis : '...',
        wrap : 'letter',
        height : 40,
        tolerance : 0,
        callback : (is_trucated) => {is_trucated ? truncated_list.push(v.id) : null}
      });
    });

    this.setState({truncated_list});
  }

  render() {
    const {video_list, handleChange, show_thumbnails} = this.props;

    return (
      <div>
        {video_list.map((v, idx) => {
          const {url} = v.snippet.thumbnails.default;
          const {title} = v.snippet;
          const {videoId} = v.snippet.resourceId;

          return (
            <OverlayTrigger
              id={`${v.id}-overlay-id`}
              trigger={['hover','focus']}
              placement='left'
              overlay={
                this.state.truncated_list.find(e => e == v.id) ?
                <Popover>{title}</Popover> :
                <Popover bsClass='hidden' />
              }
              >
              <div
                className='video-container'
                key={v.id}
                onClick={() => {handleChange(videoId)}}
                >
                {show_thumbnails ? <img src={url} /> : null}
                <div id={v.id} className='title-container'>{title}</div>
              </div>
            </OverlayTrigger>
          )
        })}
      </div>
    )
  }
}

export default VideoList;
