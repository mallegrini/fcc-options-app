'use strict'

var React = require('react');
var Link = require('react-router').Link
var Message = require('./message.jsx');

var Settings = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.form);
  },
  handleAddressChange: function(e) {
    var form = Object.assign({}, this.state.form, {optionsIncAddress: e.target.value});
    this.setState({form: form})
  },
  handleMaxPassengersChange: function(e) {
    var form = Object.assign({}, this.state.form, {maxPassengersPerVehicle: e.target.value});
    this.setState({form: form})
  },
  handleMaxRouteTimeChange: function(e) {
    var form = Object.assign({}, this.state.form, {maxConsumerRouteTime: e.target.value});
    this.setState({form: form})
  },
  getInitialState: function() {
    return ({form: {}})
  },
  componentDidMount: function() {
      this.setPropsToState(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
      this.setPropsToState(nextProps);
  },
  setPropsToState: function(props) {
    // not really sure if this is correct
    // we want to use prop.settings when the form is first loaded
    // if an update request is made, we want to keep the form intact, while the
    // form is processing. During this time, we do not want to overwrite
    // with props.settings
    var form = Object.assign({}, props.settings, props.form);
    this.setState({form: form});
  },
  getInitialState:function(){
    return{
      form:{}
    }
  },
  render: function() {
    return (

      <form onSubmit={this.handleSubmit}>
        <h3 className="control-sidebar-heading">Global Settings</h3>
        <div className="form-group">
          {
            this.state.form.message?
              <Message message={this.state.form.message}/>:
              null
          }
          <label className="control-sidebar-subheading">
            Options Inc Address
          </label>
          <input type="text" className="form-control" value={this.state.form.optionsIncAddress} onChange={this.handleAddressChange}/>

          <label className="control-sidebar-subheading">
            Max passengers per vehicle
          </label>
          <input type="number" className="form-control" value={this.state.form.maxPassengersPerVehicle} onChange={this.handleMaxPassengersChange}/>

          <label className="control-sidebar-subheading">
            Max route time (minutes)
          </label>
          <input type="number" className="form-control" value={this.state.form.maxConsumerRouteTime} onChange={this.handleMaxRouteTimeChange}/>
          <p/>
          <button type="submit" disabled={this.props.form.isLoading} className={this.props.form.isLoading
            ? "btn btn-success disabled"
            : "btn btn-success"}>Submit</button>
        </div>
      </form>

    )
  }
});
module.exports = Settings;
