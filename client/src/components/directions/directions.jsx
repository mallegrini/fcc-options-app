'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../../actions/mapActions');
var DirectionsBody = require('./directionsBody.jsx');

var Directions = React.createClass({
  render: function() {
    return (
      <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
              <li className=""><a href="#" className="text-muted" onClick={this.props.onBackClick}><i className="fa fa-chevron-left cust-btn"></i></a></li>
              <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="false">AM Directions</a></li>
              <li className=""><a href="#tab_2" data-toggle="tab" aria-expanded="true">PM Directions</a></li>
              <li className="pull-right"><a href="#"><i className="fa fa-print cust-btn"></i></a></li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="tab_1">
                <DirectionsBody routeType="AM"/>
              </div>

              <div className="tab-pane" id="tab_2">
                <DirectionsBody routeType="PM"/>
              </div>
            </div>

          </div>

    )
  }

})

var mapDispatchToProps = function(dispatch){
  return {
      onBackClick: function() {
        dispatch(actions.hideDirections())
      },
  }
}

module.exports = connect(null, mapDispatchToProps)(Directions);