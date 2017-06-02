import React from 'react';
import $ from 'jquery';
const dotdotdot = require('utils/dotdotdot')($);

class VideoList extends React.Component {
  constructor(props) {
    super(props);

    this.dotdotdot_config = {
      ellipsis : '...',
      wrap : 'letter',
      height : 40,
      tolerance : 0,
      callback : (is_trucated) => {console.log('truncated = ', is_trucated)}
    }
  }
  componentDidUpdate() {
    this.props.video_list.forEach(v => {
      $(`#${v.id}`).dotdotdot(this.dotdotdot_config);
    })
  }

  render() {
    const {video_list, handleChange, show_thumbnails} = this.props;

    return (
      <div>
        {video_list.map(v => {
          const {url} = v.snippet.thumbnails.default;
          const {title} = v.snippet;
          const {videoId} = v.snippet.resourceId;

          return (
            <div
              className='video-container'
              key={v.id}
              onClick={() => {handleChange(videoId)}}
              >
              {show_thumbnails ? <img src={url} /> : null}
              <div id={v.id} className='title-container'>
                {title + ' asdjf;akj;flaj f;lajsdf; ljasd;lfja;ldsj fa;lkjd flkajf;laj;lfa;lfj'}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default VideoList;
