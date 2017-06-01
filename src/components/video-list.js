import React from 'react';

const VideoList = ({video_list, handleChange, show_thumbnails}) => {
  const video_style = {
    cursor : 'pointer'
  }

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
            <div className='title-container'>
              <p>{title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VideoList;
