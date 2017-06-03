import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_input : ''
    }

    this.update_valid = true;
    this.timer_id;

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {value} = e.target;
    const regex = new RegExp(value);
    const filtered_video_list = this.props.master_video_list.filter(v => value == '' || regex.test(v.snippet.title));

    if(this.update_valid) {
      this.update_valid = false;
      this.props.handleUpdateFilteredVideos(filtered_video_list);
    }
    else {
      if(this.timer_id) {
        clearTimeout(this.timer_id);
      }
      this.timer_id = setTimeout(() => {
        this.update_valid = true;
        this.props.handleUpdateFilteredVideos(filtered_video_list);
      }, 200);
    }
  }

  render() {
    return (
      <div className='react-youtube-channel-search-bar-container'>
        <input
          className='form-control'
          placeholder='Filter By Video Title'
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default SearchBar;
