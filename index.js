const ShowTime = () => {
  const time = new Date();
  return time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
};

var intervalId;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimer: 25,
      currentBreak: 5,
      currentSec: 0,
      currentSecBreak: 0,
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
  }

  handleIncrementSession() {
    console.log("+1 MINUTE SESSION");
    this.setState(() => ({
      currentTimer: this.state.currentTimer + 1,
    }));
  }

  handleDecrementSession() {
    console.log("-1 MINUTE SESSION");
    this.setState(() => ({
      currentTimer: this.state.currentTimer - 1,
    }));
    if (this.state.currentTimer == 0) {
      this.setState(() => ({ currentTimer: 0 }));
    }
  }

  handleIncrementBreak() {
    console.log("+1 MINUTE BREAK");
    this.setState(() => ({
      currentBreak: this.state.currentBreak + 1,
    }));
  }

  handleDecrementBreak() {
    console.log("-1 MINUTE BREAK");
    this.setState(() => ({
      currentBreak: this.state.currentBreak - 1,
    }));
    if (this.state.currentBreak == 0) {
      this.setState(() => ({ currentBreak: 0 }));
    }
  }

  handleReset() {
    console.log("TIMER & BREAK RESET");
    this.setState(() => ({
      currentTimer: 25,
      currentBreak: 5,
      realTime: Date(),
    }));
  }

  startTimer() {
    intervalId = setInterval(() => {
      this.setState({ currentSec: this.state.currentSec + 1 });
      this.handleTimer();
    }, 100);
  }

  handleTimer() {
    if (this.state.currentSec === 60) {
      this.setState({ currentSec: 0 });
      this.setState({ currentTimer: this.state.currentTimer - 1 });
    }
    if (this.state.currentTimer === 0) {
      return this.breakTimer();
    }
    if (this.state.currentTimer == 0 && this.state.currentSec == 0) {
      clearInterval(this.intervalId);
    }
  }

  breakTimer() {
    setInterval(() => {
      this.setState({ currentBreak: this.state.currentBreak + 1 });
      this.handleBreak();
    }, 1000);
  }

  handleBreak() {
    if (this.state.currentSecBreak === 60) {
      this.setState({ currentSecBreak: 0 });
      this.setState({ currentBreak: this.state.currentBreak - 1 });
    }
  }

  render() {
    return (
      <div>
        <h1>Pomodoro timer</h1>
        <h2>Customizable pomodoro</h2>
        <div id="session-label">
          Actual timer:
          <div id="session-length">{this.state.currentTimer} min</div>
          <div id="second">{this.state.currentSec} sec</div>
        </div>
        <div id="break-label">
          Actual break:
          <div>{this.state.currentBreak} min</div>
          <div>{this.state.currentSecBreak} sec</div>
        </div>
        <button id="session-increment" onClick={this.handleIncrementSession}>
          +1 minute to the timer
        </button>
        <br />
        <button id="break-increment" onClick={this.handleIncrementBreak}>
          +1 minute to the break
        </button>
        <br />
        <button id="break-decrement" onClick={this.handleDecrementBreak}>
          -1 minute to the break
        </button>
        <br />
        <button id="session-decrement" onClick={this.handleDecrementSession}>
          -1 minute to the timer
        </button>
        <br />
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
        <div>
          Time: <ShowTime />{" "}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

/*
  counter() {
    React.useEffect(() => {
      currentTimer > 0 &&
        setTimeout(() => {
          this.setState(() => {
            this.state.currentSec += 1;
          });
        }, 1000);
    }, [currentSec]);
    console.log(this.state.currentSec);
    if (this.state.currentSec == 0 || this.state.currentSec < 0) {
      this.state.currentSec = 60;
      this.state.currentTimer -= 1;
    }
    if (this.state.currentTimer == 0) {
      <Alert severity="info">Break session started!</Alert>;
      breakCounter();
    }
    if (this.handleStop == true) {
      <Alert severity="info">Session paused</Alert>;
      return;
    }
  }

  breakCounter() {
    setTimeout(() => {
      this.setState({
        currentSecBreak: this.state.currentSecBreak - 1,
      });
    }, 1000);
    if (this.state.currentSecBreak == 0 || this.state.currentSecBreak < 0) {
      this.state.currentSecBreak = 60;
      this.state.currentBreak -= 1;
    }
    if (this.state.currentBreak == 0) {
      <Alert severity="info">Session is over!</Alert>;
    }
    if (this.handleStop == true) {
      <Alert severity="info">Session paused</Alert>;
      return;
    }
  }
  */
