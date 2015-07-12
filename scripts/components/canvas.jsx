var React = require('react'),
    Sketchpad = require('exports?Sketchpad!../../node_modules/sketchpad/scripts/sketchpad.js');

// Monkey patch that avoids crashing when strokes have no lines
var UnpatchedDrawStroke = Sketchpad.prototype.drawStroke;
Sketchpad.prototype.drawStroke = function(stroke) {
  stroke.lines = stroke.lines || [];
  UnpatchedDrawStroke.call(this, stroke);
};

window.$ = require('jquery');

var Canvas = React.createClass({
  call: function(func, args) {
    return this.sketchpad[func].apply(this.sketchpad, args);
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
      this.props.mini || $(this.refs.canvas.getDOMNode()).css({cursor: 'default'});
    }

    try {
      this.sketchpad = new Sketchpad(settings);

      if (props.sketch) {
        this.sketchpad.animate(7);
      }
    } catch(err) {
      console.error(this.props.name, '->', err);
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
