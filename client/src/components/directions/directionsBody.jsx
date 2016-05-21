'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var Message = require('../message.jsx');
var PrintableRoute = require('./printableRoute.jsx');
var actions = require('../../actions/vehicleRouteActions');
var moment = require('moment');
const MINUTES_IN_HOUR = 60;
const MILES_IN_METER = 0.00062137;
const TIME_FORMAT = "h:mm A";
const VEHICLE_WAIT_TIME_SECONDS = 180;
const PM_ROUTE_TYPE = "PM";
var inputTimer;

var DirectionsBody = React.createClass({
  componentDidMount:function(){
    this.setState({
      routeStartTime:this.props.routeStartTime,
      startRouteTimeField:moment(this.props.routeStartTime).format(TIME_FORMAT)
    })
  },
  getInitialState:function(){
    return {
      startRouteTimeField:''
    }
  },
  handleTimeChange:function(e){
    var self = this;
    var time = moment(e.target.value, TIME_FORMAT);
    if(time.isValid()){
      var routeStartTime = time.unix()*1000;
      this.setState({
        routeStartTime:routeStartTime,
        startRouteTimeField:e.target.value
      })
      //save route when user is done typing
      clearTimeout(inputTimer);
      inputTimer=setTimeout(function(){
        self.props.saveRouteStartTime(self.props.vehicle._id, self.props.routeType, routeStartTime )
      }, 500)

    }
    this.setState({
      startRouteTimeField:e.target.value
    })
  },
  print: function(e) {
    e.preventDefault();
    var w=window.open("about:blank", 'win');
    w.document.write('<!DOCTYPE html><html><head>');
    w.document.write('<title>Options, Inc. | Vehicles Report</title>');
    w.document.write('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"/>')
    w.document.write('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>')
    w.document.write('<style type="text/css">');
    w.document.write('.i-info {margin: 2px 3px;  }');
    w.document.write('</style></head><body>');
    w.document.write(document.getElementById(this.props.routeType + "-report").innerHTML);
    w.document.write('</body></html>')
    setTimeout(function(){w.stop()}, 1000); // fix perpetual loading on firefox
  },
  render:function(){
    var self = this;
    var route = this.props.route;
    var maxPassengerDuration = Math.ceil(route.maxPassengerDuration/MINUTES_IN_HOUR);
    var routeStartTime = moment(this.state.routeStartTime);
    var routeTime = moment(this.state.routeStartTime);
    return(
      <div>
      <div className="btn btn-group">
        <a href="#" onClick={this.print} className="btn btn-default" > <i className="fa fa-print"></i> Print</a>
        <a
          href={'/api/report/directions/' + this.props.vehicle._id +
            '?route=' + this.props.routeType}
          className="btn btn-default"
        > <i className="fa fa-file-word-o"></i> .docx</a>
      </div>
      <div>
        <div><b>Start Route Time</b></div>
        <div><input type="text" placeholder="9:00AM, 12:00PM" value = {self.state.startRouteTimeField} onChange={this.handleTimeChange}/> </div>
        <div><b>Max Passenger Duration (w/out stops and traffic) </b></div>
        <div>{maxPassengerDuration} minutes</div>
        {maxPassengerDuration > this.props.maxConsumerRouteTime?
          <Message message={{type:"info", msg:"The max passenger duration is greater than the maximum route time setting"}}/>
          :null
        }
        <div><b>Total Duration (w/out stops and traffic) </b></div>
        <div>{Math.ceil(route.totalDuration/MINUTES_IN_HOUR)} minutes</div>

        <div><b>Total Distance</b> </div>
        <div>{Math.ceil(route.totalDistance*MILES_IN_METER)} miles</div>
        {
          route.legs.map(function(leg, index){
            if(leg.start_address != leg.end_address){
              routeTime.add(leg.duration.value + self.props.vehicleWaitTime,'s')
            }
            return(

              <div key={index}>
                {index==0?
                  <div>
                  <p/>
                  <div> <b>{leg.start_location_name} - {routeStartTime.format(TIME_FORMAT)}</b></div>
                  <div> {leg.start_address} </div>
                  <p/>
                  </div>
                  :null
                }
                {
                  leg.steps.map(function(step,index){
                    return(
                      <div key={index} dangerouslySetInnerHTML={{__html: step.html_instructions}}/>
                    )
                  })
                }
                <p/>
                <div> <b>{leg.end_location_name} - {routeTime.format(TIME_FORMAT)}</b></div>
                <div> {leg.end_address} </div>
                <p/>
              </div>
            )
          })
        }
        </div>
        <div id={this.props.routeType + "-report"}>
        <PrintableRoute routeType={this.props.routeType} />
        </div>
      </div>
    )
  }
})
var mapStateToProps = function(state, ownProps){
  var route;
  var routeStartTime;
  if(ownProps.routeType==PM_ROUTE_TYPE){
    route = state.directions.eveningRoute;
    routeStartTime = state.directions.eveningStartTime;
  }else{
    route = state.directions.morningRoute;
    routeStartTime = state.directions.morningStartTime;
  }
  return {
    vehicle: state.vehicles.data[state.directions.v_id],
    consumers: state.consumers.data,
    route : route,
    maxConsumerRouteTime: state.settings.maxConsumerRouteTime,
    routeStartTime: routeStartTime,
    vehicleWaitTime: VEHICLE_WAIT_TIME_SECONDS
  }
}

var mapDispatchToProps = function(dispatch, ownProps) {
  return {
    saveRouteStartTime: function(vehicleId, routeType, routeStartTime) {
      var startingTime;
      if (routeType == PM_ROUTE_TYPE) {
        startingTime = {
          eveningStartTime: routeStartTime
        }
      } else {
        startingTime = {
          morningStartTime: routeStartTime
        }
      }
      dispatch(actions.saveRouteStartTime(vehicleId, startingTime))
    }
  }
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(DirectionsBody)
