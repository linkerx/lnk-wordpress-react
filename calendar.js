var React = require('react');
var axios = require('axios');
var WpApi = require('wp/api');
var WpItemTitle = require('wp/item-title');
var WpItemImage = require('wp/item-image');
var renderHTML = require('react-render-html');
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
require('react-big-calendar/lib/css/react-big-calendar.css');

moment.locale('es');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

var views = ['mes', 'semana', 'dia', 'agenda'];

var today = {
  year: moment().format('YYYY'),
  month: moment().format('MMMM').charAt(0).toUpperCase() + moment().format('MMMM').slice(1),
  day: moment().format('dddd').charAt(0).toUpperCase() + moment().format('dddd').slice(1),
  number: moment().format('DD'),
}

class WpCalendar extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      date: moment().format('YYYY-MM[-01T00:00:00Z]'),
      items: [],
      itemsToday: [],
      modalOpen: false,
      modalItem: null
    }

    this.getEvents = this.getEvents.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
  }

  componentDidMount(){
      var minDate = new Date(this.state.date);
      var maxDate = minDate.setFullYear(minDate.getFullYear() + 1 );
      var max = moment(maxDate).format('YYYY-MM[-01T00:00:00Z]');
      this.getEvents(this.props.sources,this.state.date,max);
  }

  onNavigate(date){
    var min = moment(date).format('YYYY-MM[-01T00:00:00Z]');
    var minDate = new Date(min);
    var maxDate = minDate.setFullYear(minDate.getFullYear() + 1 );
    var max = moment(maxDate).format('YYYY-MM[-01T00:00:00Z]');
    if(min < this.state.date)
      this.getEvents(this.props.sources,min,max);
  }

    getEvents(sources,min,max){
        const baseUrl = "https://www.googleapis.com/calendar/v3/calendars/";
        this.state = {
            date: this.state.date,
            items: [],
            itemsToday: []
        }
        sources.map(function(source){
            this.addEvents(baseUrl+source.calId+'/events?key='+source.apiKey+'&timeMin='+min+'&timeMax='+max+'&showDeleted=false&singleEvents=true',min,max,source.clase);
        }.bind(this));
    }

    addEvents(url,min,max,clase){
        //console.log(url,min,max,clase);
        var debug = false;
        axios.get(url)
        .then(function(response) {
            this.setState(function(){
                var events = [];
                var itemsToday = [];
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
                    if(debug){
                        console.log(events);
                    }
                }
                return {
                    mes: min,
                    items: this.state.items.concat(events),
                    itemsToday: this.state.itemsToday.concat(itemsToday)
                }
            }.bind(this));
        }.bind(this));
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
        <div className='wp-calendar'>
            <BigCalendar
                selectable
                events={this.state.items}
                defaultView='month'
                culture='es'
                onSelectEvent = {this.props.onSelectEvent}
                onSelectSlot = {this.props.onSelectSlot}
                eventPropGetter={
                    function(event){
                        return {
                            className: event.clase
                        }
                    }
                }
                messages = {espMessages}
            />
        </div>
    )
  }
}

module.exports = WpCalendar;

// mock events
