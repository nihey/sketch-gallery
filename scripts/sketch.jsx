var React = require('react'),
    $ = require('jquery'),
    Canvas = require('components/canvas');

var Sketch = React.createClass({
  call: function(func) {
    return (event) => {
      event.preventDefault();
      this.refs.pad.call(func);
    };
  },

  submit: function(event) {
    event.preventDefault();

    $.ajax({
      url: Config.FIREBASE_URL + '/sketches/' + location.hash.replace('#!/', '') + '.json',
      type: 'PUT',
      data: JSON.stringify({
        website: this.refs.website.getDOMNode().value,
        sketch: this.refs.pad.call('toObject'),
      }),
      success: function(data) {
        location.hash = '';
      },
      context: this,
    });
  },

  render: function() {
    return <div>
      <div>
        <Canvas ref="pad"/>
      </div>
      <form onSubmit={this.submit}>
        <div>
          <button className="undo" onClick={this.call('undo')}>undo</button>
          <button className="redo" onClick={this.call('redo')}>redo</button>
        </div>
        <input ref="website" type="text" placeholder="website"/>
        <button type="submit">
          send
        </button>
      </form>
    </div>;
  }
});

module.exports = Sketch;
