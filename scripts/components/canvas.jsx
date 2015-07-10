var React = require('react'),
    Sketchpad = require('exports?Sketchpad!../../node_modules/sketchpad/scripts/sketchpad.js');

window.$ = require('jquery');

var Canvas = React.createClass({
  call: function(func) {
    return this.sketchpad[func]();
  },

  componentDidMount: function() {
    this.sketchpad = new Sketchpad({
      element: this.refs.canvas.getDOMNode(),
      width: 400,
      height: 400,
    });
  },

  render: function() {
    return <canvas ref="canvas" className={this.props.mini ? 'sketchpad-mini' : ''}>
    </canvas>;
  },
});

module.exports = Canvas;
