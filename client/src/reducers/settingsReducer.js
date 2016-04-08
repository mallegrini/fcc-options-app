var actionTypes = require('../constants/actionTypes/settingsActionTypes.js');

var loadRequest = function(state) {
  // do no
  return Object.assign({}, state, {
    needToBeFetched: undefined
  });
}
var loadFailure = function(state) {
  // do nothing for now
  return state;
}
var loadSuccess = function(state, settings) {
  return Object.assign({}, state, settings);
}
var update = function(state, settings) {
  return Object.assign({}, state, settings);
}

var settingsFormReducer = function(state, action) {
  state = state || {needToBeFetched:true};
  switch (action.type) {
    case actionTypes.SETTINGS_LOAD_REQUEST:
      return loadRequest(state);
    case actionTypes.SETTINGS_LOAD_FAILURE:
      return loadFailure(state);
    case actionTypes.SETTINGS_LOAD_SUCCESS:
      return loadSuccess(state, action.settings);
    case actionTypes.SETTINGS_UPDATE:
      return update(state, action.settings);
    default:
      return state;
  }
};

module.exports = settingsFormReducer;