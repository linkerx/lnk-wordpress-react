import React from 'react';

const AudioContext = window.AudioContext || window.webkitAudioContext;


class ItemAudio extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      source: props.src,
      context: new AudioContext(),
      audioElement: new Audio(props.src),
      volume: '0.5',
      volIcon: 'fas fa-volume',
      currentTime: 0,
      duration: null,
      track: null,
      playing: false
    }

    this.audioInit = this.audioInit.bind(this);
    this.changePlayState = this.changePlayState.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.changeVolumeBtn = this.changeVolumeBtn.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
  }

  componentDidMount() {
    this.state.audioElement.addEventListener('loadeddata', () => {
      this.audioInit()
    }, false);

    this.state.audioElement.addEventListener('ended', () => {
      clearInterval(this.timer)
      this.setState({
        playing: false,
        currentTime: 0
      })
    }, false);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.state.audioElement.pause();
    this.setState({
      playing: false,
      currentTime: 0
    })
 }

  audioInit() {
    this.setState({
      duration: this.state.audioElement.duration
    })
  }

  changePlayState() {
    console.log(this.state);
    if(this.state.playing === false) {
        this.state.audioElement.play();
        this.state.audioElement.volume = this.state.volume;
        this.timer = setInterval(() => {this.setState({
          currentTime: this.state.audioElement.currentTime
        })},100);
        this.setState({
            playing: true,
        });
    } else {
        this.state.audioElement.pause();
        clearInterval(this.timer)
        this.setState({
            playing: false,
        })
    }
  }

  changeVolume(event) {
    console.log(event);
    this.state.audioElement.volume = event.target.value;
    this.setState({
      volume: event.target.value
    })
  }

  changeVolumeBtn() {
    var newVolume = '0';
    var volIcon = '';
    if(this.state.volume == '0.25') {
      newVolume = '0.5';
      volIcon = 'fas fa-volume-down';
    } else if(this.state.volume == '0.5') {
      newVolume = '0.25';
      volIcon = 'fas fa-volume-up';
    }

    this.setState({
      volume: newVolume,
      volIcon: volIcon
    })
  }

  changeCurrentTime(event) {
    this.state.audioElement.currentTime = event.target.value
  }

  formatSecondsAsTime(secs) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
  
    if (min < 10){ 
      min = "0" + min; 
    }
    if (sec < 10){ 
      sec  = "0" + sec;
    }
  
    return min + ':' + sec;
  }

  currentTimePercentaje(current,total){
    return 100 / total * current;
  }

  render(){
    return (
      <div className='audio' >
        <div className='lnk-player'>
            <div className="play" onClick={() => this.changePlayState()}>
              { this.state.playing ?
                  <i class="fas fa-pause"></i>
              :
                  <i class="fas fa-play"></i>
              }
            </div>
            <div className='description'>
              { this.props.texto1 &&
                <span className='texto1'>{this.props.texto1}</span>
              }
              { this.props.separador &&
                <div className='separador'></div>
              }
              { this.props.texto2 &&
                <span className='texto2'>{this.props.texto2}</span>
              }
            </div>
            <div className='time'>
              <div className='time-control-line'></div>
              <div className='time-control-line-active' style={{width: this.currentTimePercentaje(this.state.currentTime,this.state.duration) + '%'}}></div>
              <input type="range" min="0" max={this.state.duration} value={this.state.currentTime} step="1" onChange={this.changeCurrentTime} />
            </div>
            <div className='current-time'>{this.formatSecondsAsTime(this.state.currentTime)} / {this.formatSecondsAsTime(this.state.duration)}</div>
            <div className='volume'>
              <div className='volume-control-line'></div>
              <div className='volume-control-line-active' style={{width: this.currentTimePercentaje(this.state.volume,1) + '%'}}></div>
              <input type="range" min="0" max="1" value={this.state.volume} step="0.01" onChange={this.changeVolume} />
            </div>
            {/*
            <div classname="volume-btn" onClick={() => this.changeVolumeBtn()}>
              { this.state.volume == '0.25' &&
                <i class="far fa-volume-down"></i>
              }
              { this.state.volume == '0.5' &&
                <i class="fas fa-volume-up"></i>
              }
            </div>
            */}
        </div>
      </div>
    )
  }
}
export default ItemAudio;
