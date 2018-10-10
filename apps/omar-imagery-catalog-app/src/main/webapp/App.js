import React, { Component } from "react";

import { SERVER_URL, CLIENT_VERSION, REACT_VERSION } from "./config";
import "whatwg-fetch";

import { Button } from "mdbreact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OlMap from "./OlMap";

import moment from "moment";

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
  notify = (type, date) => {
    const notifyDate = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
    toast.success(`${type} scan started successfully on ${notifyDate} `, {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };

  handleScan = type => {
    console.log(`Handling ${type} Scan!`);

    fetch("http://localhost:8080/bucket/scanBucket", {
      method: "post",
      body: JSON.stringify({ scanType: type })
    })
      .then(r => {
        if (r.status === 500) {
          toast.error(r.status + " error while connecting to server", {
            position: toast.POSITION.BOTTOM_CENTER
          });
        }
        r.json();
      })
      .then(json => {
        this.notify(type, json.timeStarted);
      })
      .catch(error => console.error("Error connecting to server: " + error));
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <h1>OMAR Imagery Catalog</h1>
              </div>
              <Button color="primary" onClick={() => this.handleScan("Deep")}>
                Deep
              </Button>
              <Button
                color="primary"
                onClick={() => this.handleScan("Incremental")}
              >
                Incremental
              </Button>
            </div>
            <div className="row">
              <div className="col">
                <OlMap />
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
