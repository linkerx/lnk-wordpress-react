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

class WpCalendar extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      date: moment().format('YYYY-MM[-01T00:00:00Z]'),
      items: [],
      modalOpen: false,
      modalItem: null
    }

    this.getEvents = this.getEvents.bind(this);
    this.addEvents = this.addEvents.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
  }

  componentDidMount(){
      var minDate = new Date(this.state.date);
      var maxDate = minDate.setFullYear(minDate.getFullYear() + 1 );
      var max = moment(maxDate).format('YYYY-MM[-01T00:00:00Z]');
      this.getEvents(this.props.sources,this.state.date,max);
  }

  onNavigate(date){
    var min = moment(date).format('YYYY-MM[-01T00:00:00Z]');
    var fromDate = new Date(min);
    var toDate = new Date(min);

    fromDate.setMonth(fromDate.getMonth() -1);
    fromDate.setMonth(fromDate.getMonth() -1);

    toDate.setMonth(toDate.getMonth() + 1 );
    toDate.setMonth(toDate.getMonth() + 1 );

    this.getEvents(this.props.sources,moment(fromDate).format('YYYY-MM[-01T00:00:00Z]'),moment(toDate).format('YYYY-MM[-01T00:00:00Z]'));
  }

    getEvents(sources,min,max){
        console.log("trae eventos de: "+min+" a "+max);
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

    onSelectEvent(event){

      if(event.desc){
        var opts = {
          type: 'post',
          id: event.desc,
          queries: ['_embed'],
          debug: true
        }

        WpApi.getItem(opts)
          .then(function(item){
            console.log(item);
            this.setState(function(){
              return {
                modalOpen: true,
                modalItem: {
                    event: event,
                    post: item
                  }
              }
            }.bind(this));
          }.bind(this));
      } else {
        this.setState(function(){
          return {
            modalOpen: true,
            modalItem: {
                event: event,
                post: null
              }
          }
        })
      }
    }

    onSelectSlot(slotInfo){
    }

    closeModal(){
      this.setState(function(){
        return {
          modalOpen: false,
          modalItem: null
        }
      })
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

    var modalStyle = 'closed';
    if(this.state.modalOpen){
        modalStyle = 'opened';
    }

    if(this.state.modalItem){
      if(this.state.modalItem.post){
        if(this.state.modalItem.post._embedded['wp:featuredmedia']){
          var post_image = this.state.modalItem.post._embedded['wp:featuredmedia'][0].media_details.sizes['thumbnail'].source_url;
        }
      }
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
                onNavigate = {this.onNavigate}
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
