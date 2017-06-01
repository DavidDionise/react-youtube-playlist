import React from 'react';

const VideoList = ({ video_list, handleChange, show_thumbnails }) => {
  return React.createElement(
    'div',
    null,
    video_list.map(v => {
      const { url } = v.snippet.thumbnails.default;
      const { title } = v.snippet;
      const { videoId } = v.snippet.resourceId;

      return React.createElement(
        'div',
        {
          className: 'video-container',
          key: v.id,
          onClick: () => {
            handleChange(videoId);
          }
        },
        show_thumbnails ? React.createElement('img', { src: url }) : null,
        React.createElement(
          'div',
          { className: 'title-container' },
          React.createElement(
            'p',
            null,
            title
          )
        )
      );
    })
  );
};

export default VideoList;