var intervalId;
var breakId;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimer: 25,
      currentBreak: 5,
      currentSec: 0,
      currentSecBreak: 0,
      started: false,
      stopped: false,
    };
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleStart() {
    console.log("STARTED");
    this.startTimer();
  }

  handleStop() {
    console.log("STOPPED");
    this.pause();
  }

  handleIncrementSession() {
    console.log("+1 MINUTE SESSION");
    if (this.state.started == true && this.state.stopped == false) {
      return;
    }
    this.setState(() => ({
      currentTimer: this.state.currentTimer + 1,
      currentSec: 0,
    }));
  }

  handleDecrementSession() {
    console.log("-1 MINUTE SESSION");
    if (this.state.started == true && this.state.stopped == false) {
      return;
    }
    this.setState(() => ({
      currentTimer: this.state.currentTimer - 1,
      currentSec: 0,
    }));
    if (this.state.currentTimer == 0) {
      this.setState(() => ({ currentTimer: 0 }));
    }
  }

  handleIncrementBreak() {
    console.log("+1 MINUTE BREAK");
    if (this.state.started == true && this.state.stopped == false) {
      return;
    }
    this.setState(() => ({
      currentBreak: this.state.currentBreak + 1,
      currentSecBreak: 0,
    }));
  }

  handleDecrementBreak() {
    console.log("-1 MINUTE BREAK");
    if (this.state.started == true && this.state.stopped == false) {
      return;
    }
    this.setState(() => ({
      currentBreak: this.state.currentBreak - 1,
      currentSecBreak: 0,
    }));

    if (this.state.currentBreak == 0) {
      this.setState(() => ({ currentBreak: 0 }));
    }
  }

  handleReset() {
    console.log("TIMER & BREAK RESET");
    this.setState(() => ({
      currentTimer: 25,
      currentSec: 0,
      currentBreak: 5,
      currentSecBreak: 0,
      realTime: Date(),
    }));
    this.pause();
  }

  startTimer() {
    this.setState({ started: true });
    this.setState({ stopped: false });
    intervalId = setInterval(() => {
      this.setState({ currentSec: this.state.currentSec - 1 });
      if (this.state.currentSec <= 0) {
        this.setState({ currentSec: 0 });
        this.setState({ currentTimer: this.state.currentTimer - 1 });
      }
      if (this.state.currentTimer > 0 && this.state.currentSec <= 0) {
        this.setState({ currentSec: 59 });
      }
      if (this.state.currentTimer <= 0 && this.state.currentSec == 0) {
        clearInterval(intervalId);
        this.setState({ currentTimer: 25 });
        this.breakTimer();
      }
    }, 1000);
  }

  breakTimer() {
    this.setState({ started: false });
    this.setState({ stopped: true });
    console.log("Start?" + { started }, "Stop?" + { stopped });
    breakId = setInterval(() => {
      this.setState({ currentSecBreak: this.state.currentSecBreak - 1 });
      if (this.state.currentSecBreak <= 0) {
        this.setState({ currentSecBreak: 0 });
        this.setState({ currentBreak: this.state.currentBreak - 1 });
      }
      if (this.state.currentSecBreak == 0 && this.state.currentBreak > 0) {
        this.setState({ currentSecBreak: 59 });
      }
      if (this.state.currentBreak <= 0 && this.state.currentSecBreak <= 0) {
        clearInterval(breakId);
        this.setState({ currentBreak: 5 });
      }
    }, 1000);
  }

  pause() {
    clearInterval(intervalId);
    clearInterval(breakId);
  }

  render() {
    return (
      <div>
        <h1>Pomodoro timer</h1>
        <div id="timer">
          <div id="session-label">
            <p id="session-length-title">Session length:</p>
            <div id="session-length">{this.state.currentTimer} min</div>
            <div id="second-session">{this.state.currentSec} sec</div>
            <button
              id="session-increment"
              onClick={this.handleIncrementSession}
            >
              +1 min
            </button>
            <br />
            <button
              id="session-decrement"
              onClick={this.handleDecrementSession}
            >
              -1 min
            </button>
            <br />
          </div>
          <div id="break-label">
            <p id="break-label-title">Break length:</p>
            <div id="break-length">{this.state.currentBreak} min</div>
            <div id="second-break">{this.state.currentSecBreak} sec</div>
            <button id="break-increment" onClick={this.handleIncrementBreak}>
              +1 min
            </button>
            <br />
            <button id="break-decrement" onClick={this.handleDecrementBreak}>
              -1 min
            </button>
            <br />
          </div>
        </div>
        <div id="control">
          <button id="start" onClick={this.handleStart}>
            Start
          </button>
          <br />
          <button id="stop" onClick={this.handleStop}>
            Stop
          </button>
          <br />
          <button id="reset" onClick={this.handleReset}>
            Reset
          </button>
          <br />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));