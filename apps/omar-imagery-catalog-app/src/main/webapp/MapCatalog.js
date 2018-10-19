import React, { Component } from "react";
//import "whatwg-fetch";
import OlMap from "./OlMap";
import CollectsTable from "./CollectsTable";
import { Button } from "mdbreact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";

class MapCatalog extends Component {
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
      body: JSON.stringify({ scanType: `${type}` })
    })
      .then(r => r.json())
      .then(json => {
        if (json.error === 500) {
          console.log("Server error!");
        }

        this.notify(type, json.timeStarted);
      })
      .catch(error => console.error("Error connecting to server: " + error));
  };

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
            <div className="row">
              <div className="col">
                <CollectsTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapCatalog;
