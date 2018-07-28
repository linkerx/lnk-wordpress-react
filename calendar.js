var React = require('react');
var axios = require('axios');
var WpApi = require('wp/api');
var WpItemTitle = require('wp/item-title');
var WpItemImage = require('wp/item-image');
var renderHTML = require('react-render-html');
var Cargando = require('utils/cargando');
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
      var min = this.state.date;
      var fromDate = new Date(min);
      var toDate = new Date(min);

      fromDate.setMonth(fromDate.getMonth() -1);
      fromDate.setMonth(fromDate.getMonth() -1);

      toDate.setMonth(toDate.getMonth() + 1 );
      toDate.setMonth(toDate.getMonth() + 1 );

      this.getEvents(this.props.sources,moment(fromDate).format('YYYY-MM[-01T00:00:00Z]'),moment(toDate).format('YYYY-MM[-01T00:00:00Z]'));
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
        if(this.props.debug){
          console.log("trae eventos de: "+min+" a "+max);
        }
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
                    if(this.props.debug){
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

      this.setState(function(){
        return {
          modalOpen: true,
          modalItem: {
              event: event,
              cargando: true,
              post: null
            }
        }
      })

      if(event.desc){
        var opts = {
          type: 'post',
          id: event.desc,
          queries: ['_embed'],
          debug: true
        }

        WpApi.getItem(opts)
          .then(function(item){
            if(this.props.debug){
              console.log(item);
            }
            this.setState(function(){
              return {
                modalOpen: true,
                modalItem: {
                    event: event,
                    cargando: false,
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
                cargando: false,
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

    var selectEvent = this.onSelectEvent;
    if(typeof this.props.onSelectEvent !== 'undefined') {
      selectEvent = this.props.onSelectEvent;
    }

    var selectSlot = this.onSelectSlot;
    if(typeof this.props.onSelectSlot !== 'undefined') {
      selectSlot = this.props.onSelectSlot;
    }

    return (
        <div className='wp-calendar'>
            <BigCalendar
                selectable
                events={this.state.items}
                defaultView='month'
                culture='es'
                onSelectEvent = {selectEvent}
                onSelectSlot = {selectSlot}
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
            <div className={'modal-back '+modalStyle}></div>
            <div className={'calendar-modal '+modalStyle} >
              <button className='close-btn' onClick={function(){this.closeModal()}.bind(this)}>
                <i className="far fa-times-circle"></i>
              </button>
              {this.state.modalItem &&
                  <div className='modal-content'>
                  {this.state.modalItem.cargando
                    ?
                      <Cargando />
                    :
                      <div>
                      {this.state.modalItem.post
                        ?
                        <div className='post_content'>
                          <WpItemTitle linkTo='#' title={this.state.modalItem.post.title.rendered} heading='2' />
                          {post_image && <WpItemImage src={post_image} render='img'/>}
                          <div className='excerpt'>{renderHTML(this.state.modalItem.post.excerpt.rendered)}</div>
                          <div className='content'>{renderHTML(this.state.modalItem.post.content.rendered)}</div>
                        </div>
                        :
                        <div className='no-item'>
                          <h3>{this.state.modalItem.event.title}</h3>
                          <span>Sin Descripcion</span>
                        </div>
                      }
                    </div>
                  }
                  </div>
              }
            </div>
        </div>
    )
  }
}

module.exports = WpCalendar;
