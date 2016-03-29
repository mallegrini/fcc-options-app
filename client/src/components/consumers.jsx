'use strict'

var React = require('react');
var connect = require('react-redux').connect;
var actions = require('../actions/consumer_actions');

var Ajax = require('../../js/ajax-functions.js');
var ConsumerForm = require('./consumer_form.jsx');
//var Alert = require('./alert_modal.jsx');

var Consumers = React.createClass({
  //
  //   contextTypes: {
  //     router: React.PropTypes.object.isRequired
  //   },
  //
  // handleSubmit: function(e) {
  //   e.preventDefault();
  //
  //   Ajax.post('/api/login', this.state, function(err, user){
  //     if (err) {
  //       this.setState({
  //         message: err.responseJSON.msg
  //       });
  //     }else{
  //         this.setState({
  //           message: "Welcome " + user
  //         });
  //       // if (location.state && location.state.nextPathname) {
  //       //   this.context.router.replace(location.state.nextPathname)
  //       // }
  //       // else {
  //       //   console.log(this.context);
  //       //   this.context.router.replace('/main')
  //       // }
  //     }
  //   }.bind(this));
  // },
  // handleEmailChange: function(e) {
  //   this.setState({email: e.target.value});
  // },
  // handlePasswordChange: function(e) {
  //   this.setState({password: e.target.value});
  // },
  // getInitialState: function() {
  //   return ({email: '', password: ''});
  // },
  /*
  handleEditConsumer: function(consumer, index) {
    var self = this;
    Ajax.put('/api/consumer/' + consumer._id, consumer,
     function(err, updatedConsumer) {
      if(err) {
        return;
      }
        var consumers = self.state.consumers;
        consumers[index] = updatedConsumer;

        self.setState({
          consumers: consumers,
          editIndex: undefined
        })
      })
    },
  handleAddConsumer: function(newConsumer) {

    var self = this;
    Ajax.post('/api/consumer/', newConsumer, function(err, addedConsumer) {
      if(err) {
        return;
      }
      var consumers = self.state.consumers;
      consumers.push(addedConsumer);
      consumers.sort(function(a,b){
        return a.name.localeCompare(b.name);
      })
      self.setState({
        consumers: consumers
      })
    })
  },
  getInitialState: function() {
    return ({
      "consumers":[],
    });
  },
  resetEditMode : function() {
    this.setState({editIndex: undefined});
  },
  componentDidMount: function() {
    Ajax.get('/api/consumer/', function(err, data){
      if(err) {
        // TODO
      }
      data.sort(function(a,b){
        return a.name.localeCompare(b.name);
      })
      this.setState({
        consumers: data
      })
    }.bind(this));
  },
  handleEditBtn: function(index) {
    this.setState({editIndex: index});
  },
  setDeleteMode: function(index) {
    this.setState({deleteIndex: index});
  },
  handleDelete: function() {
    var self = this;
    var index = self.state.deleteIndex;
    Ajax.delete('/api/consumer/' + self.state.consumers[index]._id,
      {}, function(err, okMessage) {
      if(err) {
        return;
      }
      var consumers = self.state.consumers;
      consumers.splice(index, 1)
      consumers.sort(function(a,b){
        return a.name.localeCompare(b.name);
      })
      self.setState({
        consumers: consumers,
        deleteIndex: undefined
      })
    })
  },
  */
  componentDidMount: function () {
    if(this.props.consumersNeedToBeFetched)
      this.props.loadConsumers();
  },
  render: function() {
    /*
    var modalBody = this.state.deleteIndex !== undefined ?
    "Are You sure You want to delete Consumer '"
      + this.state.consumers[this.state.deleteIndex].name + "' ?"
      : ""; */
      /*<Alert modalId="myModal" modalTitle="Confirm Deletion..."
        modalBody={modalBody}
        handleConfirm={this.handleDelete}
      />*/
      /*
        <button className="btn btn-sm btn-default in-table"
          title="Edit" type="button"
          onClick={this.handleEditBtn.bind(null, index)} >
          <i className="fa fa-pencil-square-o"></i>
        </button>
        <button
          className="btn btn-sm btn-default in-table"
          title="Delete"  data-toggle="modal"
          data-target="#myModal" type="button"
          onClick={this.setDeleteMode.bind(null, index)}>
          <i className="fa fa-trash-o"></i>
        </button>*/
        /*
        <ConsumerForm
          verb={this.state.editIndex !== undefined ? "Edit": "Add"}
          buttonHandles={
            this.state.editIndex !== undefined ? this.handleEditConsumer : this.handleAddConsumer}
          defaults={
            this.state.editIndex !== undefined ? this.state.consumers[this.state.editIndex] : {}}
          editIndex={this.state.editIndex}
          resetFn={this.resetEditMode}
        />
        */
    return (
      <div className="content-wrapper">

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Consumers</h3>
                </div>
                <div className="box-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Issues</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.consumers.map(function(consumer, index) {
                        return (
                          <tr key={index}>
                            <td>{consumer.name}</td>
                            <td>{consumer.sex}</td>
                            <td>{consumer.address}</td>
                            <td>{consumer.phone}</td>
                            <td>
                              {consumer.hasWheelchair ? <span className="label label-primary">Wheelchair</span> : null}
                              {consumer.hasSeizures ? <span className="label label-danger">Seizures</span> : null}
                              {consumer.hasMedications ? <span className="label label-warning">Medications</span> : null}
                              {consumer.needsTwoSeats ? <span className="label label-default">Two Seats</span> : null}
                              {consumer.needsWave ? <span className="label label-info">Needs Wave</span> : null}
                              {consumer.cannotSitNearOppositeSex ? <span className="label label-success">Behavioral Issues</span> : null}
                            </td>
                            <td className="text-center">

                            </td>
                          </tr>
                          );
                        }.bind(this))
                      }
                    </tbody>
                  </table>
                </div>
                {this.props.loadingConsumers ?
                <div className="overlay">
                  <i className="fa fa-refresh fa-spin"></i>
                </div>
                : null }
              </div>
            </div>
          </div>

        </section>
      </div>

    )
  }
});

var mapStateToProps = function(state){
  //gets the the currentPage of the app state and map it to the activeLink property of Sidebar
  return {
    consumersNeedToBeFetched: state.consumersPage.consumersNeedToBeFetched,
    consumers: state.consumersPage.consumers,
    loadingConsumers: state.consumersPage.loadingConsumers
  }
}
var mapDispatchToProps = function(dispatch){
  return {
    loadConsumers: function () {
      dispatch(actions.loadConsumers());
    }
  };
  /*
  //maps the onLinkClick property of Sidebar to a funciton that calls dipatch
  return{
    onLinkClick:function(urlPathName){
      //clickLink is a function that creates an action for the dispatcher to use
      dispatch(clickLink(urlPathName));
    }
  }
  */
}
module.exports.Consumers = Consumers;
module.exports.ConsumersContainer = connect(mapStateToProps, mapDispatchToProps)(Consumers);
