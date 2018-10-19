import React, { Component } from "react";

class TestRoute extends Component {
  componentDidMount() {
    console.log("this.props.match.params.id: ", this.props.match.params.id);
  }

  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <div className="container">
        <h2>Test Route</h2>
        <h4>ID: {id}</h4>
      </div>
    );
  }
}

export default TestRoute;
