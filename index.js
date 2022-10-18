class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimer: 25,
      currentBreak: 5,
    };
  }
  render() {
    return (
      <div>
        <h1>Pomodoro timer</h1>
        <h2>Customizable pomodoro</h2>
        <div>Actual timer: {this.state.currentTimer}</div>
        <div>Actual break: {this.state.currentBreak}</div>
        <button>Add 1 minute to the timer</button>
        <br/>
        <button>Add 1 minute to the break</button>
        <br/>
        <button>Remove 1 minute to the break</button>
        <br/>
        <button>Remove 1 minute to the timer</button>
        <br/>
        <button>Start</button>
        <br/>
        <button>Stop</button>
        <br/>
        <button>Reset</button>
        <br/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
