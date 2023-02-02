import React, { Component } from "react";
import classes from './OvVideo.module.css';

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props) {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return <video className={`${!this.props.sendUserType ? classes["video-user"] : classes["video-consultant"]}`} autoPlay={true} ref={this.videoRef} />;
  }
  // render() {
  //   return <video autoPlay={true} ref={this.videoRef} />;
  // }
}
