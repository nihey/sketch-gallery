var React = require('react'),
    $ = require('jquery'),
    Canvas = require('components/canvas'),
    Loading = require('components/loading'),
    Sketch = require('sketch'),
    {getArtworkName, encode, decode} = require('utils');


var Index = React.createClass({
  componentDidMount: function() {
    var loaded = 0;
    // Work with Firebase REST API to avoid using concurrent connections
    // while fetching data.
    $.ajax({
      url: Config.FIREBASE_URL + '/sketches.json',
      data: {shallow: true},
      success: function(data) {
        // Randomize keys
        var keys = Object.keys(data).sort(() => Math.random() < 0.5);
        // To see all sketches, location.hash should be #!a
        if (!location.hash !== '#!a') {
          keys = keys.slice(0, 6);
        }

        var sketches = {};
        data || this.setState({loading: false});
        data && keys.forEach(name => {
          $.ajax({
            url: Config.FIREBASE_URL + '/sketches/' + name + '.json',
            context: this,
            success: function(sketch) {
              sketches[name] = sketch;
              var loading = Object.keys(sketches).length !== keys.length;
              this.setState({sketches, loading});
            },
          });
        });
      },
      context: this,
    });
  },

  draw: function(event) {
    event.preventDefault();
    var name = this.refs.artwork.getDOMNode().value;
    location.hash = '#!/' + encodeURIComponent(name);
  },

  getInitialState: function() {
    return {
      sketches: {},
      loading: true,
    };
  },

  render: function() {
    return <div>
      <div>
        <form onSubmit={this.draw}>
          <input required="true" ref="artwork" placeholder="artwork name" type="text"/>
          <button>draw</button>
        </form>
      </div>
      {Object.keys(this.state.sketches).map((sketch, index) => {
        var settings = this.state.sketches[sketch].sketch;
        return <a href={"#!/" + decode(sketch)} key={index}>
          <Canvas name={sketch} sketch={settings} mini={true}/>
        </a>;
      })}
      <div>
        <Loading active={this.state.loading}/>
      </div>
      <div className="fork-me">
        <a target="__blank" href="https://github.com/nihey/sketch-gallery">
          <i className="fa fa-github"></i>
        </a>
      </div>
    </div>;
  },
});

window.onhashchange = function() {
  if (!location.hash.substr(3)) {
    React.render(<Index/>, document.getElementById('react-body'));
    return;
  }
  React.render(<Sketch/>, document.getElementById('react-body'));
}

// Trigger the hashchange for the first time
window.dispatchEvent(new Event('hashchange'));
