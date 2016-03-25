'use strict'

var Link = require('react-router').Link
var React = require('react');
var Header = require('./header.jsx');
var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');
var ControlSidebar = require('./controlSidebar.jsx');

var Main = React.createClass({

  //called when component is first loaded
  componentDidMount: function() {
    //workaround to force adminLTE to resize
    window.dispatchEvent(new Event('resize'));
  },
  //called when new content is loaded
  componentDidUpdate: function() {
    //workaround to force adminLTE to resize
    window.dispatchEvent(new Event('resize'));
  },
  render: function() {
    return (
      <div className="wrapper">
        <Header/>
        <Sidebar/> {this.props.children}
        <Footer/>
        <ControlSidebar/>
      </div>
    )
  }
});

module.exports = Main;