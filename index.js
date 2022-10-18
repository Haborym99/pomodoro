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
        <div id="session-label">Actual timer:</div>
        <div id="session-length">{this.state.currentTimer}</div>
        <div id="break-label">Actual break:</div>
        <button id="session-increment">Add 1 minute to the timer</button>
        <br/>
        <button id="break-increment">Add 1 minute to the break</button>
        <br/>
        <button id="break-decrement">Remove 1 minute to the break</button>
        <br/>
        <button id="session-decrement">Remove 1 minute to the timer</button>
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
