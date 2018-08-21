var React = require('react');
var axios = require('axios');
var WpApi = require('wp/api');
var WpItemTitle = require('wp/item-title');
var WpItemImage = require('wp/item-image');
var renderHTML = require('react-render-html');
import moment from 'moment';

moment.locale('es');

var views = ['mes', 'semana', 'dia', 'agenda'];

class WpCalendarDay extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      items: [],
      modalOpen: false,
      modalItem: null
    }

    this.getEvents = this.getEvents.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
  }

  componentDidMount(){
      var d = new Date();
      var minDate = new Date(d.getTime() - 180*60*1000);
      var maxDate = new Date(d.getTime() - 180*60*1000);

      maxDate.setDate(maxDate.getDate() + 1);
      if(this.props.debug){
        console.log("max",maxDate)
      }
      this.getEvents(this.props.sources,moment(minDate).format('YYYY-MM-DD[T00:00:00Z]'),moment(maxDate).format('YYYY-MM-DD[T00:00:00Z]'));
  }

    getEvents(sources,min,max){
      if(this.props.debug){
        console.log("trae eventos de: "+min+" a "+max);
      }
      const baseUrl = "https://www.googleapis.com/calendar/v3/calendars/";
      this.state = {
          items: [],
      }
      sources.map(function(source){
          this.addEvents(baseUrl+source.calId+'/events?key='+source.apiKey+'&timeMin='+min+'&timeMax='+max+'&showDeleted=false&singleEvents=true',min,max,source.clase);
      }.bind(this));
    }

    addEvents(url,min,max,clase){
        if(this.props.debug){
          console.log("resultado: ",url,min,max,clase);
        }
        axios.get(url)
        .then(function(response) {
            this.setState(function(){
                var events = [];
                if(response.data.items){
                    events = response.data.items.map(function(event){

                        var start = event.start.date;
                        var end = event.end.date;
                        var allDay = false;

                        /* ARREGLO ALL DAY EVENTS */
                        if(!event.start.dateTime) {
                            var endObj = new Date(event.start.date);
                            endObj.setDate(endObj.getDate() + 1);
                            start =  endObj.toISOString().substring(0, 10);
                            allDay = true;
                        } else {
                            start = event.start.dateTime;
                            end = event.end.dateTime;
                        }


                        return {
                            start: new Date(start),
                            end: new Date(end),
                            allDay: allDay,
                            title: event.summary,
                            desc: event.description,
                            clase: clase,
                        }
                    }.bind(this));
                    if(this.props.debug){
                        console.log(events);
                    }
                }
                return {
                    mes: min,
                    items: this.state.items.concat(events),
                }
            }.bind(this));
        }.bind(this));
    }

  onSelectEvent(item){
    if(this.props.debug){
      console.log(item);
    }
  }

  render() {

    var espMessages = {
      date: 'Fecha',
      time: 'Hora',
      allDay: 'Todo el Día',
      previous: 'Anterior',
      next: 'Próximo',
      today: 'Hoy',
      month: 'Mes',
      week: 'Semana',
      day: 'Día',
      agenda: 'Agenda',
    }

    return (
      <div className='wp-day-calendar'>
        {this.state.items
        ?
          <ul>
          {this.state.items.map(function(item,index){
            return (<li key={index} onClick={function(){this.onSelectEvent(item)}.bind(this)} >{item.title}</li>)
          }.bind(this))}
          </ul>
        :
        <div>No hay eventos para hoy</div>
        }
      </div>
    )
  }
}

module.exports = WpCalendarDay;
