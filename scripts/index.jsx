var React = require('react'),
    $ = require('jquery'),
    Canvas = require('components/canvas'),
    Sketch = require('sketch');


var Index = React.createClass({
  componentDidMount: function() {
    $.ajax({
      url: Config.FIREBASE_URL + '/sketches.json',
      data: {shallow: true},
      success: function(data) {
        var sketches = {};
        data && Object.keys(data).forEach(name => {
          $.ajax({
            url: Config.FIREBASE_URL + '/sketches/' + name + '.json',
            context: this,
            success: function(sketch) {
              sketches[name] = sketch;
              this.setState({sketches: sketches});
            },
          });
        });
      },
      context: this,
    });
  },

  draw: function(event) {
    event.preventDefault();
    location.hash = '#!/' + this.refs.artwork.getDOMNode().value;
  },

  getInitialState: function() {
    return {sketches: {}};
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
        return <a href={"#!/" + sketch} key={index}>
          <Canvas name={sketch} sketch={settings} mini={true}/>
        </a>;
      })}
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
