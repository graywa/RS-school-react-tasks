import React from 'react';
import './Preloader.scss';

class Preloader extends React.Component {
  render() {
    return (
      <div className="center-body">
        <div className="loader-square-39">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Preloader;
