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
            style={{width : '100%'}}
            onClick={() => {handleChange(videoId)}}
            >
            {show_thumbnails ? <img src={url} style={{width : '100%'}}/> : null}
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
