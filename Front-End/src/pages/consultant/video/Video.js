import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import PersonalColor from "./PersonalColor";
import "./Video.css";

export default class UserVideoComponent extends Component {
  // getNicknameTag() {
  //   // Gets the nickName of the user
  //   return JSON.parse(this.props.streamManager.stream.connection.data)
  //     .clientData;
  // }

  render() {
    return (
      <div>
        {this.props.streamManager !== undefined ? (
          <div className="streamcomponent">
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <div>
              <PersonalColor />
              {/* <p>{this.getNicknameTag()}</p> */}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
