const RED = "FE7569";
const YELLOW = "FFD42A";
const GREEN = "5AA02C";
const GREEN_H = "78EA2F";
const GRAY = "A6A6A6";
const WHITE = "FFFFFF";

const ICON_URL =
  "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";

exports.OPTIONS_INC_MARKER_ICON = ICON_URL + RED;
exports.OPTIONS_INC_NAME = "Options Inc.";
exports.UNASSIGNED_CONSUMER_ICON = ICON_URL + GRAY;
exports.HIGHLIGHTED_CONSUMER_ICON = ICON_URL + GREEN_H;
exports.ASSIGNED_CONSUMER_ICON = ICON_URL + YELLOW;
exports.SELECTED_ASSIGNED_CONSUMER_ICON = ICON_URL + GREEN;
exports.LOADING_CONSUMER_ICON = ICON_URL + WHITE;