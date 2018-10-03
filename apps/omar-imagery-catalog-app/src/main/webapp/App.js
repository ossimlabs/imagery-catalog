import React, { Component } from "react";

import { SERVER_URL, CLIENT_VERSION, REACT_VERSION } from "./config";
import "whatwg-fetch";

import OlMap from "./OlMap";

class App extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     serverInfo: {},
  //     clientInfo: {
  //       version: CLIENT_VERSION,
  //       react: REACT_VERSION
  //     }
  //   };
  // }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <div id="content">
            <section>
              <h1 style={{ textAlign: "center" }}>OMAR Imagery Catalog</h1>
              <OlMap />
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
