var React = require('react');


var Index = React.createClass({
  render: function() {
    return <div>
      <div>
        <form>
          <input placeholder="artwork name" type="text"/>
          <button>Draw</button>
        </form>
      </div>
    </div>;
  },
});

React.render(<Index/>, document.getElementById('react-body'));
