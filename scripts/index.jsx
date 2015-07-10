var React = require('react'),
    $ = require('jquery'),
    Canvas = require('components/canvas'),
    Sketch = require('sketch');


var Index = React.createClass({
  componentDidMount: function() {
    $.ajax({
      url: Config.FIREBASE_URL + '/sketches.json',
      success: function(data) {
        this.setState({sketches: data || {}});
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
          <input ref="artwork" placeholder="artwork name" type="text"/>
          <button>draw</button>
        </form>
      </div>
      {Object.keys(this.state.sketches).map(function(sketch, index) {
        return <a href={"#!/" + sketch}>
          <Canvas key={index} mini={true}/>
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
