import React from "react";
type StateType = {
  date: any;
};
type propType = {
  date: string;
};
interface Time {
  state: StateType;
  props: propType;
  timerID: any
}

class Time extends React.Component {
  constructor(props:propType) {
    super(props);
    this.state = {date: new Date()};

  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div>
        <h1>Hello, every one!</h1>
        <h2>现在时间为{this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
export default Time;