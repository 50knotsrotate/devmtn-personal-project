import React, { Component } from "react";
import axios from "axios";

export default function Axios(WrappedComponent, urls) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        data: []
      };
    }
      async componentDidMount() {
          const allData = [];

          for (let url of urls) { 
              let data = await axios.get(url)
              allData.push(data.data)
          }
          this.setState({
              data: [...allData]
          })
    }

    render() {
        return <WrappedComponent {...this.props} data={this.state.data} />
    }
  };
}
