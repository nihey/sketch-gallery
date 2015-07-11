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

  getName: function() {
    // If no link is provided simply return the artwork name
    if (!this.state.website) {
      return location.hash.replace('#!/', '');
    }
    return <a href={this.state.website}>
      {location.hash.replace('#!/', '')}
    </a>
  },

  getEditor: function() {
    // If neither and editor or a sketch is provided, don't show anything
    if (!this.state.editor && !this.state.sketch) {
      return null;
    }

    // If a sketch is provided, use it
    if (!this.state.editor && this.state.sketch) {
      return <div>
        <div className="artwork-name">
          {this.getName()}
        </div>
      </div>;
    }

    return <form onSubmit={this.submit}>
      <div>
        <button className="undo" onClick={this.call('undo')}>undo</button>
        <button className="redo" onClick={this.call('redo')}>redo</button>
      </div>
      <input ref="website" type="text" placeholder="website"/>
      <button type="submit">
        send
      </button>
    </form>;
  },

  getInitialState: function() {
    return {editor: false};
  },

  componentDidMount: function() {
    $.ajax({
      url: Config.FIREBASE_URL + '/sketches/' + location.hash.replace('#!/', '') + '.json',
      success: function(data) {
        data && this.setState({sketch: data.sketch, website: data.website});
        data || this.setState({editor: true});
      },
      context: this,
    });
  },

  render: function() {
    return <div style={{marginTop: '1em'}}>
      <div>
        <a href="#!/"><button>back</button></a>
      </div>
      <div>
        <Canvas lazy={true} sketch={this.state.sketch} ref="pad"/>
      </div>
      {this.getEditor()}
    </div>;
  }
});

module.exports = Sketch;
