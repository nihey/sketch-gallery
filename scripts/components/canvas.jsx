var React = require('react'),
    Sketchpad = require('exports?Sketchpad!../../node_modules/sketchpad/scripts/sketchpad.js');

window.$ = require('jquery');

var Canvas = React.createClass({
  call: function(func) {
    return this.sketchpad[func]();
  },

  tryInit: function(props) {
    var settings = {
      element: this.refs.canvas.getDOMNode(),
      width: 400,
      height: 400,
    };

    if (props.sketch) {
      settings = $.extend(settings, props.sketch);
      settings.readOnly = true;
    }

    this.sketchpad = new Sketchpad(settings);

    if (props.sketch) {
      this.sketchpad.animate(7);
    }
  },

  componentWillReceiveProps: function(props) {
    this.props.lazy && this.tryInit(props);
  },

  componentDidMount: function() {
    this.props.lazy || this.tryInit(this.props);
  },

  render: function() {
    return <canvas ref="canvas" className={this.props.mini ? 'sketchpad-mini' : ''}>
    </canvas>;
  },
});

module.exports = Canvas;
