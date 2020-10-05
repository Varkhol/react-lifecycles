import React, {Component} from 'react';
import './timer.css';

export default class Timer extends Component {
    state = {
        timer: 30,
        autoplay: false,
        disabled: false,
        progress: 100
    }

    getInitialState = () => {
        return {
          timer: this.updateTimerValue,
          autoplay: false,
          disabled: false,
          progress: 100
        };
      }

    updateTimerValue = (e) => {
        this.setState({
          timer: e.target.value
        });
    }

    timer = () => {
        this.setState({
            timer: this.state.timer - 1,
            disabled: true
        });
        if (this.state.timer < 1) {
            clearInterval(this.timerInterval);
        } 
    }

    remainingTime(value) {
        this.setState({
            progress: this.state.progress - value 
        })
    }

    componentDidMount() { 
        if (this.state.autoplay) {
            this.startTimer();
        }
    }

    startTimer = () => {
        this.timerInterval = setInterval(this.timer, 1000);
        this.remaining = setInterval(() => {
            this.remainingTime(this.state.progress/this.state.timer)
        }, 1000)
    }

    stopTimer = () => {
        clearInterval(this.timerInterval);
        clearInterval(this.remaining);
        this.setState({
            disabled: false
        });
    }

    render() {
        const {timer, disabled} = this.state;
        return (
           <div className="timer-container">
                <div className="time-input">
                    <label className="input-label">Initial time, sec</label>
                    <input className="input-field" onChange={this.updateTimerValue}></input>
                </div>
                <div className="buttons">
                    <button className="start" disabled={disabled} onClick={this.startTimer}>Start</button>
                    <button className="stop" disabled={!disabled} onClick={this.stopTimer}>Stop</button>
                </div>
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${this.state.progress}%` }}>{timer} sec</div>
                </div>
           </div>
        )
    }
}