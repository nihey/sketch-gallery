var React = require('react'),
    $ = require('jquery'),
    Canvas = require('components/canvas'),
    {getArtworkName, encode} = require('utils');

var Sketch = React.createClass({
  call: function(func, args) {
    return (event) => {
      event.preventDefault();
      this.refs.pad.call(func, args);
    };
  },

  submit: function(event) {
    event.preventDefault();
    this.setState({loading: true});

    var website = this.refs.website.getDOMNode().value.trim().toLowerCase();
    if (website.substr(0, 7) !== 'http://' && website.substr(0, 8) !== 'https://' &&
        website !== '') {
      website = 'http://' + website;
    }

    $.ajax({
      url: Config.FIREBASE_URL + '/sketches/' + encode(getArtworkName()) + '.json',
      type: 'PUT',
      data: JSON.stringify({
        website: website,
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
      return getArtworkName();
    }
    return <a target="_blank" href={this.state.website}>
      {getArtworkName()}
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
      <button onClick={this.call('animate', [7])} type="button">
        animate
      </button>
      <button disabled={this.state.loading} className={this.state.loading ? 'btn-loading' : ''} type="submit">
        {this.state.loading ? 'loading' : 'send'}
      </button>
    </form>;
  },

  getInitialState: function() {
    return {editor: false};
  },

  componentDidMount: function() {
    $.ajax({
      url: Config.FIREBASE_URL + '/sketches/' + encode(getArtworkName()) + '.json',
      success: function(data) {
        data && this.setState({sketch: data.sketch, website: data.website});
        data || this.setState({editor: true});
      },
      context: this,
    });
  },

  render: function() {
    return <div style={{paddingTop: '1em'}}>
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
