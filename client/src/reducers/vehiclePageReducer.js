const VEHICLES = require('../constants/models').VEHICLES;
var modelPageReducer = require('./modelPageReducer');

var initState = {
  isLoading: false,
  form: {
    display: false
  }
};
var vehiclePageReducer = function(state, action) {
  state = state || initState;
  if (action.model != VEHICLES) {
    return state
  }
  return modelPageReducer(state, action);
};

module.exports = vehiclePageReducer;
